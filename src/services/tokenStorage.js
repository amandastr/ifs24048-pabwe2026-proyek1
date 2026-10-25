import { isTokenExpired } from '../utils/jwt.js';

const KEY = 'dolceria-session';

// Token JWT yang sudah kedaluwarsa atau rusak dianggap tidak valid.
function isTokenValid(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return typeof payload.exp !== 'number' || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

// Membaca sesi dengan aman: data rusak, token kedaluwarsa, atau penyimpanan tidak tersedia dianggap belum login.
export function readSession() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    const valid = session && typeof session.token === 'string' && session.user && isTokenValid(session.token);
    if (!valid) {
      localStorage.removeItem(KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function saveSession(session) {
  try {
    localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    /* penyimpanan tidak tersedia: sesi hanya hidup di memori */
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* tidak ada yang perlu dibersihkan */
  }
}
