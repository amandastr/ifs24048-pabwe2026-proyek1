import { describe, it, expect } from 'vitest';
import { validateLogin, validateContact } from './validators.js';

describe('validateLogin', () => {
  it('menolak username dan password yang terlalu pendek', () => {
    expect(validateLogin({ username: 'ab', password: '123' })).toEqual({
      username: 'Username minimal 3 karakter.',
      password: 'Password minimal 6 karakter.',
    });
  });
  it('menerima input yang valid', () => {
    expect(validateLogin({ username: 'admin', password: 'password123' })).toEqual({});
  });
});

describe('validateContact', () => {
  it('menandai semua kolom yang tidak valid', () => {
    expect(Object.keys(validateContact({ nama: ' ', email: 'salah', pesan: 'pendek' }))).toEqual(['nama', 'email', 'pesan']);
  });
  it('menerima input yang valid', () => {
    expect(validateContact({ nama: 'Budi', email: 'budi@mail.com', pesan: 'Saya ingin memesan kue.' })).toEqual({});
  });
});
