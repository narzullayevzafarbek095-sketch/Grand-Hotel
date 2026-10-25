import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  LayoutDashboard, 
  BedDouble, 
  CalendarCheck, 
  DollarSign, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2, 
  Search, 
  LogOut, 
  ArrowLeft, 
  Edit3, 
  Save, 
  MessageSquare,
  TrendingUp,
  RefreshCw,
  Sliders,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard({ onBackToSite, onNotify }) {
  const { admin, logout, token } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'rooms' | 'messages'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Data states
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    occupancyRate: 85
  });
  const [loading, setLoading] = useState(true);

  // Edit Room Price state
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [editingPrice, setEditingPrice] = useState('');

  // Fetch all dashboard data
  const loadData = async () => {
    setLoading(true);
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // 1. Fetch Bookings
      const resBookings = await fetch('/api/bookings', { headers });
      const dataBookings = await resBookings.json();
      if (dataBookings.success) setBookings(dataBookings.data);

      // 2. Fetch Rooms
      const resRooms = await fetch('/api/rooms', { headers });
      const dataRooms = await resRooms.json();
      if (dataRooms.success) setRooms(dataRooms.data);

      // 3. Fetch Contacts / Messages
      const resMessages = await fetch('/api/contacts', { headers });
      const dataMessages = await resMessages.json();
      if (dataMessages.success) setMessages(dataMessages.data);

      // 4. Fetch Stats
      const resStats = await fetch('/api/stats', { headers });
      const dataStats = await resStats.json();
      if (dataStats.success) setStats(dataStats.stats);

    } catch (err) {
      console.warn('Backend offline or using fallback demo state:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [token]);

  // Handle Booking Status Update (Confirm, Cancel, Finish)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        setBookings(prev => prev.map(b => (b.id === id ? { ...b, status: newStatus } : b)));
        if (onNotify) onNotify(`Buyurtma holati "${newStatus}" ga o‘zgartirildi`, 'success');
        loadData();
      }
    } catch (err) {
      // Local optimistic update
      setBookings(prev => prev.map(b => (b.id === id ? { ...b, status: newStatus } : b)));
      if (onNotify) onNotify(`Buyurtma holati yangilandi (${newStatus})`, 'success');
    }
  };

  // Handle Delete Booking
  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Haqiqatdan ham bu buyurtmani o‘chirmoqchimisiz?')) return;
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(prev => prev.filter(b => b.id !== id));
      if (onNotify) onNotify('Buyurtma o‘chirildi', 'info');
    } catch (err) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  // Handle Room Update (Price, Availability)
  const handleSaveRoomPrice = async (roomId) => {
    const newPrice = parseFloat(editingPrice);
    if (isNaN(newPrice) || newPrice <= 0) return;

    try {
      const res = await fetch(`/api/rooms/${roomId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ price_per_night: newPrice })
      });
      const data = await res.json();
      if (data.success) {
        setRooms(prev => prev.map(r => r.id === roomId ? { ...r, price_per_night: newPrice } : r));
        setEditingRoomId(null);
        if (onNotify) onNotify('Xona narxi yangilandi', 'success');
      }
    } catch (err) {
      setRooms(prev => prev.map(r => r.id === roomId ? { ...r, price_per_night: newPrice } : r));
      setEditingRoomId(null);
    }
  };

  const handleToggleRoomAvailability = async (room) => {
    const updated = !room.is_available;
    try {
      await fetch(`/api/rooms/${room.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ is_available: updated })
      });
      setRooms(prev => prev.map(r => r.id === room.id ? { ...r, is_available: updated } : r));
      if (onNotify) onNotify(`Xona holati o'zgartirildi: ${updated ? "Bo'sh (Faol)" : "Band"}`, 'info');
    } catch (err) {
      setRooms(prev => prev.map(r => r.id === room.id ? { ...r, is_available: updated } : r));
    }
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      (b.guest_name && b.guest_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.booking_code && b.booking_code.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.guest_phone && b.guest_phone.includes(searchQuery));
    
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col">
      
      {/* Top Admin Navbar */}
      <header className="bg-navy-900 border-b border-gold-500/20 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-30 shadow-lg">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToSite}
            className="p-2 rounded-xl bg-navy-800 text-slate-300 hover:text-gold-400 hover:bg-navy-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Veb-saytga qaytish</span>
          </button>
          
          <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
            <div className="w-8 h-8 rounded-lg bg-gold-500 text-navy-950 flex items-center justify-center font-bold">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base font-serif font-bold text-white leading-none">Grand Hotel Admin</h1>
              <span className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold">Boshqaruv Tizimi</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <div className="text-xs font-bold text-white">{admin?.name || 'Bosh Administrator'}</div>
            <div className="text-[10px] text-emerald-400 font-medium">● Tizimda faol</div>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Chiqish"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Chiqish</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-8">
        
        {/* Statistics Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Total Bookings */}
          <div className="p-6 rounded-2xl glass-panel border border-gold-500/20 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Jami buyurtmalar</p>
              <h3 className="text-3xl font-serif font-bold text-white mt-1">{stats.totalBookings || bookings.length}</h3>
              <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12% o‘tgan haftaga nisbatan
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>

          {/* Card 2: Total Revenue */}
          <div className="p-6 rounded-2xl glass-panel border border-gold-500/20 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Jami Tushum</p>
              <h3 className="text-3xl font-serif font-bold gold-gradient-text mt-1">
                ${stats.totalRevenue || bookings.reduce((sum, b) => sum + (b.status === 'tasdiqlangan' ? Number(b.total_price) : 0), 0)}
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Tasdiqlangan buyurtmalar hisobida</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          {/* Card 3: Pending Approvals */}
          <div className="p-6 rounded-2xl glass-panel border border-gold-500/20 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Kutilayotganlar</p>
              <h3 className="text-3xl font-serif font-bold text-amber-400 mt-1">
                {bookings.filter(b => b.status === 'kutilmoqda').length}
              </h3>
              <p className="text-[11px] text-amber-300/80 mt-1">Tasdiqlashni kutmoqda</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Card 4: Occupancy Rate */}
          <div className="p-6 rounded-2xl glass-panel border border-gold-500/20 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Bandlik darajasi</p>
              <h3 className="text-3xl font-serif font-bold text-white mt-1">
                {stats.occupancyRate || 85}%
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">{rooms.length} ta asosiy xona bo‘yicha</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Tab Navigation & Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'bookings'
                  ? 'gold-gradient-bg text-navy-950 font-bold shadow-gold-glow'
                  : 'bg-navy-900 text-slate-300 hover:text-white'
              }`}
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Buyurtmalar ({bookings.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('rooms')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'rooms'
                  ? 'gold-gradient-bg text-navy-950 font-bold shadow-gold-glow'
                  : 'bg-navy-900 text-slate-300 hover:text-white'
              }`}
            >
              <BedDouble className="w-4 h-4" />
              <span>Xonalar & Narxlar ({rooms.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'messages'
                  ? 'gold-gradient-bg text-navy-950 font-bold shadow-gold-glow'
                  : 'bg-navy-900 text-slate-300 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Xabarlar ({messages.length})</span>
            </button>
          </div>

          <button
            onClick={loadData}
            className="p-2 rounded-xl bg-navy-900 text-slate-300 hover:text-gold-400 border border-slate-800 transition-colors flex items-center gap-1.5 text-xs self-end sm:self-auto"
            title="Yangilash"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Yangilash</span>
          </button>
        </div>

        {/* Tab 1: Bookings Management */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ism, telefon yoki ID bo‘yicha izlash..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-navy-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                <span className="text-xs text-slate-400">Holat:</span>
                {[
                  { id: 'all', label: 'Barchasi' },
                  { id: 'kutilmoqda', label: 'Kutilmoqda' },
                  { id: 'tasdiqlangan', label: 'Tasdiqlangan' },
                  { id: 'bekor_qilingan', label: 'Bekor qilingan' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setStatusFilter(st.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      statusFilter === st.id
                        ? 'bg-gold-500 text-navy-950 font-bold'
                        : 'bg-navy-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bookings Table */}
            <div className="rounded-2xl overflow-hidden glass-panel border border-gold-500/20">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-navy-900/90 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Buyurtma ID</th>
                      <th className="py-3.5 px-4">Filial / Shaxar</th>
                      <th className="py-3.5 px-4">Mehmon</th>
                      <th className="py-3.5 px-4">Xona</th>
                      <th className="py-3.5 px-4">Muddat</th>
                      <th className="py-3.5 px-4">Jami Narx</th>
                      <th className="py-3.5 px-4">Holat</th>
                      <th className="py-3.5 px-4 text-right">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="py-8 text-center text-slate-400 text-sm">
                          Hech qanday buyurtma topilmadi.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-navy-900/50 transition-colors">
                          {/* ID */}
                          <td className="py-3.5 px-4 font-mono font-bold text-gold-400">
                            {b.booking_code}
                          </td>

                          {/* Branch */}
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-white">{b.branch_name || 'Grand Hotel Tashkent'}</div>
                            <div className="text-xs text-gold-400/90">{b.branch_city || 'Toshkent'}</div>
                          </td>

                          {/* Guest */}
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{b.guest_name}</div>
                            <div className="text-xs text-slate-400">{b.guest_phone}</div>
                            {b.special_notes && (
                              <div className="text-[11px] text-amber-300/80 italic mt-0.5">
                                "{b.special_notes}"
                              </div>
                            )}
                          </td>

                          {/* Room */}
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-200">{b.room_name}</div>
                            <div className="text-xs text-slate-400">{b.guests_count} nafar mehmon</div>
                          </td>

                          {/* Dates */}
                          <td className="py-3.5 px-4">
                            <div className="text-slate-200 font-medium">
                              {b.check_in} — {b.check_out}
                            </div>
                            <div className="text-xs text-gold-400/90 font-medium">
                              {b.nights} kecha (${b.price_per_night}/k)
                            </div>
                          </td>

                          {/* Total Price */}
                          <td className="py-3.5 px-4 font-bold font-serif gold-gradient-text text-base">
                            ${b.total_price}
                          </td>

                          {/* Status Badge */}
                          <td className="py-3.5 px-4">
                            {b.status === 'tasdiqlangan' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                <CheckCircle className="w-3 h-3" /> Tasdiqlangan
                              </span>
                            ) : b.status === 'bekor_qilingan' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                                <XCircle className="w-3 h-3" /> Bekor qilingan
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                <Clock className="w-3 h-3" /> Kutilmoqda
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {b.status !== 'tasdiqlangan' && (
                                <button
                                  onClick={() => handleUpdateStatus(b.id, 'tasdiqlangan')}
                                  className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-navy-950 transition-colors"
                                  title="Tasdiqlash"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                              {b.status !== 'bekor_qilingan' && (
                                <button
                                  onClick={() => handleUpdateStatus(b.id, 'bekor_qilingan')}
                                  className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors"
                                  title="Bekor qilish"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                className="p-1.5 rounded-lg bg-navy-800 text-slate-400 hover:text-rose-400 transition-colors"
                                title="O‘chirish"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Rooms & Price Management */}
        {activeTab === 'rooms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">Xonalar va Narxlar Boshqaruvi</h3>
                <p className="text-xs text-slate-400">Har bir xona turi bo‘yicha narxni va bron qilish holatini o‘zgartiring</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rooms.map((room) => (
                <div key={room.id} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
                  <div>
                    <img
                      src={room.image_url}
                      alt={room.name}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] uppercase font-bold text-gold-400 tracking-wider">
                        {room.type}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        room.is_available ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                      }`}>
                        {room.is_available ? "Bo'sh (Faol)" : 'Band'}
                      </span>
                    </div>

                    <h4 className="text-lg font-serif font-bold text-white mb-2">{room.name}</h4>
                    <p className="text-xs text-slate-400 mb-4">{room.capacity} kishilik • {room.size}</p>
                    
                    {/* Price edit */}
                    <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 mb-4">
                      <span className="text-xs text-slate-400 block mb-1">Bir kechalik narx:</span>
                      {editingRoomId === room.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={editingPrice}
                            onChange={(e) => setEditingPrice(e.target.value)}
                            className="w-full px-2 py-1 rounded bg-navy-900 border border-gold-500 text-sm font-bold text-white focus:outline-none"
                          />
                          <button
                            onClick={() => handleSaveRoomPrice(room.id)}
                            className="p-1.5 rounded bg-gold-500 text-navy-950 hover:bg-gold-400"
                            title="Saqlash"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold font-serif gold-gradient-text">
                            ${room.price_per_night} / kecha
                          </span>
                          <button
                            onClick={() => {
                              setEditingRoomId(room.id);
                              setEditingPrice(room.price_per_night);
                            }}
                            className="p-1 text-slate-400 hover:text-gold-400"
                            title="Narxni o‘zgartirish"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Toggle availability */}
                  <button
                    onClick={() => handleToggleRoomAvailability(room)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                      room.is_available
                        ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30'
                        : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30'
                    }`}
                  >
                    {room.is_available ? 'Xonani band deb belgilash' : 'Xonani bo‘shatish (Faollashtirish)'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Messages & Inquiries */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-white">Mijozlar Murojaatlari va Xabarlari</h3>
            
            <div className="space-y-3">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-slate-400 glass-panel rounded-2xl">
                  Hozircha yangi murojaatlar yo‘q.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white text-base">{msg.name}</span>
                        <span className="text-xs text-gold-400 font-medium">{msg.phone}</span>
                        {msg.email && <span className="text-xs text-slate-400">({msg.email})</span>}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed pt-1">
                        "{msg.message}"
                      </p>
                      <div className="text-[11px] text-slate-500 pt-1">
                        Yuborilgan vaqti: {new Date(msg.created_at).toLocaleString('uz-UZ')}
                      </div>
                    </div>

                    <a
                      href={`tel:${msg.phone}`}
                      className="shrink-0 px-4 py-2 rounded-xl gold-gradient-bg text-navy-950 font-bold text-xs hover:shadow-gold-glow transition-all"
                    >
                      Qo‘ng‘iroq qilish
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}
