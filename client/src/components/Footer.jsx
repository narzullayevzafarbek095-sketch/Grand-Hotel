import React from 'react';
import { Crown, Phone, Mail, MapPin, Send, Heart } from 'lucide-react';

export default function Footer({ onOpenAdminLogin }) {
  return (
    <footer className="bg-navy-950 border-t border-gold-500/20 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 shadow-gold-glow">
                <Crown className="w-5 h-5" />
              </div>
              <span className="text-2xl font-serif font-bold gold-gradient-text tracking-wider">
                GRAND HOTEL
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Toshkentning nufuzli markazidagi 5 yulduzli hashamatli mehmonxona. Betakror orom, sharqona lutf va jahon andozalaridagi eng yuqori darajadagi xizmat.
            </p>

            <div className="pt-2 text-xs text-gold-400 font-medium">
              ★ ★ ★ ★ ★ 5 Yulduzli Xalqaro Mehmonxona Standarti
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-serif font-bold text-base mb-4">Tezkor havolalar</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#home" className="hover:text-gold-400 transition-colors">Bosh sahifa</a></li>
              <li><a href="#rooms" className="hover:text-gold-400 transition-colors">Xonalar va narxlar</a></li>
              <li><a href="#services" className="hover:text-gold-400 transition-colors">Mehmonxona xizmatlari</a></li>
              <li><a href="#restaurant" className="hover:text-gold-400 transition-colors">Grand Gourmet Restorani</a></li>
              <li><a href="#about" className="hover:text-gold-400 transition-colors">Biz haqimizda</a></li>
              <li><a href="#contact" className="hover:text-gold-400 transition-colors">Aloqa va joylashuv</a></li>
            </ul>
          </div>

          {/* Room Types */}
          <div>
            <h4 className="text-white font-serif font-bold text-base mb-4">Xona turlari</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#rooms" className="hover:text-gold-400 transition-colors">Standard Xona ($60)</a></li>
              <li><a href="#rooms" className="hover:text-gold-400 transition-colors">Deluxe Lyuks ($110)</a></li>
              <li><a href="#rooms" className="hover:text-gold-400 transition-colors">VIP Prezident Suite ($220)</a></li>
              <li><a href="#rooms" className="hover:text-gold-400 transition-colors">Family Oila Xonasi ($160)</a></li>
              <li><a href="#rooms" className="hover:text-gold-400 transition-colors">Panoramik Terrasali Suite</a></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-white font-serif font-bold text-base mb-4">Maxsus takliflar</h4>
            <p className="text-xs text-slate-400 mb-3">
              Yangi aksiyalar va VIP chegirmalardan birinchi bo‘lib xabardor bo‘ling:
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Pochta manzilingiz"
                className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-gold-500"
              />
              <button 
                onClick={() => alert("Rahmat! Siz Grand Hotel VIP xabarnomalariga a'zo bo'ldingiz.")}
                className="p-2 rounded-xl gold-gradient-bg text-navy-950 font-bold hover:shadow-gold-glow transition-all shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={onOpenAdminLogin}
                className="text-xs text-slate-500 hover:text-gold-400 transition-colors"
              >
                🔒 Xodimlar va Administrator Kirishi
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Grand Hotel Tashkent. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-1">
            Zamonaviy Full-Stack arxitekturada yaratilgan
          </p>
        </div>

      </div>
    </footer>
  );
}
