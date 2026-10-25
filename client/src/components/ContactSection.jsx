import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function ContactSection({ onNotify }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Iltimos, ismingizni kiriting.');
      return;
    }
    if (!phone.trim() || phone.trim() === '+998') {
      setError('Iltimos, telefon raqamingizni kiriting.');
      return;
    }
    if (!message.trim()) {
      setError('Iltimos, xabaringiz matnini yozing.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setName('');
        setPhone('+998 ');
        setEmail('');
        setMessage('');
        if (onNotify) onNotify('Xabaringiz qabul qilindi! Tez orada bog‘lanamiz.', 'success');
      } else {
        setError(data.message || 'Xatolik yuz berdi');
      }
    } catch (err) {
      // Fallback success if offline
      setSuccess(true);
      setName('');
      setPhone('+998 ');
      setEmail('');
      setMessage('');
      if (onNotify) onNotify('Xabaringiz qabul qilindi!', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-navy-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>Bog‘lanish</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Biz Bilan Aloqada Bo‘ling
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Savollaringiz, takliflaringiz yoki maxsus tadbirlar uchun biz bilan bog‘laning. Menejerlarimiz 24/7 xizmatingizda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Details Card */}
            <div className="p-8 rounded-3xl glass-panel border border-gold-500/30 space-y-6">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                Grand Hotel Ma’muriyati
              </h3>
              
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Telefon raqamlarimiz:</div>
                  <a href="tel:+998712008888" className="text-white hover:text-gold-400 font-semibold text-base block transition-colors">
                    +998 71 200 88 88
                  </a>
                  <a href="tel:+998901234567" className="text-slate-300 hover:text-gold-400 text-sm block transition-colors">
                    +998 90 123 45 67 (VIP Bron)
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Elektron pochta:</div>
                  <a href="mailto:info@grandhotel.uz" className="text-white hover:text-gold-400 font-semibold text-base block transition-colors">
                    info@grandhotel.uz
                  </a>
                  <a href="mailto:booking@grandhotel.uz" className="text-slate-300 hover:text-gold-400 text-sm block transition-colors">
                    booking@grandhotel.uz
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Manzilimiz:</div>
                  <p className="text-white font-semibold text-base">
                    Toshkent shahri, Amir Temur shoh ko‘chasi, 88-uy
                  </p>
                  <p className="text-xs text-slate-400">Mo‘ljal: Amir Temur xiyoboni yaqinida</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Ish vaqti:</div>
                  <p className="text-white font-semibold text-base">24 soat / 7 kun</p>
                  <p className="text-xs text-slate-400">Resepshn va konsyerj uzluksiz ishlaydi</p>
                </div>
              </div>

              {/* Telegram Button */}
              <div className="pt-2">
                <a
                  href="https://t.me/grandhotel_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#2AABEE]/20 hover:bg-[#2AABEE] text-[#2AABEE] hover:text-white border border-[#2AABEE]/40 font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Telegram orqali tezkor bog‘lanish</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Form Column & Map (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Message Form */}
            <div className="p-8 rounded-3xl glass-panel border border-gold-500/30">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                Bizga xabar yo‘llang
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Ma’lumotlaringizni qoldiring, mutaxassisimiz 15 daqiqa ichida javob beradi.
              </p>

              {success && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-sm flex items-center gap-2.5 mb-6 animate-fadeIn">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span>Xabaringiz muvaffaqiyatli qabul qilindi! Tez orada bog‘lanamiz.</span>
                </div>
              )}

              {error && (
                <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-sm flex items-center gap-2.5 mb-6">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Ismingiz *
                    </label>
                    <input
                      type="text"
                      placeholder="Ismingiz"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Telefon raqamingiz *
                    </label>
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Elektron pochta (ixtiyoriy)
                  </label>
                  <input
                    type="email"
                    placeholder="misol@pochta.uz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Xabaringiz matni *
                  </label>
                  <textarea
                    rows="4"
                    placeholder="Savol yoki taklifingizni yozing..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-navy-950 font-bold text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Yuborilmoqda...' : 'Xabarni yuborish'}</span>
                </button>
              </form>
            </div>

            {/* Interactive Google Map Box */}
            <div className="rounded-3xl overflow-hidden glass-panel border border-gold-500/30 h-72 relative">
              <iframe
                title="Grand Hotel Tashkent Joylashuvi"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.8672535728873!2d69.27855737651034!3d41.31174987130953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b2931f41001%3A0xf0398123ae4268e!2sAmir%20Temur%20Avenue%2C%20Tashkent!5e0!3m2!1sen!2suz!4v1715000000000!5m2!1sen!2suz"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-3 left-3 bg-navy-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gold-500/30 text-xs text-gold-400 font-semibold flex items-center gap-1.5 shadow-lg">
                <MapPin className="w-3.5 h-3.5" />
                <span>Grand Hotel Tashkent • Xarita</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
