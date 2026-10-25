import React, { useState, useEffect } from 'react';
import { Crown, Menu, X, Phone, UserCheck, Shield, Building2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onOpenBooking, onOpenAdminLogin, onNavigateAdmin, currentView }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, admin, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Bosh sahifa', href: '#home' },
    { name: '12 Viloyat Filiallari', href: '#branches' },
    { name: 'Xonalar', href: '#rooms' },
    { name: 'Xizmatlar', href: '#services' },
    { name: 'Restoran', href: '#restaurant' },
    { name: 'Biz haqimizda', href: '#about' },
    { name: 'Aloqa', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    setMobileMenuOpen(false);
    if (currentView === 'admin') {
      window.location.hash = href;
      window.location.reload();
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-navy-950/95 backdrop-blur-md shadow-2xl py-3 border-b border-gold-500/20' 
        : 'bg-gradient-to-b from-navy-950/90 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold-400 via-gold-500 to-gold-700 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform duration-300">
              <Crown className="w-6 h-6 text-navy-950" />
            </div>
            <div>
              <span className="text-2xl font-serif font-bold tracking-wider gold-gradient-text block leading-none">
                GRAND HOTEL
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-medium">
                Luxury & Comfort • O‘zbekiston
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs xl:text-sm font-medium text-slate-300 hover:text-gold-400 transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold-500 hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone quick link */}
            <a 
              href="tel:+998712008888" 
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-gold-400 transition-colors border-r border-slate-700 pr-4"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>+998 71 200 88 88</span>
            </a>

            {/* Admin Button */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onNavigateAdmin}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-gold-500/10 text-gold-400 border border-gold-500/30 hover:bg-gold-500/20 transition-all"
                  title="Admin Dashboardga o‘tish"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
                <button
                  onClick={logout}
                  className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
                  title="Chiqish"
                >
                  Chiqish
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="text-xs text-slate-400 hover:text-gold-400 transition-colors flex items-center gap-1"
                title="Administrator kirishi"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}

            {/* CTA Book Room */}
            <button
              onClick={() => onOpenBooking()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full gold-gradient-bg text-navy-950 font-semibold text-xs xl:text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Crown className="w-4 h-4 text-navy-950" />
                <span>Xona band qilish</span>
              </span>
              <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-full gold-gradient-bg text-navy-950 font-bold text-xs"
            >
              Band qilish
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-navy-800 text-gold-400 hover:text-white transition-colors"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-950/98 border-b border-gold-500/20 px-6 py-6 animate-fadeIn">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-base font-medium text-slate-200 hover:text-gold-400 py-1 transition-colors border-b border-slate-800/50"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-3 flex flex-col gap-3">
              <a 
                href="tel:+998712008888" 
                className="flex items-center gap-2 text-sm text-gold-400 font-medium py-1"
              >
                <Phone className="w-4 h-4" />
                <span>+998 71 200 88 88</span>
              </a>

              {isAuthenticated ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateAdmin();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gold-500/20 text-gold-400 border border-gold-500/30 font-medium text-sm"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Boshqaruv Paneli</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-navy-800 text-slate-300 font-medium text-sm"
                >
                  <Shield className="w-4 h-4 text-gold-400" />
                  <span>Admin Kirishi</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
