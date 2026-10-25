import PropTypes from 'prop-types';
import { rupiah } from '../utils/format.js';

export default function ProductCard({ product, as: Heading = 'h3' }) {
  return (
    <article className="flex flex-col rounded-2xl border-2 border-gold bg-white p-5">
      <span role="img" aria-label={`Ilustrasi ${product.name}`} className="flex h-28 items-center justify-center rounded-xl bg-sand text-6xl">{product.emoji}</span>
      <Heading className="mt-4 text-xl font-bold">{product.name}</Heading>
      <p className="mt-1 text-muted">{product.description}</p>
      <p className="mt-auto pt-4 text-lg font-bold">{rupiah(product.price)}</p>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    emoji: PropTypes.string,
  }).isRequired,
  as: PropTypes.elementType,
};
