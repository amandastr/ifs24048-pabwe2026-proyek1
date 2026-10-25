import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useForm from './useForm.js';

const validate = (v) => (v.nama ? {} : { nama: 'wajib' });

describe('useForm', () => {
  it('memperbarui nilai dan memvalidasi saat submit', () => {
    const { result } = renderHook(() => useForm({ nama: '' }, validate));
    let valid;
    act(() => { valid = result.current.isValid(); });
    expect(valid).toBe(false);
    expect(result.current.errors.nama).toBe('wajib');

    act(() => result.current.handleChange({ target: { id: 'nama', value: 'Budi' } }));
    act(() => { valid = result.current.isValid(); });
    expect(valid).toBe(true);
    expect(result.current.errors).toEqual({});
  });
  it('reset mengembalikan nilai awal', () => {
    const { result } = renderHook(() => useForm({ nama: '' }, validate));
    act(() => result.current.handleChange({ target: { id: 'nama', value: 'Budi' } }));
    act(() => result.current.reset());
    expect(result.current.values.nama).toBe('');
  });
});
