import { describe, it, expect, beforeEach } from 'vitest';
import { readSession, saveSession, clearSession } from './tokenStorage.js';

const fakeToken = (expSeconds) => `header.${btoa(JSON.stringify({ exp: expSeconds }))}.signature`;
const inOneHour = () => Math.floor(Date.now() / 1000) + 3600;
const user = { id: 1, username: 'admin' };

describe('tokenStorage', () => {
  beforeEach(() => localStorage.clear());

  it('mengembalikan sesi yang masih berlaku', () => {
    const session = { token: fakeToken(inOneHour()), user };
    saveSession(session);
    expect(readSession()).toEqual(session);
  });

  it('menolak token yang sudah kedaluwarsa', () => {
    saveSession({ token: fakeToken(1), user });
    expect(readSession()).toBeNull();
  });

  it('menolak data rusak tanpa melempar error', () => {
    localStorage.setItem('dolceria-session', '{bukan json');
    expect(readSession()).toBeNull();
  });

  it('clearSession menghapus sesi', () => {
    saveSession({ token: fakeToken(inOneHour()), user });
    clearSession();
    expect(readSession()).toBeNull();
  });
});
