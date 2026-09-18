import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, setToken } from '../services/api';

const SESSION_KEY = 'admissionkg_session';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  // booting = đang kiểm tra phiên cũ với BE qua /auth/me
  const [booting, setBooting] = useState(() => !!localStorage.getItem('admissionkg_token'));

  // Khôi phục phiên: nếu còn token, hỏi BE /auth/me để lấy user mới nhất
  useEffect(() => {
    let cancelled = false;
    if (!localStorage.getItem('admissionkg_token')) {
      setBooting(false);
      return;
    }
    authApi
      .me()
      .then((me) => {
        if (cancelled) return;
        setUser(me);
        localStorage.setItem(SESSION_KEY, JSON.stringify(me));
      })
      .catch(() => {
        if (cancelled) return;
        setToken(null);
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      })
      .finally(() => {
        if (!cancelled) setBooting(false);
      });
    return () => { cancelled = true; };
  }, []);

  const persist = (authData) => {
    setToken(authData.token);
    localStorage.setItem(SESSION_KEY, JSON.stringify(authData.user));
    setUser(authData.user);
    return authData.user;
  };

  // Đăng ký: POST /api/v1/auth/register → nhận JWT ngay
  const register = async ({ fullName, email, password }) => {
    const authData = await authApi.register({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
    });
    return persist(authData);
  };

  // Đăng nhập: POST /api/v1/auth/login (email + password, BCrypt phía BE)
  const login = async ({ email, password }) => {
    const authData = await authApi.login({ email: email.trim(), password });
    return persist(authData);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const isAdmin = user?.role === 'ROLE_ADMIN';

  return (
    <AuthContext.Provider value={{ user, booting, register, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
