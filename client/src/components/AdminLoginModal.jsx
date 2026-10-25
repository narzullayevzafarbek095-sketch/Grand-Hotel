import React, { useState } from 'react';
import { X, Shield, Lock, User, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null;

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('grand2026');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSubmitting(true);

    const result = await login(username, password);
    setSubmitting(false);

    if (result.success) {
      if (onSuccess) onSuccess();
      onClose();
    } else {
      setErrorMessage(result.message || 'Login yoki parol noto‘g‘ri');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-navy-900 border border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-navy-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white">Administrator Kirishi</h3>
              <p className="text-xs text-slate-400">Grand Hotel Boshqaruv Tizimi</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-navy-800/60 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Quick Demo Hint */}
          <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-xs text-gold-300">
            <span className="font-bold">Standart hisob ma’lumotlari:</span>
            <div className="mt-1 font-mono text-[11px] text-slate-300">
              Login: <strong className="text-white">admin</strong> | Parol: <strong className="text-white">grand2026</strong>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gold-400" /> Foydalanuvchi nomi (Login)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-gold-400" /> Maxfiy parol
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-navy-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-gold-500 transition-colors pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl gold-gradient-bg text-navy-950 font-bold text-sm shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 active:scale-[0.99] mt-2 flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            <span>{submitting ? 'Tekshirilmoqda...' : 'Tizimga kirish'}</span>
          </button>
        </form>

      </div>
    </div>
  );
}
