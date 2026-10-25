const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Restoran taomlarini olish (ixtiyoriy kategoriya filteri bilan)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const menu = await db.getRestaurantMenu(category);
    res.json({
      success: true,
      count: menu.length,
      data: menu
    });
  } catch (error) {
    console.error('Error fetching restaurant menu:', error);
    res.status(500).json({ success: false, message: 'Menyuni yuklashda xatolik yuz berdi' });
  }
});

module.exports = router;
