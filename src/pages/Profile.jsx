import { useAuth } from '../auth.jsx';
import useFetch from '../hooks/useFetch.js';
import usePageTitle from '../hooks/usePageTitle.js';
import Alert from '../components/Alert.jsx';
import Loading from '../components/Loading.jsx';

export default function Profile() {
  usePageTitle('Profil');
  const { token } = useAuth();
  const { data: me, loading, error } = useFetch('/me', token);
  const rows = me ? [['Nama lengkap', me.full_name], ['Username', me.username], ['Email', me.email]] : [];

  return (
    <>
      <h1 className="text-4xl font-bold">Profil</h1>
      {loading && <Loading />}
      <Alert message={error} />
      {me && (
        <dl className="mt-6 max-w-md space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
          {rows.map(([label, value]) => (
            <div key={label}><dt className="text-muted">{label}</dt><dd className="text-xl font-bold">{value}</dd></div>
          ))}
        </dl>
      )}
    </>
  );
}
