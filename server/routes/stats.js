const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { verifyAdminToken } = require('./auth');

// Admin panel statistikasi
router.get('/', verifyAdminToken, async (req, res) => {
  try {
    const stats = await db.getStats();
    const bookings = await db.getBookings();

    // Oylik daromad dinamikasi (simulated breakdown for charts)
    const monthlyRevenue = [
      { month: 'May', revenue: 4200 },
      { month: 'Iyun', revenue: 5800 },
      { month: 'Iyul', revenue: 7900 },
      { month: 'Avgust', revenue: 8400 },
      { month: 'Sentabr', revenue: 6700 },
      { month: 'Oktabr', revenue: stats.totalRevenue + 4500 }
    ];

    res.json({
      success: true,
      stats,
      monthlyRevenue,
      recentBookings: bookings.slice(0, 5)
    });
  } catch (error) {
    console.error('Error calculating stats:', error);
    res.status(500).json({ success: false, message: 'Statistika hisoblashda xatolik yuz berdi' });
  }
});

module.exports = router;
