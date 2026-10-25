const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { verifyAdminToken } = require('./auth');

// Barcha xonalarni olish
router.get('/', async (req, res) => {
  try {
    const rooms = await db.getRooms();
    res.json({ success: true, data: rooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ success: false, message: 'Xonalarni yuklashda xatolik yuz berdi' });
  }
});

// Xona ma'lumotlarini tahrirlash (Admin himoyalangan)
router.put('/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { price_per_night, is_available, name, description, amenities } = req.body;

    const updates = {};
    if (price_per_night !== undefined) updates.price_per_night = Number(price_per_night);
    if (is_available !== undefined) updates.is_available = Boolean(is_available);
    if (name) updates.name = name;
    if (description) updates.description = description;
    if (amenities) updates.amenities = amenities;

    const updatedRoom = await db.updateRoom(id, updates);
    if (!updatedRoom) {
      return res.status(404).json({ success: false, message: 'Xona topilmadi' });
    }

    res.json({
      success: true,
      message: 'Xona ma\'lumotlari muvaffaqiyatli yangilandi',
      data: updatedRoom
    });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ success: false, message: 'Xonani yangilashda xatolik yuz berdi' });
  }
});

module.exports = router;
