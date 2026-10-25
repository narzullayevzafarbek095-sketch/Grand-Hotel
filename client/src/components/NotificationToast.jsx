import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationToast({ notification, onClose }) {
  if (!notification) return null;

  const isSuccess = notification.type === 'success';
  const isError = notification.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-slideUp">
      <div className={`p-4 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-start gap-3 ${
        isSuccess
          ? 'bg-navy-900/95 border-emerald-500/50 text-white shadow-emerald-500/10'
          : isError
          ? 'bg-navy-900/95 border-rose-500/50 text-white shadow-rose-500/10'
          : 'bg-navy-900/95 border-gold-500/50 text-white shadow-gold-glow'
      }`}>
        <div className="shrink-0 mt-0.5">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-gold-400" />}
        </div>
        
        <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
          {notification.message}
        </div>

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
