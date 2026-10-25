import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import Alert from './Alert.jsx';
import AsyncStateLike from './EmptyState.jsx';
import Loading from './Loading.jsx';
import Field from './Field.jsx';
import ProductCard from './ProductCard.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import { renderApp, PRODUCTS } from '../test-utils.jsx';

describe('Alert, EmptyState, Loading', () => {
  it('Alert menampilkan pesan dan kosong tanpa pesan', () => {
    const { rerender, container } = render(<Alert message="Gagal" />);
    expect(screen.getByRole('alert').textContent).toBe('Gagal');
    rerender(<Alert message="" />);
    expect(container.textContent).toBe('');
  });
  it('EmptyState dan Loading menampilkan teks', () => {
    render(<><AsyncStateLike message="Kosong" /><Loading /></>);
    expect(screen.getByText('Kosong')).toBeTruthy();
    expect(screen.getByRole('status').textContent).toBe('Memuat…');
  });
});

describe('Field', () => {
  it('menghubungkan label, error, dan children', () => {
    render(
      <Field id="kat" label="Kategori" as="select" error="Wajib dipilih.">
        <option>Roti</option>
      </Field>
    );
    const select = screen.getByLabelText('Kategori');
    expect(select.getAttribute('aria-invalid')).toBe('true');
    expect(select.getAttribute('aria-describedby')).toBe('kat-error');
    expect(screen.getByText('Roti')).toBeTruthy();
  });
  it('tanpa error tidak memberi atribut error', () => {
    render(<Field id="nama" label="Nama" />);
    expect(screen.getByLabelText('Nama').getAttribute('aria-invalid')).toBeNull();
  });
});

describe('ProductCard', () => {
  it('menampilkan produk dengan heading yang bisa diganti', () => {
    render(<ProductCard product={PRODUCTS[0]} as="h2" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Croissant' })).toBeTruthy();
    expect(screen.getByRole('img', { name: 'Ilustrasi Croissant' })).toBeTruthy();
  });
  it('memakai h3 secara bawaan', () => {
    render(<ProductCard product={PRODUCTS[1]} />);
    expect(screen.getByRole('heading', { level: 3 })).toBeTruthy();
  });
});

describe('Footer', () => {
  it('menampilkan tautan', () => {
    renderApp(<Footer />);
    expect(screen.getByRole('link', { name: 'Katalog produk' })).toBeTruthy();
  });
});

describe('Navbar', () => {
  it('menampilkan menu publik dan tombol Masuk saat belum login', () => {
    renderApp(<Navbar />);
    expect(screen.getByRole('link', { name: 'Katalog' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Masuk' })).toBeTruthy();
    expect(screen.queryByRole('link', { name: 'Dashboard' })).toBeNull();
  });
  it('menampilkan menu privat dan bisa logout saat sudah login', () => {
    renderApp(<Navbar />, { loggedIn: true });
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Keluar' }));
    expect(screen.getByRole('link', { name: 'Masuk' })).toBeTruthy();
  });
  it('tombol Menu membuka dan menutup navigasi', () => {
    renderApp(<Navbar />);
    const toggle = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(toggle);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    fireEvent.click(screen.getByRole('link', { name: 'Layanan' }));
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });
});

describe('ErrorBoundary', () => {
  it('menampilkan pesan saat anak melempar error', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const Bom = () => { throw new Error('boom'); };
    render(<ErrorBoundary><Bom /></ErrorBoundary>);
    expect(screen.getByRole('heading', { name: 'Terjadi kesalahan' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Kembali ke beranda' })).toBeTruthy();
  });
  it('merender anak jika tidak ada error', () => {
    render(<ErrorBoundary><p>Aman</p></ErrorBoundary>);
    expect(screen.getByText('Aman')).toBeTruthy();
  });
});

describe('ProtectedRoute', () => {
  const tree = (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<p>Halaman rahasia</p>} />
      </Route>
      <Route path="/auth/login" element={<p>Halaman login</p>} />
    </Routes>
  );
  it('mengarahkan ke login jika belum masuk', () => {
    renderApp(tree, { route: '/dashboard' });
    expect(screen.getByText('Halaman login')).toBeTruthy();
  });
  it('menampilkan halaman jika sudah masuk', () => {
    renderApp(tree, { route: '/dashboard', loggedIn: true });
    expect(screen.getByText('Halaman rahasia')).toBeTruthy();
  });
});
