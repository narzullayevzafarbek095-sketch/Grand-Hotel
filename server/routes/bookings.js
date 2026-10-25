const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { verifyAdminToken } = require('./auth');

// Barcha buyurtmalarni olish (Admin)
router.get('/', async (req, res) => {
  try {
    const bookings = await db.getBookings();
    res.json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Buyurtmalarni olishda xatolik yuz berdi' });
  }
});

// ID yoki kod bo'yicha buyurtmani ko'rish
router.get('/:id', async (req, res) => {
  try {
    const booking = await db.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Buyurtma topilmadi' });
    }
    res.json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Buyurtma ma\'lumotini olishda xatolik' });
  }
});

// Yangi xona band qilish (Foydalanuvchi)
router.post('/', async (req, res) => {
  try {
    const {
      branch_id,
      branch_name,
      branch_city,
      guest_name,
      guest_phone,
      check_in,
      check_out,
      guests_count,
      room_id,
      room_type,
      special_notes
    } = req.body;

    // 1. Bo'sh maydonlarni tekshirish
    if (!guest_name || !guest_name.trim()) {
      return res.status(400).json({ success: false, message: 'Iltimos, ism va familiyangizni kiriting.' });
    }
    if (!guest_phone || !guest_phone.trim()) {
      return res.status(400).json({ success: false, message: 'Iltimos, telefon raqamingizni kiriting.' });
    }
    if (!check_in) {
      return res.status(400).json({ success: false, message: 'Kirish sanasini tanlang.' });
    }
    if (!check_out) {
      return res.status(400).json({ success: false, message: 'Chiqish sanasini tanlang.' });
    }
    if (!guests_count || Number(guests_count) <= 0) {
      return res.status(400).json({ success: false, message: 'Mehmonlar sonini to\'g\'ri ko\'rsating.' });
    }

    // 2. Sanalarni solishtirish: check-in < check-out
    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({ success: false, message: 'Sana formati noto\'g\'ri kiritildi.' });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        success: false,
        message: 'Kirish sanasi chiqish sanasidan oldin bo\'lishi shart!'
      });
    }

    // 3. Kechalar sonini hisoblash
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (nights < 1) {
      return res.status(400).json({ success: false, message: 'Mehmonxonada kamida 1 kecha qolish kerak.' });
    }

    // 4. Xonani topish va narxni belgilash
    const rooms = await db.getRooms();
    let selectedRoom = null;

    if (room_id) {
      selectedRoom = rooms.find(r => r.id === parseInt(room_id));
    }
    if (!selectedRoom && room_type) {
      selectedRoom = rooms.find(r => r.type.toLowerCase() === room_type.toLowerCase());
    }
    if (!selectedRoom) {
      selectedRoom = rooms[0]; // fallback default
    }

    // Mehmonlar sig'imini tekshirish
    if (Number(guests_count) > selectedRoom.capacity) {
      return res.status(400).json({
        success: false,
        message: `Tanlangan ${selectedRoom.name} ko'pi bilan ${selectedRoom.capacity} nafar mehmon uchun mo'ljallangan.`
      });
    }

    // Jami narxni hisoblash
    const pricePerNight = Number(selectedRoom.price_per_night);
    const totalPrice = pricePerNight * nights;

    const newBooking = await db.createBooking({
      branch_id: branch_id || 'tashkent',
      branch_name: branch_name || 'Grand Hotel Tashkent',
      branch_city: branch_city || 'Toshkent',
      room_id: selectedRoom.id,
      room_name: selectedRoom.name,
      guest_name: guest_name.trim(),
      guest_phone: guest_phone.trim(),
      check_in,
      check_out,
      nights,
      guests_count: Number(guests_count),
      price_per_night: pricePerNight,
      total_price: totalPrice,
      special_notes: special_notes ? special_notes.trim() : ''
    });

    res.status(201).json({
      success: true,
      message: 'Xona muvaffaqiyatli band qilindi! Buyurtmangiz qabul qilindi.',
      data: newBooking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Band qilish jarayonida server xatosi yuz berdi' });
  }
});

// Buyurtma holatini yangilash (Admin: tasdiqlash, bekor qilish, yakunlash)
router.patch('/:id/status', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['kutilmoqda', 'tasdiqlangan', 'bekor_qilingan', 'yakunlangan'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Noto\'g\'ri status qiymati: ' + validStatuses.join(', ')
      });
    }

    const updatedBooking = await db.updateBookingStatus(id, status);
    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: 'Buyurtma topilmadi' });
    }

    res.json({
      success: true,
      message: `Buyurtma holati "${status}" ga o'zgartirildi`,
      data: updatedBooking
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({ success: false, message: 'Statusni yangilashda xatolik yuz berdi' });
  }
});

// Buyurtmani o'chirish (Admin)
router.delete('/:id', verifyAdminToken, async (req, res) => {
  try {
    const deleted = await db.deleteBooking(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Buyurtma topilmadi' });
    }
    res.json({ success: true, message: 'Buyurtma muvaffaqiyatli o\'chirildi' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'O\'chirishda server xatosi' });
  }
});

module.exports = router;
