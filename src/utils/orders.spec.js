import { describe, it, expect } from 'vitest';
import { summarizeOrders } from './orders.js';

describe('summarizeOrders', () => {
  it('menghitung jumlah, pesanan aktif, dan total belanja', () => {
    const orders = [
      { price: 10000, quantity: 2, status: 'Selesai' },
      { price: 5000, quantity: 1, status: 'Diproses' },
    ];
    expect(summarizeOrders(orders)).toEqual({ count: 2, active: 1, total: 25000 });
  });
  it('aman untuk daftar kosong', () => {
    expect(summarizeOrders([])).toEqual({ count: 0, active: 0, total: 0 });
  });
});
