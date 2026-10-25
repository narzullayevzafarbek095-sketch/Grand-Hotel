import React, { useState } from 'react';
import { Calendar, Users, BedDouble, ChevronRight, Star, ShieldCheck, Sparkles, Award, Building2, MapPin } from 'lucide-react';
import { initialBranches } from '../data/initialData';

export default function Hero({ onOpenBooking, rooms = [] }) {
  // Quick booking bar state
  const [branchId, setBranchId] = useState('tashkent');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [roomType, setRoomType] = useState('standard');

  const handleQuickSearch = (e) => {
    e.preventDefault();
    onOpenBooking({
      branchId,
      checkIn,
      checkOut,
      guestsCount: guestCount,
      roomType
    });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Vignette & Gold Glow Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Grand Hotel Tashkent Luxury Facade"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.40]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/40"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gold-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10">
        
        {/* Floating 5-star Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900/80 border border-gold-500/40 shadow-gold-glow mb-6 animate-float">
          <div className="flex text-gold-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-gold-400" />
            ))}
          </div>
          <span className="text-xs uppercase tracking-widest text-gold-300 font-semibold">
            5 Yulduzli Mehmonxonalar Tarmog‘i • 12 Ta Viloyatda
          </span>
        </div>

        {/* Main Title matching user specification */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white max-w-5xl mx-auto leading-tight mb-6">
          Grand Hotel —{' '}
          <span className="gold-gradient-text block sm:inline">
            Sizning qulayligingiz bizning ustuvor vazifamiz!
          </span>
        </h1>

        {/* Subtitle / Intro */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-10">
          Toshkent, Samarqand, Buxoro, Xiva va O‘zbekistonning barcha 12 ta viloyatida oliy darajadagi sharqona mehmondo‘stlik, shohona xonalar va 24/7 shaxsiy xizmat.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => onOpenBooking()}
            className="w-full sm:w-auto px-8 py-4 rounded-full gold-gradient-bg text-navy-950 font-bold text-base shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group"
          >
            <span>Xona band qilish</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#branches"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-navy-900/90 text-gold-400 border border-gold-500/40 hover:bg-gold-500 hover:text-navy-950 transition-all duration-300 font-semibold text-base flex items-center justify-center gap-2 shadow-md"
          >
            <Building2 className="w-4 h-4" />
            <span>12 ta viloyat filiallari</span>
          </a>
          <a
            href="#rooms"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-navy-900/80 text-slate-200 border border-slate-700 hover:border-gold-500 hover:text-gold-400 transition-all duration-300 font-medium text-base flex items-center justify-center gap-2"
          >
            <span>Xonalar va narxlar</span>
          </a>
        </div>

        {/* Quick Booking Bar with Branch Selector */}
        <div className="max-w-6xl mx-auto glass-panel rounded-2xl p-4 sm:p-6 shadow-luxury border border-gold-500/30">
          <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-center">
            
            {/* Viloyat / Shahar */}
            <div className="text-left bg-navy-900/80 p-3 rounded-xl border border-slate-700/60 focus-within:border-gold-500 transition-colors">
              <label className="text-[11px] font-medium text-gold-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Viloyat / Filial
              </label>
              <select
                value={branchId}
                onChange={(e) => setBranchId(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-100 font-medium focus:outline-none cursor-pointer"
              >
                {initialBranches.map((b) => (
                  <option key={b.id} value={b.id} className="bg-navy-900 text-white">
                    {b.city} ({b.region})
                  </option>
                ))}
              </select>
            </div>

            {/* Check-In */}
            <div className="text-left bg-navy-900/80 p-3 rounded-xl border border-slate-700/60 focus-within:border-gold-500 transition-colors">
              <label className="text-[11px] font-medium text-gold-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Kirish sanasi
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full bg-transparent text-xs text-slate-100 font-medium focus:outline-none cursor-pointer"
                required
              />
            </div>

            {/* Check-Out */}
            <div className="text-left bg-navy-900/80 p-3 rounded-xl border border-slate-700/60 focus-within:border-gold-500 transition-colors">
              <label className="text-[11px] font-medium text-gold-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Chiqish sanasi
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn || new Date().toISOString().split('T')[0]}
                className="w-full bg-transparent text-xs text-slate-100 font-medium focus:outline-none cursor-pointer"
                required
              />
            </div>

            {/* Room Type */}
            <div className="text-left bg-navy-900/80 p-3 rounded-xl border border-slate-700/60 focus-within:border-gold-500 transition-colors">
              <label className="text-[11px] font-medium text-gold-400 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                <BedDouble className="w-3.5 h-3.5" /> Xona turi
              </label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-100 font-medium focus:outline-none cursor-pointer"
              >
                <option value="standard" className="bg-navy-900 text-white">Standard ($60/kecha)</option>
                <option value="deluxe" className="bg-navy-900 text-white">Deluxe ($110/kecha)</option>
                <option value="vip" className="bg-navy-900 text-white">VIP Suite ($220/kecha)</option>
                <option value="family" className="bg-navy-900 text-white">Family ($160/kecha)</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-full min-h-[52px] rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Tekshirish & Band qilish</span>
            </button>

          </form>
        </div>

        {/* Key Hotel Highlights Under Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mt-12 text-left">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-navy-900/50 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-white">12+ Viloyatda</div>
              <div className="text-xs text-slate-400">Butun O‘zbekiston bo‘ylab</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-navy-900/50 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400">
              <BedDouble className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-white">1200+ Xona</div>
              <div className="text-xs text-slate-400">Umumiy mehmonxona fondi</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-navy-900/50 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-white">24/7 Xizmat</div>
              <div className="text-xs text-slate-400">Yagona xalqaro standart</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-navy-900/50 border border-slate-800">
            <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold font-serif text-white">99.8%</div>
              <div className="text-xs text-slate-400">Mamnun mehmonlar</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
