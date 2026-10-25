import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('grand_hotel_admin_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      // Validate session with backend or local verification
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAdmin(data.user);
        } else {
          // Token expired
          logout();
        }
      })
      .catch(() => {
        // Fallback for standalone / offline
        if (token === 'demo_admin_token_2026') {
          setAdmin({ username: 'admin', role: 'admin', name: 'Grand Hotel Bosh Administratori' });
        }
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('grand_hotel_admin_token', data.token);
        setToken(data.token);
        setAdmin(data.user);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Login yoki parol noto\'g\'ri' };
      }
    } catch (err) {
      // Fallback if backend server is not running
      if (username === 'admin' && password === 'grand2026') {
        const demoToken = 'demo_admin_token_2026';
        localStorage.setItem('grand_hotel_admin_token', demoToken);
        setToken(demoToken);
        const demoUser = { username: 'admin', role: 'admin', name: 'Grand Hotel Bosh Administratori' };
        setAdmin(demoUser);
        return { success: true, message: 'Offline/Demo rejimida administrator sifatida kirdingiz' };
      }
      return { success: false, message: 'Serverga ulanishda xatolik yuz berdi' };
    }
  };

  const logout = () => {
    localStorage.removeItem('grand_hotel_admin_token');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, loading, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
