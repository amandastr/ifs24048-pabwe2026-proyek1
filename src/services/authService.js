import { api } from '../api.js';

export async function loginRequest(username, password) {
  const { token, user } = await api('/auth/login', { method: 'POST', body: { username, password } });
  return { token, user };
}
