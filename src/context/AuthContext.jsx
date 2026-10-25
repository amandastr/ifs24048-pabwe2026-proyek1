import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { loginRequest } from '../services/authService.js';
import { getTokenExpiry } from '../utils/jwt.js';
import { readSession, saveSession, clearSession } from '../services/tokenStorage.js';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth harus dipakai di dalam AuthProvider');
  return context;
}

// Context hanya menyimpan state; akses API dan penyimpanan ada di folder services.
export function AuthProvider({ children }) {
  const [session, setSession] = useState(readSession);

  const login = useCallback(async (username, password) => {
    const data = await loginRequest(username, password);
    saveSession(data);
    setSession(data);
  }, []);

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  // Keluar otomatis tepat saat token kedaluwarsa.
  useEffect(() => {
    if (!session) return undefined;
    const delay = Math.max(getTokenExpiry(session.token) - Date.now(), 0);
    const timer = setTimeout(logout, delay);
    return () => clearTimeout(timer);
  }, [session, logout]);

  const value = useMemo(
    () => ({ token: session?.token ?? null, user: session?.user ?? null, login, logout }),
    [session, login, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };
