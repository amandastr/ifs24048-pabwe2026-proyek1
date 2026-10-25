import usePageTitle from '../hooks/usePageTitle.js';

const SERVICES = [
  ['Kue custom', 'Kue ulang tahun dan pernikahan sesuai tema dan selera Anda.'],
  ['Katering camilan', 'Paket box roti dan kue untuk rapat, seminar, dan acara kantor.'],
  ['Kelas membuat roti', 'Workshop akhir pekan untuk pemula, lengkap dengan bahan.'],
  ['Antar hari yang sama', 'Pesan sebelum pukul 14.00, pesanan tiba sore ini.'],
];

export default function Services() {
  usePageTitle('Layanan');
  return (
    <>
      <h1 className="text-4xl font-bold">Layanan kami</h1>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {SERVICES.map(([title, desc]) => (
          <li key={title} className="rounded-2xl border-2 border-gold bg-white p-6">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="mt-2 text-muted">{desc}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
