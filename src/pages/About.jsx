import usePageTitle from '../hooks/usePageTitle.js';

export default function About() {
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
