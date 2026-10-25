// Membaca waktu kedaluwarsa (ms) dari payload JWT. Hanya untuk UX; keabsahan token tetap diperiksa server.
export function getTokenExpiry(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const { exp } = JSON.parse(atob(base64));
    return typeof exp === 'number' ? exp * 1000 : 0;
  } catch {
    return 0;
  }
}

export const isTokenExpired = (token, now = Date.now()) => getTokenExpiry(token) <= now;
