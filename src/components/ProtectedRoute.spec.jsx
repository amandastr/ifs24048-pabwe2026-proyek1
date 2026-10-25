import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';

const auth = vi.hoisted(() => ({ token: null }));
vi.mock('../context/AuthContext.jsx', () => ({ useAuth: () => auth }));

const tokenWithExp = (exp) => `h.${btoa(JSON.stringify({ exp }))}.s`;

function renderRoute() {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<p>Halaman rahasia</p>} />
        </Route>
        <Route path="/auth/login" element={<p>Halaman login</p>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  it('mengarahkan ke login jika belum masuk', () => {
    auth.token = null;
    renderRoute();
    expect(screen.getByText('Halaman login')).toBeTruthy();
  });
  it('mengarahkan ke login jika token kedaluwarsa', () => {
    auth.token = tokenWithExp(1);
    renderRoute();
    expect(screen.getByText('Halaman login')).toBeTruthy();
  });
  it('menampilkan halaman jika token masih berlaku', () => {
    auth.token = tokenWithExp(Math.floor(Date.now() / 1000) + 3600);
    renderRoute();
    expect(screen.getByText('Halaman rahasia')).toBeTruthy();
  });
});
