import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import useAsyncAction from '../hooks/useAsyncAction.js';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import AsyncState from '../components/AsyncState.jsx';
import Field from '../components/Field.jsx';
import Alert from '../components/Alert.jsx';
import { saveSettings } from '../services/settingsService.js';

export default function Settings() {
  usePageTitle('Pengaturan');
  const { token } = useAuth();
  const { data, loading, error } = useFetch('/settings', token);
  const [values, setValues] = useState({ language: 'id', notifications: true });
  const save = useAsyncAction(useCallback((settings) => saveSettings(token, settings), [token]));

  useEffect(() => { if (data) setValues(data); }, [data]);

  function submit(event) {
    event.preventDefault();
    save.run(values);
  }

  return (
    <>
      <h1 className="text-4xl font-bold">Pengaturan</h1>
      <AsyncState loading={loading} error={error} />
      <form onSubmit={submit} className="mt-6 max-w-md space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
        <Field id="bahasa" label="Bahasa" as="select" value={values.language} onChange={(e) => setValues({ ...values, language: e.target.value })}>
          <option value="id">Bahasa Indonesia</option>
          <option value="en">English</option>
        </Field>
        <div className="flex items-center gap-3">
          <input id="notif" type="checkbox" className="h-5 w-5 accent-cocoa" checked={values.notifications} onChange={(e) => setValues({ ...values, notifications: e.target.checked })} />
          <label htmlFor="notif" className="font-semibold">Kirim notifikasi status pesanan</label>
        </div>
        <Alert message={save.error} />
        <button className="btn" type="submit" disabled={save.pending}>{save.pending ? 'Menyimpan…' : 'Simpan pengaturan'}</button>
        {save.done && <p role="status" className="font-semibold">Pengaturan disimpan.</p>}
      </form>
    </>
  );
}
