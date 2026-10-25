const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'grand_hotel_luxury_jwt_secret_key_2026_hotel_secure';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'grand2026';

// Middleware to verify admin token
function verifyAdminToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Avtorizatsiya talab qilinadi (Token yo\'q)' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Yaroqsiz yoki muddati o\'tgan token' });
  }
}

// Admin login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Login va parolni kiriting'
    });
  }

  // Validate credentials
  if (username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({
      success: true,
      message: 'Muvaffaqiyatli tizimga kirdingiz',
      token,
      user: {
        username: ADMIN_USERNAME,
        role: 'admin',
        name: 'Grand Hotel Bosh Administratori'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Login yoki parol noto\'g\'ri'
  });
});

// Verify current session
router.get('/me', verifyAdminToken, (req, res) => {
  res.json({
    success: true,
    user: {
      username: req.admin.username,
      role: req.admin.role,
      name: 'Grand Hotel Bosh Administratori'
    }
  });
});

module.exports = { router, verifyAdminToken };
