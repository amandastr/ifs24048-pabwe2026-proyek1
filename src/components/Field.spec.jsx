import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Field from './Field.jsx';

describe('Field', () => {
  it('menghubungkan label dengan input', () => {
    render(<Field id="nama" label="Nama" />);
    expect(screen.getByLabelText('Nama')).toBeTruthy();
  });
  it('menampilkan error dan menautkannya lewat aria-describedby', () => {
    render(<Field id="email" label="Email" error="Format email tidak valid." />);
    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toBe('email-error');
    expect(screen.getByText('Format email tidak valid.').id).toBe('email-error');
  });
});
