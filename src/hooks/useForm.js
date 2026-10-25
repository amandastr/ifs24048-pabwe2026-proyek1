import { useCallback, useState } from 'react';

// State form bersama: nilai, error per kolom, dan validasi saat submit.
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((event) => {
    const { id, value } = event.target;
    setValues((current) => ({ ...current, [id]: value }));
  }, []);

  const isValid = () => {
    const found = validate(values);
    setErrors(found);
    return Object.keys(found).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, isValid, reset };
}
