import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-cocoa text-cream">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">Dolceria Bakery</p>
          <p className="mt-2">Roti dan kue segar, dipanggang setiap pagi.</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold">Jam buka</h2>
          <p className="mt-2">Setiap hari, 07.00 – 20.00 WIB</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold">Tautan</h2>
          <ul className="mt-2 space-y-1">
            <li><Link className="underline" to="/portfolio">Katalog produk</Link></li>
            <li><Link className="underline" to="/contact">Hubungi kami</Link></li>
          </ul>
        </div>
      </div>
      <p className="border-t border-cream/30 py-4 text-center text-sm">© 2026 Dolceria Bakery. Hak cipta dilindungi.</p>
    </footer>
  );
}
