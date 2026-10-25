export function validateLogin({ username, password }) {
  const errors = {};
  if (username.trim().length < 3) errors.username = 'Username minimal 3 karakter.';
  if (password.length < 6) errors.password = 'Password minimal 6 karakter.';
  return errors;
}

export function validateContact({ nama, email, pesan }) {
  const errors = {};
  if (!nama.trim()) errors.nama = 'Nama wajib diisi.';
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Format email tidak valid.';
  if (pesan.trim().length < 10) errors.pesan = 'Pesan minimal 10 karakter.';
  return errors;
}
