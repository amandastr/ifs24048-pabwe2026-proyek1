import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import { About, Services, Contact } from './pages/Static.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Login from './pages/Login.jsx';

const pick = (name) => lazy(() => import('./pages/Private.jsx').then((m) => ({ default: m[name] })));
const Dashboard = pick('Dashboard');
const Settings = pick('Settings');
const Profile = pick('Profile');
const Orders = pick('Orders');

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <>
      <a href="#konten" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-gold focus:px-4 focus:py-2 focus:text-cocoa">
        Lewati ke konten utama
      </a>
      <Navbar />
      <main id="konten" className="mx-auto min-h-[70vh] max-w-6xl px-4 py-10">
        <Suspense fallback={<p role="status">Memuat…</p>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}