import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BranchesSection from './components/BranchesSection';
import RoomsSection from './components/RoomsSection';
import ServicesSection from './components/ServicesSection';
import RestaurantSection from './components/RestaurantSection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './pages/AdminDashboard';
import NotificationToast from './components/NotificationToast';
import { initialRooms } from './data/initialData';

function HotelAppContent() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin'
  const [rooms, setRooms] = useState(initialRooms);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const { isAuthenticated } = useAuth();

  // Show Toast
  const notify = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Fetch rooms from backend or use initial luxury fallback
  useEffect(() => {
    fetch('/api/rooms')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setRooms(data.data);
        }
      })
      .catch(() => {
        // Keeps initial luxury rooms
      });
  }, []);

  // Open booking modal
  const handleOpenBooking = (branchOrRoomOrSearch = null) => {
    setBookingInitialData(branchOrRoomOrSearch);
    setIsBookingOpen(true);
  };

  // Handle successful booking
  const handleBookingSuccess = (bookingData) => {
    notify(`Xona muvaffaqiyatli band qilindi! Buyurtma ID: ${bookingData.booking_code}`, 'success');
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-gold-500 selection:text-navy-950">
      
      {currentView === 'admin' ? (
        <AdminDashboard
          onBackToSite={() => setCurrentView('home')}
          onNotify={notify}
        />
      ) : (
        <>
          {/* Header & Navbar */}
          <Navbar
            onOpenBooking={() => handleOpenBooking()}
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
            onNavigateAdmin={() => setCurrentView('admin')}
            currentView={currentView}
          />

          {/* Main Landing Page Sections */}
          <main className="flex-1">
            <Hero
              onOpenBooking={handleOpenBooking}
              rooms={rooms}
            />

            {/* 12 Regions Branches Section */}
            <BranchesSection
              onSelectBranch={handleOpenBooking}
            />

            {/* Rooms Section with Horizontal Slider */}
            <RoomsSection
              rooms={rooms}
              onBookRoom={handleOpenBooking}
            />

            <ServicesSection />
            <RestaurantSection onNotify={notify} />
            <AboutSection />
            <TestimonialsSection />
            <ContactSection onNotify={notify} />
          </main>

          {/* Footer */}
          <Footer
            onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
          />
        </>
      )}

      {/* Booking Modal with 12 Viloyat Selector */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialData={bookingInitialData}
        rooms={rooms}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setCurrentView('admin');
          notify('Administrator sifatida tizimga kirdingiz', 'success');
        }}
      />

      {/* Floating Notifications */}
      <NotificationToast
        notification={notification}
        onClose={() => setNotification(null)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HotelAppContent />
    </AuthProvider>
  );
}
