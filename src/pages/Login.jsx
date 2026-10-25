import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import useAsyncAction from '../hooks/useAsyncAction.js';
import useForm from '../hooks/useForm.js';
import usePageTitle from '../hooks/usePageTitle.js';
import Field from '../components/Field.jsx';
import Alert from '../components/Alert.jsx';
import { validateLogin } from '../utils/validators.js';

export default function Login() {
  usePageTitle('Masuk');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { values, errors, handleChange, isValid } = useForm({ username: '', password: '' }, validateLogin);
  const { pending, error, run, resetStatus } = useAsyncAction(login);

  async function submit(event) {
    event.preventDefault();
    resetStatus();
    if (!isValid()) return;
    const success = await run(values.username.trim(), values.password);
    if (success) navigate(location.state?.from || '/dashboard', { replace: true });
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="text-4xl font-bold">Masuk</h1>
      <form onSubmit={submit} noValidate className="mt-6 space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
        <Field id="username" label="Username" autoComplete="username" value={values.username} onChange={handleChange} error={errors.username} />
        <Field id="password" label="Password" type="password" autoComplete="current-password" value={values.password} onChange={handleChange} error={errors.password} />
        <Alert message={error} />
        <button id="btn-submit" className="btn w-full" type="submit" disabled={pending}>{pending ? 'Memproses…' : 'Masuk'}</button>
      </form>
    </div>
  );
}
