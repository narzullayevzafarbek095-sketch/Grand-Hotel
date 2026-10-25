import React, { useState } from 'react';
import { UtensilsCrossed, Clock, Sparkles, ChefHat, Check } from 'lucide-react';
import { initialRestaurantMenu } from '../data/initialData';

export default function RestaurantSection({ onNotify }) {
  const [activeCategory, setActiveCategory] = useState('barchasi');
  const [orderedDish, setOrderedDish] = useState(null);

  const categories = [
    { id: 'barchasi', label: 'Barcha menyu' },
    { id: 'milliy', label: 'O‘zbek milliy taomlari' },
    { id: 'xalqaro', label: 'Xalqaro taomlar' },
    { id: 'desertlar', label: 'Desertlar' },
    { id: 'ichimliklar', label: 'Ichimliklar' }
  ];

  const filteredDishes = activeCategory === 'barchasi'
    ? initialRestaurantMenu
    : initialRestaurantMenu.filter(item => item.category === activeCategory);

  const handleOrder = (dish) => {
    setOrderedDish(dish);
    if (onNotify) {
      onNotify(`"${dish.name}" buyurtmangiz qabul qilindi! Restoran xizmati xonangizga yetkazadi.`, 'success');
    }
    setTimeout(() => {
      setOrderedDish(null);
    }, 4000);
  };

  return (
    <section id="restaurant" className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <ChefHat className="w-4 h-4" />
            <span>Grand Gourmet Restorani</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Milliy va Jahon Oshxonasi Durdonalari
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Tajribali bosh oshpazlarimiz tomonidan tayyorlanadigan haqiqiy o‘zbek to‘y oshi, shirador tandir somsalar, qozon kabob va xalqaro dengiz hamda go‘shtli delikateslar.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'gold-gradient-bg text-navy-950 shadow-gold-glow'
                    : 'bg-navy-900 text-slate-300 hover:text-white border border-slate-800 hover:border-gold-500/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="group rounded-2xl overflow-hidden glass-panel glass-panel-hover flex flex-col justify-between border border-slate-800 hover:border-gold-500/40 transition-all duration-300"
            >
              {/* Dish Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={dish.image_url}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-black/20"></div>

                {/* Chef Special Badge */}
                {dish.is_special && (
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider gold-gradient-bg text-navy-950 shadow-gold-glow">
                      <Sparkles className="w-3 h-3" />
                      Chef Maxsus
                    </span>
                  </div>
                )}

                {/* Prep Time */}
                <div className="absolute top-3 right-3 bg-navy-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/80 flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                  <Clock className="w-3 h-3 text-gold-400" />
                  <span>{dish.preparation_time}</span>
                </div>

                {/* Price Tag Overlay */}
                <div className="absolute bottom-3 right-3 bg-navy-950/90 backdrop-blur-md px-3 py-1 rounded-xl border border-gold-500/30">
                  <span className="text-base font-bold font-serif gold-gradient-text">
                    {dish.price.toLocaleString('uz-UZ')} so‘m
                  </span>
                </div>
              </div>

              {/* Dish Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-gold-400 transition-colors mb-2">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {dish.description}
                  </p>
                </div>

                {/* Order Button */}
                <button
                  onClick={() => handleOrder(dish)}
                  className="w-full py-2.5 px-3 rounded-xl bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 border border-gold-500/30 font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 active:scale-95"
                >
                  {orderedDish?.id === dish.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Buyurtma berildi</span>
                    </>
                  ) : (
                    <>
                      <UtensilsCrossed className="w-3.5 h-3.5" />
                      <span>Xonaga buyurtma berish</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Restaurant Reservation Banner */}
        <div className="mt-16 p-8 rounded-3xl glass-panel border border-gold-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-2">
              VIP Mehmonxona Ziyofatlari & Kechki Ovqat
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Romantik oqshom yoki biznes tushlik uchun stol band qiling
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Jonli sharqona musiqa, sham yorug‘idagi sokin muhit va Toshkentning eng yaxshi oshpazlari siz uchun xizmatda.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="tel:+998712008888"
              className="px-6 py-3.5 rounded-full gold-gradient-bg text-navy-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow hover:shadow-gold-glow-lg transition-all"
            >
              Stol band qilish: +998 71 200 88 88
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
