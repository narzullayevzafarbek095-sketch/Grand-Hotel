import React from 'react';
import { 
  Utensils, 
  Wifi, 
  Waves, 
  Dumbbell, 
  Car, 
  Plane, 
  Clock, 
  BellRing,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { initialServices } from '../data/initialData';

export default function ServicesSection() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-7 h-7" />;
      case 'Wifi': return <Wifi className="w-7 h-7" />;
      case 'Waves': return <Waves className="w-7 h-7" />;
      case 'Dumbbell': return <Dumbbell className="w-7 h-7" />;
      case 'Car': return <Car className="w-7 h-7" />;
      case 'Plane': return <Plane className="w-7 h-7" />;
      case 'Clock': return <Clock className="w-7 h-7" />;
      case 'BellRing': return <BellRing className="w-7 h-7" />;
      default: return <Sparkles className="w-7 h-7" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-navy-900/60 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-gold-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Eksklyuziv Imtiyozlar</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            5 Yulduzli Mehmonxona Xizmatlari
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Biz har bir daqiqangizni unutilmas va qulay qilish uchun dunyo andozalaridagi eng zamonaviy servis xizmatlarini taqdim etamiz.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initialServices.map((service) => (
            <div
              key={service.id}
              className="group p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between transition-all duration-300 relative border border-slate-800 hover:border-gold-500/40"
            >
              <div>
                {/* Icon with Gold Glow */}
                <div className="w-14 h-14 rounded-2xl bg-navy-950 border border-gold-500/30 group-hover:border-gold-500 flex items-center justify-center text-gold-400 group-hover:text-navy-950 group-hover:bg-gold-500 shadow-md group-hover:shadow-gold-glow transition-all duration-300 mb-5">
                  {getIcon(service.icon)}
                </div>

                {/* Highlight Badge */}
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-gold-500/10 text-gold-300 border border-gold-500/20 mb-2">
                  {service.highlight}
                </span>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500 group-hover:text-gold-400 transition-colors">
                <span className="font-medium">Grand Hotel Servisi</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
