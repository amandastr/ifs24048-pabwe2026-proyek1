import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login.jsx';

vi.mock('../context/AuthContext.jsx', () => ({ useAuth: () => ({ login: vi.fn() }) }));

describe('Halaman Login', () => {
  it('menampilkan pesan validasi saat form kosong dikirim', () => {
    render(<MemoryRouter><Login /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Masuk' }));
    expect(screen.getByText('Username minimal 3 karakter.')).toBeTruthy();
    expect(screen.getByText('Password minimal 6 karakter.')).toBeTruthy();
  });
});
