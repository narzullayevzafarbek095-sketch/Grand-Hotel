import React from 'react';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { initialTestimonials } from '../data/initialData';

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-navy-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Mehmonlar fikri</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
            Bizning Qadrli Mehmonlarimiz E’tirofi
          </h2>
          <p className="text-slate-400 text-sm">
            Dunyoning 40 dan ortiq davlatlaridan tashrif buyurgan mehmonlarimizning samimiy taassurotlari.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initialTestimonials.map((review) => (
            <div
              key={review.id}
              className="p-7 rounded-2xl glass-panel relative flex flex-col justify-between border border-slate-800 hover:border-gold-500/40 transition-all duration-300"
            >
              <div>
                {/* Gold Quote Icon */}
                <div className="text-gold-500/30 mb-4">
                  <Quote className="w-9 h-9" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 text-gold-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-400" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-300 text-sm leading-relaxed italic mb-6">
                  "{review.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-sm">{review.name}</h4>
                  <p className="text-xs text-gold-400">{review.role} • {review.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
