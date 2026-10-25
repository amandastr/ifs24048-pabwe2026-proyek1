import { Link } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import useOrders from '../hooks/useOrders.js';
import usePageTitle from '../hooks/usePageTitle.js';
import Alert from '../components/Alert.jsx';
import Loading from '../components/Loading.jsx';
import { rupiah } from '../utils/format.js';

export default function Dashboard() {
  usePageTitle('Dashboard');
  const { user, token } = useAuth();
  const { summary, loading, error } = useOrders(token);
  const stats = [['Total pesanan', summary.count], ['Pesanan aktif', summary.active], ['Total belanja', rupiah(summary.total)]];

  return (
    <>
      <h1 className="text-4xl font-bold">Halo, {user?.full_name}</h1>
      {loading && <Loading />}
      <Alert message={error} />
      <dl className="mt-8 grid gap-6 sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className="rounded-2xl border-2 border-gold bg-white p-6">
            <dt className="text-muted">{label}</dt>
            <dd className="mt-1 text-3xl font-bold">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8"><Link to="/orders" className="btn">Lihat semua pesanan</Link></p>
    </>
  );
}
