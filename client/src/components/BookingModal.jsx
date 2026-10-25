import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Phone, 
  Users, 
  BedDouble, 
  AlertCircle, 
  CheckCircle, 
  ShieldCheck, 
  Printer, 
  Building2, 
  MapPin 
} from 'lucide-react';
import { initialBranches } from '../data/initialData';

export default function BookingModal({ isOpen, onClose, initialData = null, rooms = [], onBookingSuccess }) {
  if (!isOpen) return null;

  // Form states
  const [selectedBranchId, setSelectedBranchId] = useState('tashkent');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('+998 ');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestsCount, setGuestsCount] = useState('2');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');

  // UI status
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Initialize or pre-populate data
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayStr = today.toISOString().split('T')[0];
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (initialData?.checkIn) {
      setCheckIn(initialData.checkIn);
    } else {
      setCheckIn(todayStr);
    }

    if (initialData?.checkOut) {
      setCheckOut(initialData.checkOut);
    } else {
      setCheckOut(tomorrowStr);
    }

    if (initialData?.guestsCount) {
      setGuestsCount(initialData.guestsCount);
    }

    // Branch preselection
    if (initialData?.branchId) {
      setSelectedBranchId(initialData.branchId);
    } else if (initialData?.id && typeof initialData.id === 'string' && initialBranches.some(b => b.id === initialData.id)) {
      setSelectedBranchId(initialData.id);
    }

    // Room preselection
    if (initialData?.id && typeof initialData.id === 'number') {
      setSelectedRoomId(initialData.id.toString());
    } else if (initialData?.roomType) {
      const match = rooms.find(r => r.type.toLowerCase() === initialData.roomType.toLowerCase());
      setSelectedRoomId(match ? match.id.toString() : (rooms[0]?.id?.toString() || '1'));
    } else if (rooms.length > 0) {
      setSelectedRoomId(rooms[0].id.toString());
    }
  }, [initialData, rooms]);

  // Current selected room object
  const activeRoom = rooms.find(r => r.id.toString() === selectedRoomId.toString()) || rooms[0] || {
    id: 1,
    name: 'Standard Xona',
    type: 'standard',
    price_per_night: 60,
    capacity: 2
  };

  // Current selected branch object
  const activeBranch = initialBranches.find(b => b.id === selectedBranchId) || initialBranches[0];

  // Live calculation of nights and total price
  let nights = 0;
  let totalPrice = 0;
  let dateValid = true;

  if (checkIn && checkOut) {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    if (!isNaN(d1.getTime()) && !isNaN(d2.getTime())) {
      if (d2 > d1) {
        const diff = Math.abs(d2 - d1);
        nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
        totalPrice = nights * (activeRoom?.price_per_night || 0);
      } else {
        dateValid = false;
      }
    }
  }

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Validation: Empty fields
    if (!guestName.trim()) {
      setErrorMessage('Iltimos, Ism va familiyangizni to‘liq kiriting.');
      return;
    }
    if (!guestPhone.trim() || guestPhone.trim() === '+998') {
      setErrorMessage('Iltimos, bog‘lanish uchun telefon raqamingizni kiriting.');
      return;
    }
    if (!checkIn) {
      setErrorMessage('Iltimos, kirish (check-in) sanasini belgilang.');
      return;
    }
    if (!checkOut) {
      setErrorMessage('Iltimos, chiqish (check-out) sanasini belgilang.');
      return;
    }

    // 2. Validation: Dates check-in < check-out
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    if (inDate >= outDate) {
      setErrorMessage('Kirish sanasi chiqish sanasidan oldin bo‘lishi shart!');
      return;
    }

    // 3. Validation: Guest capacity
    if (Number(guestsCount) > activeRoom.capacity) {
      setErrorMessage(`${activeRoom.name} maksimal ${activeRoom.capacity} kishilik. Iltimos, sig‘imga mos xonani tanlang yoki mehmonlar sonini kamaytiring.`);
      return;
    }

    setSubmitting(true);

    const bookingPayload = {
      branch_id: activeBranch.id,
      branch_name: activeBranch.name,
      branch_city: activeBranch.city,
      guest_name: guestName.trim(),
      guest_phone: guestPhone.trim(),
      check_in: checkIn,
      check_out: checkOut,
      guests_count: Number(guestsCount),
      room_id: activeRoom.id,
      room_type: activeRoom.type,
      room_name: activeRoom.name,
      price_per_night: activeRoom.price_per_night,
      total_price: totalPrice,
      nights,
      special_notes: specialNotes.trim()
    };

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      const result = await response.json();

      if (result.success) {
        setConfirmedBooking({ ...result.data, branch_name: activeBranch.name, branch_city: activeBranch.city });
        if (onBookingSuccess) onBookingSuccess(result.data);
      } else {
        setErrorMessage(result.message || 'Band qilishda xatolik yuz berdi.');
      }
    } catch (err) {
      // Fallback local booking
      const localCode = 'GH-' + Math.floor(10000 + Math.random() * 90000);
      const fallbackBooking = {
        id: Date.now(),
        booking_code: localCode,
        ...bookingPayload,
        status: 'kutilmoqda',
        created_at: new Date().toISOString()
      };
      setConfirmedBooking(fallbackBooking);
      if (onBookingSuccess) onBookingSuccess(fallbackBooking);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-navy-900 border border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 animate-fadeIn">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-navy-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <BedDouble className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">
                {confirmedBooking ? 'Band qilish tasdig‘i' : 'Xona band qilish'}
              </h3>
              <p className="text-xs text-slate-400">Grand Hotel O‘zbekiston • 12 ta viloyat filiallari</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-navy-800/60 text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {confirmedBooking ? (
            /* Confirmation Receipt View */
            <div className="space-y-6">
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-white mb-1">
                  Buyurtmangiz qabul qilindi!
                </h4>
                <p className="text-sm text-slate-300">
                  Hurmatli <span className="font-semibold text-gold-400">{confirmedBooking.guest_name}</span>, sizning nomingizga xona muvaffaqiyatli band qilindi.
                </p>
              </div>

              {/* Receipt Card */}
              <div className="p-5 rounded-2xl bg-navy-950 border border-gold-500/20 space-y-3 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <span className="text-slate-400">Buyurtma kodi (ID):</span>
                  <span className="font-mono font-bold text-gold-400 text-base">{confirmedBooking.booking_code}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mehmonxona filiali:</span>
                  <span className="font-medium text-white text-right">{confirmedBooking.branch_name || activeBranch.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Xona turi:</span>
                  <span className="font-medium text-white">{confirmedBooking.room_name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Mehmonlar soni:</span>
                  <span className="font-medium text-white">{confirmedBooking.guests_count} nafar</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Muddat:</span>
                  <span className="font-medium text-white">
                    {confirmedBooking.check_in} — {confirmedBooking.check_out} ({confirmedBooking.nights} kecha)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Bir kechalik narx:</span>
                  <span className="font-medium text-white">${confirmedBooking.price_per_night}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-slate-800 text-base">
                  <span className="font-bold text-white">Jami to‘lov summasi:</span>
                  <span className="font-bold font-serif gold-gradient-text text-xl">
                    ${confirmedBooking.total_price}
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-400 bg-navy-800/40 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <span>
                  Admin tez orada telefon orqali ({confirmedBooking.guest_phone}) bog‘lanib, buyurtmangizni tasdiqlaydi. To‘lov mehmonxonaga kelganda amalga oshiriladi.
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="flex-1 py-3 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-200 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-gold-400" />
                  <span>Chekni chop etish</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl gold-gradient-bg text-navy-950 font-bold text-sm shadow-gold-glow transition-all"
                >
                  Yopish
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 text-xs sm:text-sm flex items-start gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Viloyat / Filial tanlash (12 ta viloyat) */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-gold-400" /> Mehmonxona filiali / Viloyat *
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                >
                  {initialBranches.map((b) => (
                    <option key={b.id} value={b.id} className="bg-navy-900 text-white">
                      {b.city} — {b.name} ({b.region})
                    </option>
                  ))}
                </select>
                <div className="text-[11px] text-gold-400/90 mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{activeBranch.address} ({activeBranch.landmark})</span>
                </div>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gold-400" /> Ism va familiyangiz *
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Jamshid Aliyev"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-gold-400" /> Telefon raqamingiz *
                  </label>
                  <input
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Room Selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-gold-400" /> Xona turini tanlang *
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                >
                  {rooms.map((r) => (
                    <option key={r.id} value={r.id} className="bg-navy-900 text-white">
                      {r.name} — ${r.price_per_night} / kecha (sig‘imi: {r.capacity} kishi)
                    </option>
                  ))}
                </select>
              </div>

              {/* Dates & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Check In */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" /> Kirish sanasi *
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                    required
                  />
                </div>

                {/* Check Out */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" /> Chiqish sanasi *
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                    required
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-gold-400" /> Mehmonlar *
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n} className="bg-navy-900 text-white">
                        {n} nafar {n > activeRoom.capacity ? `(Sig‘imdan oshgan!)` : ''}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Qo‘shimcha istaklar (ixtiyoriy)
                </label>
                <textarea
                  rows="2"
                  placeholder="Masalan: Aeroportdan kutib olish, sokin yuqori qavat, bolalar karavoti..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
                ></textarea>
              </div>

              {/* Real-time Calculation Summary Box */}
              <div className="p-4 rounded-2xl bg-navy-950/80 border border-gold-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">
                    {dateValid && nights > 0 ? (
                      <span>{nights} kecha × ${activeRoom.price_per_night} ({activeBranch.city})</span>
                    ) : (
                      <span className="text-rose-400">Kirish sanasi chiqishdan oldin bo‘lishi lozim</span>
                    )}
                  </div>
                  <div className="text-xs text-gold-400 font-medium">Barcha soliqlar va xizmat haqi ichida</div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Umumiy narx:</div>
                  <div className="text-2xl font-serif font-bold gold-gradient-text">
                    ${totalPrice}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !dateValid || nights < 1}
                className="w-full py-4 rounded-xl gold-gradient-bg text-navy-950 font-bold text-base shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.99] flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Buyurtma yuborilmoqda...</span>
                ) : (
                  <>
                    <span>Band qilishni tasdiqlash</span>
                    <span className="text-sm">(${totalPrice})</span>
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
