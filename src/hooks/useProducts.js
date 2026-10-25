import { useMemo } from 'react';
import useFetch from './useFetch.js';

// Data produk siap pakai: filter kategori dan batas jumlah ditangani di sini, bukan di halaman.
export default function useProducts({ category = '', limit } = {}) {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  const { data, loading, error } = useFetch(`/products${query}`);
  const products = useMemo(() => (limit ? (data || []).slice(0, limit) : data || []), [data, limit]);
  return { products, loading, error };
}
