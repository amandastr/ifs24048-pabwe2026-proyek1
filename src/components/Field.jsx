// Input berlabel dengan pesan error yang terhubung lewat aria-describedby.
export default function Field({ id, label, error, as: Tag = 'input', ...props }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <Tag
        id={id}
        className="field"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <p id={`${id}-error`} className="mt-1 font-semibold">{error}</p>}
    </div>
  );
}
