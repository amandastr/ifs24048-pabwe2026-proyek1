import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const publicLinks = [['/', 'Beranda'], ['/about', 'Tentang Kami'], ['/services', 'Layanan'], ['/portfolio', 'Katalog'], ['/contact', 'Kontak']];
const privateLinks = [['/dashboard', 'Dashboard'], ['/orders', 'Pesanan'], ['/profile', 'Profil'], ['/settings', 'Pengaturan']];

export default function Navbar() {
  const { token, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const links = token ? [...publicLinks, ...privateLinks] : publicLinks;
  const cls = ({ isActive }) =>
    `block rounded-full px-3 py-2 text-sm font-semibold ${isActive ? 'bg-gold text-cocoa' : 'text-cocoa hover:bg-sand'}`;

  return (
    <header className="relative border-b-2 border-gold bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="font-display text-2xl font-bold text-cocoa">Dolceria Bakery</Link>
        <button className="btn-outline !px-4 !py-2 xl:hidden" aria-expanded={open} aria-controls="menu-utama" onClick={() => setOpen(!open)}>
          Menu
        </button>
        <nav id="menu-utama" aria-label="Navigasi utama" className={`${open ? 'block' : 'hidden'} absolute left-0 right-0 top-full z-40 border-b-2 border-gold bg-cream p-4 xl:static xl:block xl:border-0 xl:p-0`}>
          <ul className="flex flex-col gap-1 xl:flex-row xl:items-center">
            {links.map(([to, label]) => (
              <li key={to}><NavLink to={to} end className={cls} onClick={() => setOpen(false)}>{label}</NavLink></li>
            ))}
            <li>
              {token ? (
                <button className="btn-outline !px-4 !py-2 text-sm" onClick={() => { logout(); setOpen(false); navigate('/'); }}>Keluar</button>
              ) : (
                <Link to="/auth/login" className="btn !px-4 !py-2 text-sm" onClick={() => setOpen(false)}>Masuk</Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
