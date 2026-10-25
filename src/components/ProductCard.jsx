import { rupiah } from '../api.js';

export default function ProductCard({ p, as: Heading = 'h3' }) {
  return (
    <article className="flex flex-col rounded-2xl border-2 border-gold bg-white p-5">
      <span role="img" aria-label={`Ilustrasi ${p.name}`} className="flex h-28 items-center justify-center rounded-xl bg-sand text-6xl">{p.emoji}</span>
      <Heading className="mt-4 text-xl font-bold">{p.name}</Heading>
      <p className="mt-1 text-muted">{p.description}</p>
      <p className="mt-auto pt-4 text-lg font-bold">{rupiah(p.price)}</p>
    </article>
  );
}