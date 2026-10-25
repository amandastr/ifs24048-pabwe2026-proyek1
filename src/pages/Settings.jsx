import { useEffect, useState } from 'react';
import { useAuth } from '../auth.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import Field from '../components/Field.jsx';
import Alert from '../components/Alert.jsx';
import Loading from '../components/Loading.jsx';
import { saveSettings } from '../services/settingsService.js';

const IDLE = { saving: false, saved: false, error: '' };

export default function Settings() {
  usePageTitle('Pengaturan');
  const { token } = useAuth();
  const { data, loading, error } = useFetch('/settings', token);
  const [values, setValues] = useState({ language: 'id', notifications: true });
  const [status, setStatus] = useState(IDLE);

  useEffect(() => { if (data) setValues(data); }, [data]);

  async function submit(event) {
    event.preventDefault();
    setStatus({ ...IDLE, saving: true });
    try {
      await saveSettings(token, values);
      setStatus({ ...IDLE, saved: true });
    } catch (err) {
      setStatus({ ...IDLE, error: err.message });
    }
  }

  return (
    <>
      <h1 className="text-4xl font-bold">Pengaturan</h1>
      {loading && <Loading />}
      <Alert message={error} />
      <form onSubmit={submit} className="mt-6 max-w-md space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
        <Field id="bahasa" label="Bahasa" as="select" value={values.language} onChange={(e) => setValues({ ...values, language: e.target.value })}>
          <option value="id">Bahasa Indonesia</option>
          <option value="en">English</option>
        </Field>
        <div className="flex items-center gap-3">
          <input id="notif" type="checkbox" className="h-5 w-5 accent-cocoa" checked={values.notifications} onChange={(e) => setValues({ ...values, notifications: e.target.checked })} />
          <label htmlFor="notif" className="font-semibold">Kirim notifikasi status pesanan</label>
        </div>
        <Alert message={status.error} />
        <button className="btn" type="submit" disabled={status.saving}>{status.saving ? 'Menyimpan…' : 'Simpan pengaturan'}</button>
        {status.saved && <p role="status" className="font-semibold">Pengaturan disimpan.</p>}
      </form>
    </>
  );
}
