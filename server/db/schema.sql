-- Grand Hotel Database Schema (PostgreSQL / Supabase)

-- 1. Xonalar jadvali (Rooms)
CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    price_per_night NUMERIC(10, 2) NOT NULL,
    capacity INT NOT NULL,
    size VARCHAR(50) NOT NULL,
    bed_type VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    amenities JSONB DEFAULT '[]'::jsonb,
    is_available BOOLEAN DEFAULT true,
    rating NUMERIC(2, 1) DEFAULT 4.9,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Filiallar jadvali (Branches - 12 viloyat)
CREATE TABLE IF NOT EXISTS branches (
    id VARCHAR(50) PRIMARY KEY,
    region VARCHAR(100) NOT NULL,
    name VARCHAR(150) NOT NULL,
    city VARCHAR(60) NOT NULL,
    address TEXT NOT NULL,
    landmark TEXT,
    phone VARCHAR(50) NOT NULL,
    rating NUMERIC(2, 1) DEFAULT 5.0,
    rooms_count INT DEFAULT 100,
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Xona band qilishlar jadvali (Bookings)
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    booking_code VARCHAR(20) UNIQUE NOT NULL,
    branch_id VARCHAR(50),
    branch_name VARCHAR(150),
    branch_city VARCHAR(60),
    room_id INT REFERENCES rooms(id) ON DELETE SET NULL,
    room_name VARCHAR(100) NOT NULL,
    guest_name VARCHAR(120) NOT NULL,
    guest_phone VARCHAR(50) NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    nights INT NOT NULL,
    guests_count INT NOT NULL,
    price_per_night NUMERIC(10, 2) NOT NULL,
    total_price NUMERIC(12, 2) NOT NULL,
    status VARCHAR(30) DEFAULT 'kutilmoqda', -- 'kutilmoqda', 'tasdiqlangan', 'bekor_qilingan'
    special_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Restoran taomlari jadvali (Restaurant Menu)
CREATE TABLE IF NOT EXISTS restaurant_menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'milliy', 'xalqaro', 'ichimliklar', 'desertlar'
    price NUMERIC(10, 2) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    preparation_time VARCHAR(50),
    is_special BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Aloqa xabarlari jadvali (Contacts & Messages)
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(120),
    message TEXT NOT NULL,
    status VARCHAR(30) DEFAULT 'yangi',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
