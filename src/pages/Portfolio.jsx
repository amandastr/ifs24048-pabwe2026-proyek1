import { useEffect, useState } from 'react';
import { api } from '../api.js';
import ProductCard from '../components/ProductCard.jsx';
import usePageTitle from '../usePageTitle.js';

export default function Portfolio() {
  usePageTitle('Katalog Produk');
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    api(`/products${category ? `?category=${encodeURIComponent(category)}` : ''}`).then(setItems).catch((e) => setError(e.message));
  }, [category]);

  return (
    <>
      <h1 className="text-4xl font-bold">Katalog produk</h1>
      <div className="mt-6 max-w-xs">
        <label htmlFor="kategori" className="label">Filter kategori</label>
        <select id="kategori" className="field" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Semua kategori</option>
          <option>Roti</option>
          <option>Kue</option>
          <option>Kue Kering</option>
        </select>
      </div>
      {error && <p role="alert" className="mt-4 font-semibold">{error}</p>}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    </>
  );
}
