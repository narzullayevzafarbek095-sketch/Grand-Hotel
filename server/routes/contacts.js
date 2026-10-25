const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { verifyAdminToken } = require('./auth');

// Yangi xabar jo'natish (Mehmon yoki mijoz)
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Iltimos, ismingizni kiriting.' });
    }
    if (!phone || !phone.trim()) {
      return res.status(400).json({ success: false, message: 'Iltimos, telefon raqamingizni kiriting.' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Iltimos, xabaringiz matnini yozing.' });
    }

    const newContact = await db.createContact({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Xabaringiz qabul qilindi! Tez orada mutaxassislarimiz siz bilan bog\'lanishadi.',
      data: newContact
    });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({ success: false, message: 'Xabar jo\'natishda xatolik' });
  }
});

// Barcha xabarlarni olish (Admin)
router.get('/', verifyAdminToken, async (req, res) => {
  try {
    const contacts = await db.getContacts();
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Xabarlarni olishda xatolik' });
  }
});

// Xabar holatini yangilash (Admin: o'qilgan)
router.patch('/:id/status', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await db.updateContactStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Xabar topilmadi' });
    }
    res.json({ success: true, message: 'Xabar statusi yangilandi', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Statusni yangilashda xato' });
  }
});

module.exports = router;
