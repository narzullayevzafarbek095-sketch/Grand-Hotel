import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Star, 
  Navigation, 
  BedDouble, 
  ChevronRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { initialBranches } from '../data/initialData';

export default function BranchesSection({ onSelectBranch }) {
  const [selectedRegionId, setSelectedRegionId] = useState('all');

  const filteredBranches = selectedRegionId === 'all'
    ? initialBranches
    : initialBranches.filter(b => b.id === selectedRegionId);

  return (
    <section id="branches" className="py-24 bg-navy-950 relative overflow-hidden border-t border-gold-500/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>O‘zbekiston Bo‘ylab 12 Ta Viloyatda</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Grand Hotel Mehmonxonalar Tarmog‘i
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Qayerda bo‘lishingizdan qat’i nazar, yagona 5 yulduzli standart, shohona orom va yuqori darajadagi mehmondo‘stlik sizni kutmoqda. Toshkentdan to Nukusgacha barcha viloyatlarda xizmatingizdamiz.
          </p>

          {/* Region Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setSelectedRegionId('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedRegionId === 'all'
                  ? 'gold-gradient-bg text-navy-950 shadow-gold-glow font-bold'
                  : 'bg-navy-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-gold-500/40'
              }`}
            >
              Barcha viloyatlar (13 ta filial)
            </button>
            {initialBranches.map((branch) => (
              <button
                key={branch.id}
                onClick={() => setSelectedRegionId(branch.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedRegionId === branch.id
                    ? 'gold-gradient-bg text-navy-950 shadow-gold-glow font-bold'
                    : 'bg-navy-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {branch.city}
              </button>
            ))}
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBranches.map((branch) => (
            <div
              key={branch.id}
              className="group rounded-3xl overflow-hidden glass-panel glass-panel-hover border border-slate-800 hover:border-gold-500/50 flex flex-col justify-between transition-all duration-300"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={branch.image_url}
                    alt={branch.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/30"></div>

                  {/* Region badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider gold-gradient-bg text-navy-950 shadow-gold-glow">
                      <MapPin className="w-3 h-3" />
                      {branch.region}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3.5 right-3.5 bg-navy-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                    <span className="text-xs font-bold text-white">{branch.rating}</span>
                  </div>

                  {/* Rooms count badge */}
                  <div className="absolute bottom-3 left-3.5 bg-navy-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-700/80 text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <BedDouble className="w-3.5 h-3.5 text-gold-400" />
                    <span>{branch.rooms_count} ta xona</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-gold-400 transition-colors mb-2">
                    {branch.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {branch.description}
                  </p>

                  <div className="space-y-2 py-3 border-y border-slate-800/80 text-xs text-slate-300">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Navigation className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                      <span className="text-gold-300/90">{branch.landmark}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                      <a href={`tel:${branch.phone}`} className="hover:text-gold-400 transition-colors font-semibold">
                        {branch.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => onSelectBranch(branch)}
                  className="w-full py-3 px-4 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:scale-[1.01]"
                >
                  <span>Ushbu mehmonxonada xona band qilish</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
