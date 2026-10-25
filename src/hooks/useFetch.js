import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../auth.jsx';

// Mengambil data dari API; request dibatalkan saat komponen lepas atau path berubah.
// Jika token ditolak server (401), sesi dihapus dan pengguna diarahkan ke login.
export default function useFetch(path, token) {
  const { logout } = useAuth();
  const [state, setState] = useState({ data: null, loading: true, error: '' });

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: '' }));
    api(path, { token, signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: '' }))
      .catch((err) => {
        if (err.name === 'AbortError') return;
        if (token && err.status === 401) logout();
        setState({ data: null, loading: false, error: err.message });
      });
    return () => controller.abort();
  }, [path, token, logout]);

  return state;
}
