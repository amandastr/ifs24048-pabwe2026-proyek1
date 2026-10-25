import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import ProductCard from '../components/ProductCard.jsx';
import Alert from '../components/Alert.jsx';
import Loading from '../components/Loading.jsx';

export default function Home() {
  usePageTitle('Beranda');
  const { data, loading, error } = useFetch('/products');
  const featured = (data || []).slice(0, 3);

  return (
    <>
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">Roti hangat, langsung dari oven pagi ini</h1>
          <p className="mt-4 max-w-prose text-lg text-muted">Croissant berlapis, sourdough fermentasi lambat, dan kue pesta yang dibuat dengan mentega asli. Pesan hari ini, ambil atau kami antar.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/portfolio" className="btn">Lihat katalog</Link>
            <Link to="/contact" className="btn-outline">Pesan kue custom</Link>
          </div>
        </div>
        <div role="img" aria-label="Croissant, roti, dan kue di atas meja" className="flex h-64 items-center justify-center rounded-3xl border-2 border-gold bg-sand text-7xl md:h-80 md:text-8xl">🥐🍞🍰</div>
      </section>
      <section className="mt-16" aria-labelledby="favorit">
        <h2 id="favorit" className="text-3xl font-bold">Favorit pelanggan</h2>
        {loading && <Loading />}
        <Alert message={error} />
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </section>
    </>
  );
}
