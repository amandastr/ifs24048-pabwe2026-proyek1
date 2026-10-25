import PropTypes from 'prop-types';

// Input berlabel dengan pesan error yang terhubung lewat aria-describedby.
export default function Field({ id, label, error, as: Tag = 'input', children, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <Tag
        id={id}
        className="field"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {children}
      </Tag>
      {error && <p id={`${id}-error`} className="mt-1 font-semibold">{error}</p>}
    </div>
  );
}

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  as: PropTypes.elementType,
  children: PropTypes.node,
};