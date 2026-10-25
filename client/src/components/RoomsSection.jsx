import React, { useState } from 'react';
import RoomCard from './RoomCard';
import { Sparkles, SlidersHorizontal } from 'lucide-react';

export default function RoomsSection({ rooms = [], onBookRoom }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'Barcha xonalar' },
    { id: 'standard', label: 'Standard' },
    { id: 'deluxe', label: 'Deluxe' },
    { id: 'vip', label: 'VIP Suite' },
    { id: 'family', label: 'Family (Oila)' },
  ];

  const filteredRooms = activeFilter === 'all'
    ? rooms
    : rooms.filter(room => room.type.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="rooms" className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-navy-800/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Xonalar & Narxlar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Hashamatli Xonalar va Lyuks Kvartiralar
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Har bir xona o‘ziga xos dizayn, zamonaviy qulayliklar va betakror manzaraga ega. Siz va oilangiz uchun eng munosib xonani tanlang.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'gold-gradient-bg text-navy-950 shadow-gold-glow'
                    : 'bg-navy-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-gold-500/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onBook={onBookRoom}
            />
          ))}
        </div>

        {/* Guarantee Info Banner */}
        <div className="mt-16 p-6 rounded-2xl glass-panel border border-gold-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Eng yaxshi narx kafolati va moslashuvchan bekor qilish</h4>
              <p className="text-slate-400 text-xs sm:text-sm">Saytimiz orqali to‘g‘ridan-to‘g‘ri band qilishda qo‘shimcha to‘lovlar va yashirin xarajatlar yo‘q.</p>
            </div>
          </div>
          <button
            onClick={() => onBookRoom(rooms[0])}
            className="shrink-0 px-6 py-3 rounded-xl bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 border border-gold-500/40 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Hozir band qilish
          </button>
        </div>

      </div>
    </section>
  );
}
