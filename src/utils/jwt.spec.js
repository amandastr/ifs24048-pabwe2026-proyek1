import { describe, it, expect } from 'vitest';
import { getTokenExpiry, isTokenExpired } from './jwt.js';

export const fakeToken = (expSeconds) => `h.${btoa(JSON.stringify({ exp: expSeconds }))}.s`;

describe('jwt', () => {
  it('membaca waktu kedaluwarsa dari payload', () => {
    expect(getTokenExpiry(fakeToken(2000))).toBe(2000000);
  });
  it('mendeteksi token yang sudah kedaluwarsa', () => {
    expect(isTokenExpired(fakeToken(1000), 2000000)).toBe(true);
    expect(isTokenExpired(fakeToken(3000), 2000000)).toBe(false);
  });
  it('menganggap token rusak sebagai kedaluwarsa', () => {
    expect(isTokenExpired('bukan-token')).toBe(true);
  });
});
