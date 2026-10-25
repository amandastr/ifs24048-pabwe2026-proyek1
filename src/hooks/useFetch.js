import { useEffect, useState } from 'react';
import { api } from '../api.js';

// Mengambil data dari API; request dibatalkan saat komponen lepas atau path berubah.
export default function useFetch(path, token) {
  const [state, setState] = useState({ data: null, loading: true, error: '' });

  useEffect(() => {
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: '' }));
    api(path, { token, signal: controller.signal })
      .then((data) => setState({ data, loading: false, error: '' }))
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ data: null, loading: false, error: err.message });
      });
    return () => controller.abort();
  }, [path, token]);

  return state;
}
