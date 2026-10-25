import { useState } from 'react';
import usePageTitle from '../hooks/usePageTitle.js';
import Field from '../components/Field.jsx';

export default function Settings() {
  usePageTitle('Pengaturan');
  const [saved, setSaved] = useState(false);

  return (
    <>
      <h1 className="text-4xl font-bold">Pengaturan</h1>
      <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }} className="mt-6 max-w-md space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
        <Field id="bahasa" label="Bahasa" as="select" defaultValue="id">
          <option value="id">Bahasa Indonesia</option>
          <option value="en">English</option>
        </Field>
        <div className="flex items-center gap-3">
          <input id="notif" type="checkbox" className="h-5 w-5 accent-cocoa" defaultChecked />
          <label htmlFor="notif" className="font-semibold">Kirim notifikasi status pesanan</label>
        </div>
        <button className="btn" type="submit">Simpan pengaturan</button>
        {saved && <p role="status" className="font-semibold">Pengaturan disimpan.</p>}
      </form>
    </>
  );
}
