import { useAuth } from '../auth.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import Alert from '../components/Alert.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Loading from '../components/Loading.jsx';
import { rupiah } from '../utils/format.js';

const COLUMNS = ['Tanggal', 'Produk', 'Jumlah', 'Total', 'Status'];

export default function Orders() {
  usePageTitle('Pesanan');
  const { token } = useAuth();
  const { data, loading, error } = useFetch('/orders', token);
  const orders = data || [];

  return (
    <>
      <h1 className="text-4xl font-bold">Pesanan saya</h1>
      {loading && <Loading />}
      <Alert message={error} />
      {!loading && !error && orders.length === 0 && <EmptyState message="Belum ada pesanan. Pilih roti favorit Anda di katalog." />}
      {orders.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-gold bg-white">
          <table className="w-full text-left">
            <caption className="sr-only">Daftar pesanan</caption>
            <thead className="bg-sand">
              <tr>{COLUMNS.map((c) => <th key={c} scope="col" className="p-3">{c}</th>)}</tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-gold/60">
                  <td className="p-3">{o.created_at}</td>
                  <td className="p-3">{o.product_name}</td>
                  <td className="p-3">{o.quantity}</td>
                  <td className="p-3">{rupiah(o.price * o.quantity)}</td>
                  <td className="p-3 font-semibold">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
