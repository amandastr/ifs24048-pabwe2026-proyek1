import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import usePageTitle from '../usePageTitle.js';

export default function Login() {
  usePageTitle('Masuk');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-4xl font-bold">Masuk</h1>
      <p className="mt-2 text-muted">Gunakan akun uji coba: admin / password123</p>
      <form onSubmit={submit} className="mt-6 space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
        <div>
          <label htmlFor="username" className="label">Username</label>
          <input id="username" className="field" autoComplete="username" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        </div>
        <div>
          <label htmlFor="password" className="label">Password</label>
          <input id="password" type="password" className="field" autoComplete="current-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        {error && <p role="alert" className="font-semibold">{error}</p>}
        <button id="btn-submit" className="btn w-full" type="submit" disabled={loading}>{loading ? 'Memproses…' : 'Masuk'}</button>
      </form>
    </div>
  );
}
