import React from 'react';
import { ShieldCheck, Award, HeartHandshake, History, Check } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    '2018-yildan buyon xalqaro 5 yulduzli standartlar bo‘yicha xizmat',
    'Toshkent shahar markazida, biznes va madaniy markazlarga 5 daqiqalik masofa',
    '150 dan ortiq eng so‘nggi texnologiyalar bilan jihozlangan lyuks xonalar',
    'Oliy toifali shaxsiy konsyerj va 24/7 xavfsizlik xizmati',
    'O‘zbek mehmondo‘stligi va Yevropa sifat uyg‘unligi',
  ];

  return (
    <section id="about" className="py-24 bg-navy-900/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Visual Composition */}
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-gold-500/30">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                alt="Grand Hotel Toshkent Lobby"
                className="w-full h-[450px] object-cover"
              />
            </div>

            {/* Overlapping Floating Luxury Card */}
            <div className="absolute -bottom-8 -right-4 sm:-right-8 z-20 glass-panel p-6 rounded-2xl border border-gold-500/40 shadow-gold-glow max-w-xs hidden sm:block animate-float">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold">
                  ★
                </div>
                <div>
                  <div className="text-white font-bold text-base">Grand Excellence</div>
                  <div className="text-xs text-slate-400">Yilning eng yaxshi mehmonxonasi</div>
                </div>
              </div>
              <p className="text-xs text-slate-300">
                Sharqona mehmondo‘stlik va zamonaviy oromning oliy namunasi.
              </p>
            </div>

            {/* Golden Frame Accent */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold-500/20 rounded-3xl -z-0 pointer-events-none"></div>
          </div>

          {/* Right Text Description */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <History className="w-3.5 h-3.5" />
              <span>Biz haqimizda</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Sizning qulayligingiz va xavfsizligingiz — bizning faxrimiz
            </h2>

            <p className="text-slate-300 text-base leading-relaxed mb-6 font-light">
              <strong className="text-white font-semibold">Grand Hotel</strong> — O‘zbekiston poytaxti Toshkentning eng nufuzli maskanlaridan birida qad rostlagan bo‘lib, biznes sayohatchilar, oilaviy mehmonlar va xorijiy sayyohlar uchun oliy darajadagi sharoitlarni taqdim etadi.
            </p>

            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Mehmonxonamiz har bir mehmonning shaxsiy ehtiyojlariga moslashtirilgan xizmatlari, hashamatli SPA va basseyn zonalari, milliy va Yevropa taomlari bilan ta’minlangan restorani bilan mashhur. Bizda o‘zingizni uydegidek erkin va shohona his qilasiz.
            </p>

            {/* Highlighted Checklist */}
            <div className="space-y-3 mb-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Signature row */}
            <div className="pt-6 border-t border-slate-800 flex items-center gap-6">
              <div>
                <div className="font-serif italic text-2xl text-gold-400">Grand Hotel Management</div>
                <div className="text-xs text-slate-400">Bosh Direktor va Mehmondo‘stlik Jamoasi</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
