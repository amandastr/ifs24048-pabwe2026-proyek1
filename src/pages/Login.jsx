import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import usePageTitle from '../hooks/usePageTitle.js';
import Field from '../components/Field.jsx';
import Alert from '../components/Alert.jsx';
import { validateLogin } from '../utils/validators.js';

export default function Login() {
  usePageTitle('Masuk');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [values, setValues] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const change = (e) => setValues({ ...values, [e.target.id]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setServerError('');
    const found = validateLogin(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setLoading(true);
    try {
      await login(values.username.trim(), values.password);
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-4xl font-bold">Masuk</h1>
      <form onSubmit={submit} noValidate className="mt-6 space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
        <Field id="username" label="Username" autoComplete="username" value={values.username} onChange={change} error={errors.username} />
        <Field id="password" label="Password" type="password" autoComplete="current-password" value={values.password} onChange={change} error={errors.password} />
        <Alert message={serverError} />
        <button id="btn-submit" className="btn w-full" type="submit" disabled={loading}>{loading ? 'Memproses…' : 'Masuk'}</button>
      </form>
    </div>
  );
}
