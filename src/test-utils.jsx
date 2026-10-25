import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './auth.jsx';

export const USER = { id: 1, username: 'admin', full_name: 'Admin Dolceria', email: 'admin@dolceria.id' };
export const PRODUCTS = [
  { id: 1, name: 'Croissant', category: 'Roti', description: 'Renyah', price: 22000, emoji: '🥐' },
  { id: 2, name: 'Cheesecake', category: 'Kue', description: 'Lembut', price: 38000, emoji: '🍰' },
  { id: 3, name: 'Cookies', category: 'Kue Kering', description: 'Manis', price: 15000, emoji: '🍪' },
  { id: 4, name: 'Donat', category: 'Kue Kering', description: 'Empuk', price: 12000, emoji: '🍩' },
];
export const ORDERS = [
  { id: 1, quantity: 2, status: 'Selesai', created_at: '2026-10-01', product_name: 'Croissant', price: 22000, emoji: '🥐' },
  { id: 2, quantity: 1, status: 'Diproses', created_at: '2026-10-02', product_name: 'Cheesecake', price: 38000, emoji: '🍰' },
];

export const saveLogin = () =>
  localStorage.setItem('dolceria-session', JSON.stringify({ token: 'token-uji', user: USER }));

// Mengganti fetch global. handlers: { 'GET /api/products': { status, body } | fungsi }.
export function mockApi(handlers = {}) {
  const fetchMock = vi.fn(async (url, options = {}) => {
    const key = `${options.method || 'GET'} ${String(url).split('?')[0]}`;
    const handler = handlers[key];
    if (!handler) return { ok: false, status: 404, json: async () => ({ message: 'Tidak ditemukan' }) };
    const { status = 200, body = {} } = typeof handler === 'function' ? handler(url, options) : handler;
    return { ok: status < 400, status, json: async () => body };
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

export function renderApp(ui, { route = '/', loggedIn = false } = {}) {
  if (loggedIn) saveLogin();
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
}
