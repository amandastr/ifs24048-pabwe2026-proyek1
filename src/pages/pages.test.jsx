import { describe, it, expect } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import App from '../App.jsx';
import Home from './Home.jsx';
import Portfolio from './Portfolio.jsx';
import About from './About.jsx';
import Services from './Services.jsx';
import Contact from './Contact.jsx';
import Login from './Login.jsx';
import Settings from './Settings.jsx';
import { renderApp, mockApi, PRODUCTS, ORDERS, USER } from '../test-utils.jsx';

const productsApi = { 'GET /api/products': { body: PRODUCTS } };

describe('halaman publik', () => {
  it('Beranda menampilkan tiga produk favorit', async () => {
    mockApi(productsApi);
    renderApp(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
    expect(await screen.findByText('Cookies')).toBeTruthy();
    expect(screen.queryByText('Donat')).toBeNull();
  });
  it('Beranda menampilkan keadaan kosong dan error', async () => {
    mockApi({ 'GET /api/products': { body: [] } });
    renderApp(<Home />);
    expect(await screen.findByText('Produk belum tersedia.')).toBeTruthy();
  });
  it('Beranda menampilkan pesan error', async () => {
    mockApi({ 'GET /api/products': { status: 500, body: { message: 'Server error' } } });
    renderApp(<Home />);
    expect(await screen.findByRole('alert')).toBeTruthy();
  });
  it('Katalog memuat ulang saat kategori diganti', async () => {
    const fetchMock = mockApi(productsApi);
    renderApp(<Portfolio />);
    await screen.findByText('Donat');
    fireEvent.change(screen.getByLabelText('Filter kategori'), { target: { value: 'Roti' } });
    await waitFor(() => expect(fetchMock.mock.calls.some((c) => String(c[0]).includes('category=Roti'))).toBe(true));
  });
  it('Katalog menampilkan keadaan kosong', async () => {
    mockApi({ 'GET /api/products': { body: [] } });
    renderApp(<Portfolio />);
    expect(await screen.findByText('Tidak ada produk pada kategori ini.')).toBeTruthy();
  });
  it('Tentang dan Layanan menampilkan konten', () => {
    renderApp(<><About /><Services /></>);
    expect(screen.getByRole('heading', { name: 'Tentang Dolceria' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Kue custom' })).toBeTruthy();
  });
});

describe('Kontak', () => {
  it('menampilkan error validasi lalu pesan sukses', () => {
    renderApp(<Contact />);
    fireEvent.click(screen.getByRole('button', { name: 'Kirim pesan' }));
    expect(screen.getByText('Nama wajib diisi.')).toBeTruthy();
    fireEvent.change(screen.getByLabelText('Nama'), { target: { id: 'nama', value: 'Budi' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { id: 'email', value: 'budi@mail.com' } });
    fireEvent.change(screen.getByLabelText('Pesan'), { target: { id: 'pesan', value: 'Saya ingin pesan kue ulang tahun.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Kirim pesan' }));
    expect(screen.getByText(/Pesan terkirim/)).toBeTruthy();
  });
});

describe('Login', () => {
  const tree = (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/dashboard" element={<p>Halaman dashboard</p>} />
    </Routes>
  );
  const fill = (username, password) => {
    fireEvent.change(screen.getByLabelText('Username'), { target: { id: 'username', value: username } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { id: 'password', value: password } });
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));
  };
  it('menampilkan validasi saat form kosong', () => {
    renderApp(tree, { route: '/auth/login' });
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));
    expect(screen.getByText('Username minimal 3 karakter.')).toBeTruthy();
    expect(screen.getByText('Password minimal 6 karakter.')).toBeTruthy();
  });
  it('menampilkan pesan error dari server', async () => {
    mockApi({ 'POST /api/auth/login': { status: 401, body: { message: 'Username atau password salah.' } } });
    renderApp(tree, { route: '/auth/login' });
    fill('admin', 'salahsalah');
    expect(await screen.findByText('Username atau password salah.')).toBeTruthy();
  });
  it('berhasil masuk lalu pindah ke dashboard', async () => {
    mockApi({ 'POST /api/auth/login': { body: { token: 'tkn', user: USER } } });
    renderApp(tree, { route: '/auth/login' });
    fill('admin', 'password123');
    expect(await screen.findByText('Halaman dashboard')).toBeTruthy();
    expect(JSON.parse(localStorage.getItem('dolceria-session')).token).toBe('tkn');
  });
});

describe('Pengaturan', () => {
  it('menampilkan konfirmasi setelah disimpan', () => {
    renderApp(<Settings />, { loggedIn: true });
    fireEvent.click(screen.getByRole('button', { name: 'Simpan pengaturan' }));
    expect(screen.getByText('Pengaturan disimpan.')).toBeTruthy();
  });
});

describe('aplikasi', () => {
  const privateApi = { 'GET /api/orders': { body: ORDERS }, 'GET /api/me': { body: USER } };
  it('mengarahkan halaman terproteksi ke login jika belum masuk', async () => {
    mockApi(privateApi);
    renderApp(<App />, { route: '/dashboard' });
    expect(await screen.findByRole('heading', { name: 'Masuk' })).toBeTruthy();
  });
  it('Dashboard menampilkan ringkasan', async () => {
    mockApi(privateApi);
    renderApp(<App />, { route: '/dashboard', loggedIn: true });
    expect(await screen.findByText('Halo, Admin Dolceria')).toBeTruthy();
    expect(await screen.findByText('Total pesanan')).toBeTruthy();
  });
  it('Pesanan menampilkan tabel, dan keadaan kosong', async () => {
    mockApi(privateApi);
    renderApp(<App />, { route: '/orders', loggedIn: true });
    expect(await screen.findByText('Cheesecake')).toBeTruthy();
  });
  it('Pesanan kosong menampilkan pesan', async () => {
    mockApi({ 'GET /api/orders': { body: [] } });
    renderApp(<App />, { route: '/orders', loggedIn: true });
    expect(await screen.findByText(/Belum ada pesanan/)).toBeTruthy();
  });
  it('Profil menampilkan data akun', async () => {
    mockApi(privateApi);
    renderApp(<App />, { route: '/profile', loggedIn: true });
    expect(await screen.findByText('admin@dolceria.id')).toBeTruthy();
  });
  it('rute tidak dikenal kembali ke beranda', async () => {
    mockApi(productsApi);
    renderApp(<App />, { route: '/tidak-ada' });
    expect(await screen.findByText('Favorit pelanggan')).toBeTruthy();
  });
  it('halaman Layanan dan Kontak tersedia', () => {
    mockApi({});
    renderApp(<App />, { route: '/services' });
    expect(screen.getByRole('heading', { name: 'Layanan kami' })).toBeTruthy();
  });
});
