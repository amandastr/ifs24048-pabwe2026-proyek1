import { useCallback, useState } from 'react';

const IDLE = { pending: false, done: false, error: '' };

// Membungkus aksi async (kirim form, simpan data) dengan status pending, selesai, dan error.
export default function useAsyncAction(action) {
  const [status, setStatus] = useState(IDLE);

  const run = useCallback(
    async (...args) => {
      setStatus({ pending: true, done: false, error: '' });
      try {
        await action(...args);
        setStatus({ pending: false, done: true, error: '' });
        return true;
      } catch (err) {
        setStatus({ pending: false, done: false, error: err.message });
        return false;
      }
    },
    [action]
  );

  const resetStatus = useCallback(() => setStatus(IDLE), []);
  return { ...status, run, resetStatus };
}
