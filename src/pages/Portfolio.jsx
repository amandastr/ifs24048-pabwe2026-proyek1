import { useState } from 'react';
import useProducts from '../hooks/useProducts.js';
import usePageTitle from '../hooks/usePageTitle.js';
import AsyncState from '../components/AsyncState.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Field from '../components/Field.jsx';

const CATEGORIES = ['Roti', 'Kue', 'Kue Kering'];

export default function Portfolio() {
  usePageTitle('Katalog Produk');
  const [category, setCategory] = useState('');
  const { products, loading, error } = useProducts({ category });

  return (
    <>
      <h1 className="text-4xl font-bold">Katalog produk</h1>
      <div className="mt-6 max-w-xs">
        <Field id="kategori" label="Filter kategori" as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Semua kategori</option>
          {CATEGORIES.map((name) => <option key={name}>{name}</option>)}
        </Field>
      </div>
      <AsyncState loading={loading} error={error} isEmpty={products.length === 0} emptyMessage="Tidak ada produk pada kategori ini." />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => <ProductCard key={product.id} product={product} as="h2" />)}
      </div>
    </>
  );
}
