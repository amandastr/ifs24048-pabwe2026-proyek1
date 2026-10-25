const KEY = 'dolceria-session';

// Membaca sesi dengan aman: data rusak atau penyimpanan tidak tersedia dianggap belum login.
export function readSession() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session && typeof session.token === 'string' && session.user ? session : null;
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
