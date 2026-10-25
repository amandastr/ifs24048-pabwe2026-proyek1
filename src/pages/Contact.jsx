import useAsyncAction from '../hooks/useAsyncAction.js';
import useForm from '../hooks/useForm.js';
import usePageTitle from '../hooks/usePageTitle.js';
import Field from '../components/Field.jsx';
import Alert from '../components/Alert.jsx';
import { sendMessage } from '../services/messageService.js';
import { validateContact } from '../utils/validators.js';

export default function Contact() {
  usePageTitle('Kontak');
  const { values, errors, handleChange, isValid, reset } = useForm({ nama: '', email: '', pesan: '' }, validateContact);
  const { pending, done, error, run, resetStatus } = useAsyncAction(sendMessage);

  async function submit(event) {
    event.preventDefault();
    resetStatus();
    if (!isValid()) return;
    if (await run(values)) reset();
  }

  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h1 className="text-4xl font-bold">Hubungi kami</h1>
        <p className="mt-4 text-lg">Jl. Sisingamangaraja No. 12, Balige, Sumatera Utara</p>
        <p className="mt-2 text-lg">Telepon: 0812-0000-0000</p>
        <p className="mt-2 text-lg">Email: halo@dolceria.id</p>
      </div>
      <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl border-2 border-gold bg-white p-6">
        <Field id="nama" label="Nama" autoComplete="name" value={values.nama} onChange={handleChange} error={errors.nama} />
        <Field id="email" label="Email" type="email" autoComplete="email" value={values.email} onChange={handleChange} error={errors.email} />
        <Field id="pesan" label="Pesan" as="textarea" rows="4" value={values.pesan} onChange={handleChange} error={errors.pesan} />
        <Alert message={error} />
        <button className="btn" type="submit" disabled={pending}>{pending ? 'Mengirim…' : 'Kirim pesan'}</button>
        {done && <p role="status" className="font-semibold">Pesan terkirim. Kami membalas dalam 1 hari kerja.</p>}
      </form>
    </div>
  );
}
