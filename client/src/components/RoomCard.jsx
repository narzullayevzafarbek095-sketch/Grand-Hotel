import React, { useState, useEffect } from 'react';
import { Star, Users, Maximize, Bed, CheckCircle2, Crown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function RoomCard({ room, onBook }) {
  const isVip = room.type === 'vip';
  const images = room.images && room.images.length > 0 ? room.images : [room.image_url];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto slide sideways every 4.5 seconds unless hovered
  useEffect(() => {
    if (isHovered || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group rounded-2xl overflow-hidden glass-panel glass-panel-hover flex flex-col transition-all duration-300 relative ${
        isVip ? 'ring-2 ring-gold-500/50 shadow-gold-glow' : ''
      }`}
    >
      {/* Horizontal Image Slider Container */}
      <div className="relative h-64 overflow-hidden select-none bg-navy-950">
        
        {/* Sliding images wrapper */}
        <div 
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="min-w-full h-full relative shrink-0">
              <img
                src={img}
                alt={`${room.name} - Ko‘rinish ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/30 pointer-events-none"></div>

        {/* Previous / Next Arrow Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Oldingi rasm"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-navy-950/70 hover:bg-gold-500 hover:text-navy-950 text-white backdrop-blur-md border border-slate-700/60 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Keyingi rasm"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-navy-950/70 hover:bg-gold-500 hover:text-navy-950 text-white backdrop-blur-md border border-slate-700/60 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image Counter Badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-4 bg-navy-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-700/80 text-[10px] font-mono text-slate-300">
            {currentIdx + 1} / {images.length}
          </div>
        )}

        {/* Slider Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(dotIdx);
                }}
                aria-label={`Rasm ${dotIdx + 1}`}
                className={`transition-all rounded-full ${
                  currentIdx === dotIdx
                    ? 'w-4 h-1.5 bg-gold-400'
                    : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}

        {/* Room Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
            isVip 
              ? 'gold-gradient-bg text-navy-950 shadow-gold-glow' 
              : 'bg-navy-900/90 text-gold-400 border border-gold-500/30'
          }`}>
            {isVip && <Crown className="w-3.5 h-3.5" />}
            {room.type}
          </span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 z-10 bg-navy-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
          <span className="text-xs font-bold text-white">{room.rating || 4.9}</span>
        </div>

        {/* Price Tag Overlay at Bottom Right */}
        <div className="absolute bottom-3 right-4 z-10 bg-navy-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-gold-500/30">
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Bir kecha uchun</div>
          <div className="text-xl font-bold font-serif gold-gradient-text leading-none mt-0.5">
            ${room.price_per_night}
            <span className="text-xs text-slate-400 font-sans font-normal ml-1">/ kecha</span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Room Title */}
          <h3 className="text-2xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors mb-2">
            {room.name}
          </h3>

          {/* Room Parameters */}
          <div className="flex flex-wrap items-center gap-4 py-2 border-y border-slate-800/80 my-3 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gold-400" />
              <span>{room.capacity} kishilik</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-gold-400" />
              <span>{room.size}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-gold-400" />
              <span>{room.bed_type}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {room.description}
          </p>

          {/* Amenities Badges */}
          <div className="space-y-1.5 mb-6">
            {(Array.isArray(room.amenities) ? room.amenities.slice(0, 3) : []).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => onBook(room)}
            disabled={!room.is_available}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              room.is_available
                ? isVip
                  ? 'gold-gradient-bg text-navy-950 hover:shadow-gold-glow-lg active:scale-[0.98]'
                  : 'bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-300 border border-gold-500/40 hover:border-transparent active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {room.is_available ? (
              <>
                <span>Xonani band qilish</span>
                <span className="text-xs opacity-75">(${room.price_per_night})</span>
              </>
            ) : (
              <span>Band qilingan (Bo‘sh emas)</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
