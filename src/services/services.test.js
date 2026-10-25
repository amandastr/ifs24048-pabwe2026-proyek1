import { describe, it, expect } from 'vitest';
import { api, ApiError } from '../api.js';
import { loginRequest } from './authService.js';
import { readSession, saveSession, clearSession } from './tokenStorage.js';
import { mockApi, USER } from '../test-utils.jsx';

describe('tokenStorage', () => {
  it('menyimpan, membaca, dan menghapus sesi', () => {
    saveSession({ token: 't', user: USER });
    expect(readSession().token).toBe('t');
    clearSession();
    expect(readSession()).toBeNull();
  });
  it('menganggap data rusak sebagai belum login', () => {
    localStorage.setItem('dolceria-session', '{rusak');
    expect(readSession()).toBeNull();
  });
  it('menolak bentuk data yang tidak lengkap', () => {
    localStorage.setItem('dolceria-session', JSON.stringify({ token: 1 }));
    expect(readSession()).toBeNull();
  });
});

describe('api', () => {
  it('mengembalikan data saat sukses dan mengirim token', async () => {
    const fetchMock = mockApi({ 'GET /api/me': { body: USER } });
    expect(await api('/me', { token: 'abc' })).toEqual(USER);
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe('Bearer abc');
  });
  it('mengirim body JSON', async () => {
    const fetchMock = mockApi({ 'POST /api/x': { body: {} } });
    await api('/x', { method: 'POST', body: { a: 1 } });
    expect(fetchMock.mock.calls[0][1].body).toBe('{"a":1}');
  });
  it('melempar ApiError dengan status saat respons gagal', async () => {
    mockApi({ 'GET /api/me': { status: 401, body: { message: 'Ditolak' } } });
    await expect(api('/me')).rejects.toMatchObject({ name: 'ApiError', message: 'Ditolak', status: 401 });
  });
  it('memakai pesan umum jika server tidak memberi pesan', async () => {
    mockApi({ 'GET /api/me': { status: 500, body: {} } });
    await expect(api('/me')).rejects.toBeInstanceOf(ApiError);
  });
  it('memberi pesan ramah saat jaringan gagal', async () => {
    globalThis.fetch = () => Promise.reject(new TypeError('Failed to fetch'));
    await expect(api('/me')).rejects.toMatchObject({ status: 0 });
  });
  it('meneruskan AbortError', async () => {
    globalThis.fetch = () => Promise.reject(Object.assign(new Error('x'), { name: 'AbortError' }));
    await expect(api('/me')).rejects.toMatchObject({ name: 'AbortError' });
  });
});

describe('authService', () => {
  it('mengembalikan token dan user', async () => {
    mockApi({ 'POST /api/auth/login': { body: { token: 't', user: USER, extra: 1 } } });
    expect(await loginRequest('admin', 'password123')).toEqual({ token: 't', user: USER });
  });
});
