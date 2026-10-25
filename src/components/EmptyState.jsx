import PropTypes from 'prop-types';

export default function EmptyState({ message }) {
  return <p className="mt-6 rounded-2xl border-2 border-dashed border-gold p-6 text-lg text-muted">{message}</p>;
}

EmptyState.propTypes = { message: PropTypes.string.isRequired };
