const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const DATA_DIR = path.join(__dirname, '../data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Boshlang'ich ma'lumotlar (Seed Data)
const initialSeed = {
  rooms: [
    {
      id: 1,
      name: 'Standard Xona',
      type: 'standard',
      price_per_night: 60,
      capacity: 2,
      size: '32 m²',
      bed_type: '1 ta Queen-size kravat',
      description: 'Zamonaviy va qulay dizayndagi shinam xona. Qulay dam olish va ish safari uchun ajoyib tanlov. Shahar manzarasi va barcha asosiy qulayliklar bilan jihozlangan.',
      image_url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
      amenities: ['Yuqori tezlikdagi Wi-Fi', 'Konditsioner', 'Smart TV (4K)', 'Mini-bar', 'Xavfsiz seyf', 'Shinam vanna'],
      is_available: true,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Deluxe Xona',
      type: 'deluxe',
      price_per_night: 110,
      capacity: 3,
      size: '48 m²',
      bed_type: '1 ta King-size kravat + divan',
      description: 'Kengaytirilgan maydon, hashamatli marmar qoplamalar va shahar panoramik manzarasi bilan ajralib turuvchi yuqori darajadagi xona. Orom va go\'zallik uyg\'unligi.',
      image_url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      amenities: ['Balkon va shahar panoramasi', 'King-size qulay to\'shak', 'Nespresso kofe apparati', 'Marmar hammom & Jakuzi', 'Bepul premium nonushta', '24/7 xona xizmati'],
      is_available: true,
      rating: 4.9
    },
    {
      id: 3,
      name: 'VIP Prezident Suite',
      type: 'vip',
      price_per_night: 220,
      capacity: 4,
      size: '85 m²',
      bed_type: '2 ta Super King-size kravat',
      description: 'Grand Hotelning eng hashamatli xonasi. Alohida mehmonxona zali, shaxsiy jakuzi, oltin naqshli interyer va eksklyuziv VIP konsyerj xizmati bilan ta\'minlangan.',
      image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      amenities: ['Shaxsiy terassa', 'VIP Aeroport transferi', 'Shaxsiy shveysar & konsyerj', 'Jakuzi & fin saunasi', 'To\'liq bar va sharob to\'plami', 'Cheklanmagan SPA xizmatlari'],
      is_available: true,
      rating: 5.0
    },
    {
      id: 4,
      name: 'Family Oila Xonasi',
      type: 'family',
      price_per_night: 160,
      capacity: 5,
      size: '68 m²',
      bed_type: '2 ta Katta ikki kishilik kravat',
      description: 'Butun oila bilan qulay va xavfsiz hordiq chiqarish uchun maxsus loyihalashtirilgan ikki xonali keng lyuks xona. Bolalar uchun maxsus qulayliklar mavjud.',
      image_url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
      amenities: ['2 ta alohida yotoqxona', 'Bolalar o\'yin burchagi', 'Katta muzlatgich va oshxona maydoni', 'Oila uchun bepul nonushta', 'Bolalar uchun xavfsiz vanna', 'Smart ko\'ngilochar tizim'],
      is_available: true,
      rating: 4.9
    }
  ],
  bookings: [
    {
      id: 1,
      booking_code: 'GH-89241',
      room_id: 3,
      room_name: 'VIP Prezident Suite',
      guest_name: 'Alisher Qodirov',
      guest_phone: '+998 90 123 45 67',
      check_in: '2026-10-28',
      check_out: '2026-11-02',
      nights: 5,
      guests_count: 2,
      price_per_night: 220,
      total_price: 1100,
      status: 'tasdiqlangan',
      special_notes: 'Aeroportdan VIP transfer kerak.',
      created_at: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      id: 2,
      booking_code: 'GH-45129',
      room_id: 2,
      room_name: 'Deluxe Xona',
      guest_name: 'Dilnoza Karimova',
      guest_phone: '+998 97 765 43 21',
      check_in: '2026-10-26',
      check_out: '2026-10-29',
      nights: 3,
      guests_count: 2,
      price_per_night: 110,
      total_price: 330,
      status: 'kutilmoqda',
      special_notes: 'Yuqori qavatdagi sokin xona bo\'lsin.',
      created_at: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: 3,
      booking_code: 'GH-77210',
      room_id: 1,
      room_name: 'Standard Xona',
      guest_name: 'Michael Schmidt',
      guest_phone: '+49 170 555 4321',
      check_in: '2026-11-05',
      check_out: '2026-11-08',
      nights: 3,
      guests_count: 1,
      price_per_night: 60,
      total_price: 180,
      status: 'kutilmoqda',
      special_notes: 'Late check-in soat 23:00 da.',
      created_at: new Date(Date.now() - 3600000 * 10).toISOString()
    }
  ],
  restaurant_menu: [
    {
      id: 1,
      name: 'Maxsus To\'y Oshi (Palov)',
      category: 'milliy',
      price: 85000,
      description: 'Lazer guruchi, sarxil barra qo\'zi go\'shti, qazi, bedana tuxumi va mayiz bilan damlangan afsonaviy o\'zbek milliy taomi.',
      image_url: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
      preparation_time: '20 daqiqa',
      is_special: true
    },
    {
      id: 2,
      name: 'Tandir Somsa Assorti',
      category: 'milliy',
      price: 45000,
      description: 'Tandirda pishirilgan qarsildoq xamirli, shirador mayin go\'sht va piyozli 3 xil milliy somsa to\'plami.',
      image_url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
      preparation_time: '15 daqiqa',
      is_special: false
    },
    {
      id: 3,
      name: 'Qozon Kabob (Grand uslubida)',
      category: 'milliy',
      price: 98000,
      description: 'Qizargan mayin yosh qo\'zi go\'shti va qovurilgan tillarang kartoshka, sarxil ko\'katlar hamda maxsus marinadlangan piyoz bilan.',
      image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      preparation_time: '25 daqiqa',
      is_special: true
    },
    {
      id: 4,
      name: 'Norveg Qizil Balig\'i (Salmon Steak)',
      category: 'xalqaro',
      price: 145000,
      description: 'Grilda pishirilgan barra qizil baliq filesi, parhezbop sarsabil (sparja) va limonli kremli-sarimsoq sous bilan.',
      image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
      preparation_time: '25 daqiqa',
      is_special: true
    },
    {
      id: 5,
      name: 'Black Angus Ribeye Steyki',
      category: 'xalqaro',
      price: 195000,
      description: 'Oliy navli marmar mol go\'shti, olovda qovurilgan sabzavotlar, rozmarin va murchli demi-glas sousi.',
      image_url: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
      preparation_time: '30 daqiqa',
      is_special: true
    },
    {
      id: 6,
      name: 'Klassik Sezar Salati (Krevetkali)',
      category: 'xalqaro',
      price: 75000,
      description: 'Qarsildoq aysberg barglari, yirik yoqimli qirollik krevetkalari, parmezan pishlog\'i va xushbo\'y suxariklar.',
      image_url: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80',
      preparation_time: '15 daqiqa',
      is_special: false
    },
    {
      id: 7,
      name: 'Italyancha Tiramisu',
      category: 'desertlar',
      price: 45000,
      description: 'Haqiqiy Maskarpone kremi, espressoga botirilgan Savoiardi pechenyelari va toza kakao kukuni bilan tayyorlangan nozik desert.',
      image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80',
      preparation_time: '10 daqiqa',
      is_special: false
    },
    {
      id: 8,
      name: 'Grand Signature Kokteyli',
      category: 'ichimliklar',
      price: 40000,
      description: 'Sarxil mevalar, yalpiz, laym va tabiiy sharbatlardan tayyorlangan tetiklantiruvchi mualliflik ichimligi.',
      image_url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
      preparation_time: '5 daqiqa',
      is_special: true
    }
  ],
  contacts: [
    {
      id: 1,
      name: 'Rustam Rahimov',
      phone: '+998 90 987 65 43',
      email: 'rustam@gmail.com',
      message: 'Bizning kompaniya uchun 20 kishilik konferens-zal va yotoq joylari kerak. Taklif yubora olasizmi?',
      status: 'yangi',
      created_at: new Date(Date.now() - 3600000 * 5).toISOString()
    }
  ]
};

// Initialize file store if not present
function getStore() {
  if (!fs.existsSync(STORE_FILE)) {
    fs.writeFileSync(STORE_FILE, JSON.stringify(initialSeed, null, 2), 'utf-8');
    return initialSeed;
  }
  try {
    const data = fs.readFileSync(STORE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading store.json, restoring initial seed:', err);
    fs.writeFileSync(STORE_FILE, JSON.stringify(initialSeed, null, 2), 'utf-8');
    return initialSeed;
  }
}

function saveStore(data) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving store.json:', err);
  }
}

// Database clients
let pgPool = null;
let supabaseClient = null;
let dbMode = 'local_json';

// Initialize external DB if configured
if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
  try {
    supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    dbMode = 'supabase';
    console.log('✅ Supabase Client muvaffaqiyatli ulandi');
  } catch (e) {
    console.warn('⚠️ Supabase ulanishda xato:', e.message);
  }
} else if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('postgresql://')) {
  try {
    pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
    dbMode = 'postgresql';
    console.log('✅ PostgreSQL Pool sozlandi');
  } catch (e) {
    console.warn('⚠️ PostgreSQL ulanishda xato:', e.message);
  }
}

console.log(`ℹ️ Ma'lumotlar bazasi rejimi: [${dbMode.toUpperCase()}]`);

// Exported DB operations
const db = {
  getMode: () => dbMode,

  // Rooms
  async getRooms() {
    const store = getStore();
    return store.rooms || [];
  },

  async updateRoom(id, updates) {
    const store = getStore();
    const index = store.rooms.findIndex(r => r.id === parseInt(id));
    if (index === -1) return null;
    store.rooms[index] = { ...store.rooms[index], ...updates };
    saveStore(store);
    return store.rooms[index];
  },

  // Bookings
  async getBookings() {
    const store = getStore();
    return store.bookings || [];
  },

  async getBookingById(id) {
    const store = getStore();
    return store.bookings.find(b => b.id === parseInt(id) || b.booking_code === id);
  },

  async createBooking(bookingData) {
    const store = getStore();
    const randomCode = 'GH-' + Math.floor(10000 + Math.random() * 90000);
    const newBooking = {
      id: (store.bookings.length ? Math.max(...store.bookings.map(b => b.id)) : 0) + 1,
      booking_code: randomCode,
      ...bookingData,
      status: 'kutilmoqda',
      created_at: new Date().toISOString()
    };
    store.bookings.unshift(newBooking);
    saveStore(store);
    return newBooking;
  },

  async updateBookingStatus(id, status) {
    const store = getStore();
    const index = store.bookings.findIndex(b => b.id === parseInt(id) || b.booking_code === id);
    if (index === -1) return null;
    store.bookings[index].status = status;
    saveStore(store);
    return store.bookings[index];
  },

  async deleteBooking(id) {
    const store = getStore();
    const index = store.bookings.findIndex(b => b.id === parseInt(id));
    if (index === -1) return false;
    store.bookings.splice(index, 1);
    saveStore(store);
    return true;
  },

  // Restaurant
  async getRestaurantMenu(category) {
    const store = getStore();
    let menu = store.restaurant_menu || [];
    if (category && category !== 'barchasi') {
      menu = menu.filter(item => item.category === category);
    }
    return menu;
  },

  // Contacts
  async createContact(contactData) {
    const store = getStore();
    const newContact = {
      id: (store.contacts.length ? Math.max(...store.contacts.map(c => c.id)) : 0) + 1,
      ...contactData,
      status: 'yangi',
      created_at: new Date().toISOString()
    };
    store.contacts.unshift(newContact);
    saveStore(store);
    return newContact;
  },

  async getContacts() {
    const store = getStore();
    return store.contacts || [];
  },

  async updateContactStatus(id, status) {
    const store = getStore();
    const index = store.contacts.findIndex(c => c.id === parseInt(id));
    if (index === -1) return null;
    store.contacts[index].status = status;
    saveStore(store);
    return store.contacts[index];
  },

  // Stats
  async getStats() {
    const store = getStore();
    const bookings = store.bookings || [];
    const rooms = store.rooms || [];
    const contacts = store.contacts || [];

    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'tasdiqlangan').length;
    const pendingBookings = bookings.filter(b => b.status === 'kutilmoqda').length;
    const cancelledBookings = bookings.filter(b => b.status === 'bekor_qilingan').length;

    // Total revenue in USD
    const totalRevenue = bookings
      .filter(b => b.status === 'tasdiqlangan')
      .reduce((sum, b) => sum + Number(b.total_price || 0), 0);

    // Occupancy estimation based on confirmed bookings
    const occupancyRate = rooms.length > 0 ? Math.min(100, Math.round((confirmedBookings / (rooms.length * 2)) * 100)) : 75;

    return {
      totalBookings,
      confirmedBookings,
      pendingBookings,
      cancelledBookings,
      totalRevenue,
      occupancyRate,
      totalRooms: rooms.length,
      unreadMessages: contacts.filter(c => c.status === 'yangi').length
    };
  }
};

module.exports = db;
