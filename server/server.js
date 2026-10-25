const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Import Routes
const { router: authRouter } = require('./routes/auth');
const roomsRouter = require('./routes/rooms');
const bookingsRouter = require('./routes/bookings');
const restaurantRouter = require('./routes/restaurant');
const contactsRouter = require('./routes/contacts');
const statsRouter = require('./routes/stats');

// Mount API Routes
app.use('/api/auth', authRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/contact', contactsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/stats', statsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    name: 'Grand Hotel API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend in production or if static build exists
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));

app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) {
    return next();
  }
  const indexPath = path.join(clientDist, 'index.html');
  res.sendFile(indexPath, err => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html lang="uz">
        <head>
          <meta charset="UTF-8">
          <title>Grand Hotel Backend Server</title>
          <style>
            body { background: #0B132B; color: #FFF; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
            .box { padding: 40px; background: #1C2541; border: 1px solid #D4AF37; border-radius: 12px; max-width: 600px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
            h1 { color: #D4AF37; margin-bottom: 10px; font-size: 28px; }
            p { color: #CBD5E1; line-height: 1.6; }
            .badge { display: inline-block; padding: 6px 14px; background: rgba(212,175,55,0.2); color: #F5D061; border-radius: 9999px; font-weight: bold; margin-top: 15px; }
            a { color: #60A5FA; text-decoration: none; }
          </style>
        </head>
        <body>
          <div class="box">
            <h1>👑 Grand Hotel API Server</h1>
            <p>Node.js & Express server muvaffaqiyatli ishlamoqda!</p>
            <p>API Endpointlari: <br/>
              <code>/api/rooms</code> • <code>/api/bookings</code> • <code>/api/restaurant</code> • <code>/api/stats</code>
            </p>
            <div class="badge">Port: ${PORT} | Status: Faol</div>
          </div>
        </body>
        </html>
      `);
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Serverda ichki xatolik yuz berdi'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`✨ Grand Hotel Backend Server ishga tushdi!`);
  console.log(`📍 Manzil: http://localhost:${PORT}`);
  console.log(`🛡️ Admin API: http://localhost:${PORT}/api/auth/login`);
  console.log(`🏨 Xonalar API: http://localhost:${PORT}/api/rooms`);
  console.log(`📅 Buyurtmalar API: http://localhost:${PORT}/api/bookings`);
  console.log(`===============================================`);
});

module.exports = app;
