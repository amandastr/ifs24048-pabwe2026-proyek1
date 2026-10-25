import { useState } from 'react';
import usePageTitle from '../usePageTitle.js';

export function About() {
  usePageTitle('Tentang Kami');
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold">Tentang Dolceria</h1>
      <p className="mt-4 text-lg leading-relaxed">Dolceria Bakery berawal dari dapur rumah kecil dengan satu oven dan resep keluarga. Kini kami memanggang puluhan jenis roti dan kue setiap hari, tetap dengan bahan sederhana: tepung pilihan, mentega asli, dan waktu fermentasi yang cukup.</p>
      <h2 className="mt-8 text-2xl font-bold">Cara kami bekerja</h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-lg">
        <li>Adonan dibuat dari nol setiap malam.</li>
        <li>Tanpa pengawet buatan.</li>
        <li>Roti keluar oven mulai pukul 07.00.</li>
      </ul>
    </div>
  );
}

export function Services() {
  usePageTitle('Layanan');
  const items = [
    ['Kue custom', 'Kue ulang tahun dan pernikahan sesuai tema dan selera Anda.'],
    ['Katering camilan', 'Paket box roti dan kue untuk rapat, seminar, dan acara kantor.'],
    ['Kelas membuat roti', 'Workshop akhir pekan untuk pemula, lengkap dengan bahan.'],
    ['Antar hari yang sama', 'Pesan sebelum pukul 14.00, pesanan tiba sore ini.'],
  ];
  return (
    <>
      <h1 className="text-4xl font-bold">Layanan kami</h1>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {items.map(([t, d]) => (
          <li key={t} className="rounded-2xl border-2 border-gold bg-white p-6">
            <h2 className="text-2xl font-bold">{t}</h2>
            <p className="mt-2 text-muted">{d}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Contact() {
  usePageTitle('Kontak');
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold">Hubungi kami</h1>
        <p className="mt-4 text-lg">Jl. Sisingamangaraja No. 12, Balige, Sumatera Utara</p>
        <p className="mt-2 text-lg">Telepon: 0812-0000-0000</p>
        <p className="mt-2 text-lg">Email: halo@dolceria.id</p>
      </div>
      <form onSubmit={submit} className="space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
        <div><label htmlFor="nama" className="label">Nama</label><input id="nama" className="field" required autoComplete="name" /></div>
        <div><label htmlFor="email" className="label">Email</label><input id="email" type="email" className="field" required autoComplete="email" /></div>
        <div><label htmlFor="pesan" className="label">Pesan</label><textarea id="pesan" rows="4" className="field" required /></div>
        <button className="btn" type="submit">Kirim pesan</button>
        {sent && <p role="status" className="font-semibold">Pesan terkirim. Kami membalas dalam 1 hari kerja.</p>}
      </form>
    </div>
  );
}
