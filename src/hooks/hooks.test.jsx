import { describe, it, expect } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider } from '../auth.jsx';
import useForm from './useForm.js';
import usePageTitle from './usePageTitle.js';
import useFetch from './useFetch.js';
import useProducts from './useProducts.js';
import useOrders from './useOrders.js';
import { mockApi, PRODUCTS, ORDERS, saveLogin } from '../test-utils.jsx';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('useForm', () => {
  const validate = (v) => (v.nama ? {} : { nama: 'wajib' });
  it('memvalidasi, memperbarui nilai, dan reset', () => {
    const { result } = renderHook(() => useForm({ nama: '' }, validate));
    let valid;
    act(() => { valid = result.current.isValid(); });
    expect(valid).toBe(false);
    expect(result.current.errors.nama).toBe('wajib');
    act(() => result.current.handleChange({ target: { id: 'nama', value: 'Budi' } }));
    act(() => { valid = result.current.isValid(); });
    expect(valid).toBe(true);
    act(() => result.current.reset());
    expect(result.current.values.nama).toBe('');
  });
});

describe('usePageTitle', () => {
  it('mengatur judul dokumen', () => {
    renderHook(() => usePageTitle('Beranda'));
    expect(document.title).toBe('Beranda | Dolceria Bakery');
  });
});

describe('useFetch', () => {
  it('memuat data', async () => {
    mockApi({ 'GET /api/products': { body: PRODUCTS } });
    const { result } = renderHook(() => useFetch('/products'), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toHaveLength(4);
  });
  it('menyimpan pesan error', async () => {
    mockApi({ 'GET /api/products': { status: 500, body: { message: 'Gagal' } } });
    const { result } = renderHook(() => useFetch('/products'), { wrapper });
    await waitFor(() => expect(result.current.error).toBe('Gagal'));
  });
  it('logout otomatis saat token ditolak (401)', async () => {
    saveLogin();
    mockApi({ 'GET /api/orders': { status: 401, body: { message: 'Sesi tidak valid.' } } });
    const { result } = renderHook(() => useFetch('/orders', 'token-uji'), { wrapper });
    await waitFor(() => expect(result.current.error).toBe('Sesi tidak valid.'));
    expect(localStorage.getItem('dolceria-session')).toBeNull();
  });
});

describe('useProducts', () => {
  it('membatasi jumlah produk', async () => {
    mockApi({ 'GET /api/products': { body: PRODUCTS } });
    const { result } = renderHook(() => useProducts({ limit: 3 }), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toHaveLength(3);
  });
  it('mengirim filter kategori', async () => {
    const fetchMock = mockApi({ 'GET /api/products': { body: [PRODUCTS[0]] } });
    const { result } = renderHook(() => useProducts({ category: 'Roti' }), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(fetchMock.mock.calls[0][0]).toContain('category=Roti');
  });
});

describe('useOrders', () => {
  it('menghitung ringkasan pesanan', async () => {
    mockApi({ 'GET /api/orders': { body: ORDERS } });
    const { result } = renderHook(() => useOrders('token-uji'), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.summary).toEqual({ count: 2, active: 1, total: 82000 });
  });
});
