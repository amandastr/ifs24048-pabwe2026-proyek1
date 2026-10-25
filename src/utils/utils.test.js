import { describe, it, expect } from 'vitest';
import { validateLogin, validateContact } from './validators.js';
import { summarizeOrders } from './orders.js';
import { rupiah } from './format.js';

describe('validateLogin', () => {
  it('menolak input pendek', () => {
    expect(Object.keys(validateLogin({ username: 'ab', password: '123' }))).toEqual(['username', 'password']);
  });
  it('menerima input valid', () => {
    expect(validateLogin({ username: 'admin', password: 'password123' })).toEqual({});
  });
});

describe('validateContact', () => {
  it('menandai kolom tidak valid', () => {
    expect(Object.keys(validateContact({ nama: ' ', email: 'x', pesan: 'pendek' }))).toEqual(['nama', 'email', 'pesan']);
  });
  it('menerima input valid', () => {
    expect(validateContact({ nama: 'Budi', email: 'b@mail.com', pesan: 'Saya ingin memesan kue.' })).toEqual({});
  });
});

describe('summarizeOrders', () => {
  it('menghitung ringkasan', () => {
    const orders = [{ price: 10000, quantity: 2, status: 'Selesai' }, { price: 5000, quantity: 1, status: 'Diproses' }];
    expect(summarizeOrders(orders)).toEqual({ count: 2, active: 1, total: 25000 });
  });
  it('aman untuk daftar kosong', () => {
    expect(summarizeOrders([])).toEqual({ count: 0, active: 0, total: 0 });
  });
});

describe('rupiah', () => {
  it('memformat mata uang rupiah', () => {
    expect(rupiah(22000)).toContain('22.000');
  });
});
