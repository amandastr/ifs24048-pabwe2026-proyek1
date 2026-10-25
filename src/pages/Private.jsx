import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, rupiah } from '../api.js';
import { useAuth } from '../auth.jsx';
import usePageTitle from '../usePageTitle.js';

function useOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { api('/orders', { token }).then(setOrders).catch((e) => setError(e.message)); }, [token]);
  return { orders, error };
}

export function Dashboard() {
  usePageTitle('Dashboard');
  const { user } = useAuth();
  const { orders, error } = useOrders();
  const total = orders.reduce((s, o) => s + o.price * o.quantity, 0);
  const active = orders.filter((o) => o.status !== 'Selesai').length;
  return (
    <>
      <h1 className="text-4xl font-bold">Halo, {user?.full_name}</h1>
      {error && <p role="alert" className="mt-4 font-semibold">{error}</p>}
      <dl className="mt-8 grid gap-6 sm:grid-cols-3">
        {[['Total pesanan', orders.length], ['Pesanan aktif', active], ['Total belanja', rupiah(total)]].map(([k, v]) => (
          <div key={k} className="rounded-2xl border-2 border-gold bg-white p-6">
            <dt className="text-muted">{k}</dt>
            <dd className="mt-1 text-3xl font-bold">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8"><Link to="/orders" className="btn">Lihat semua pesanan</Link></p>
    </>
  );
}

export function Orders() {
  usePageTitle('Pesanan');
  const { orders, error } = useOrders();
  return (
    <>
      <h1 className="text-4xl font-bold">Pesanan saya</h1>
      {error && <p role="alert" className="mt-4 font-semibold">{error}</p>}
      <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-gold bg-white">
        <table className="w-full text-left">
          <caption className="sr-only">Daftar pesanan</caption>
          <thead className="bg-sand">
            <tr><th scope="col" className="p-3">Tanggal</th><th scope="col" className="p-3">Produk</th><th scope="col" className="p-3">Jumlah</th><th scope="col" className="p-3">Total</th><th scope="col" className="p-3">Status</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-gold/60">
                <td className="p-3">{o.created_at}</td><td className="p-3">{o.product_name}</td><td className="p-3">{o.quantity}</td>
                <td className="p-3">{rupiah(o.price * o.quantity)}</td><td className="p-3 font-semibold">{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function Profile() {
  usePageTitle('Profil');
  const { token } = useAuth();
  const [me, setMe] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api('/me', { token }).then(setMe).catch((e) => setError(e.message)); }, [token]);
  return (
    <>
      <h1 className="text-4xl font-bold">Profil</h1>
      {error && <p role="alert" className="mt-4 font-semibold">{error}</p>}
      {me && (
        <dl className="mt-6 max-w-md space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
          <div><dt className="text-muted">Nama lengkap</dt><dd className="text-xl font-bold">{me.full_name}</dd></div>
          <div><dt className="text-muted">Username</dt><dd className="text-xl font-bold">{me.username}</dd></div>
          <div><dt className="text-muted">Email</dt><dd className="text-xl font-bold">{me.email}</dd></div>
        </dl>
      )}
    </>
  );
}

export function Settings() {
  usePageTitle('Pengaturan');
  const [saved, setSaved] = useState(false);
  return (
    <>
      <h1 className="text-4xl font-bold">Pengaturan</h1>
      <form onSubmit={(e) => { e.preventDefault(); setSaved(true); }} className="mt-6 max-w-md space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
        <div>
          <label htmlFor="bahasa" className="label">Bahasa</label>
          <select id="bahasa" className="field"><option>Bahasa Indonesia</option><option>English</option></select>
        </div>
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
