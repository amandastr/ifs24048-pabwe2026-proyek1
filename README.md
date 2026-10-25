# Dolceria Bakery - Frontend
React + Vite + Tailwind CSS. Membutuhkan backend (repo `ifs24048-pabwe2026-proyek1-backend`).

## Jalankan lokal
Jalankan backend lebih dulu di port 3001, lalu:
```
git clone https://github.com/amandastr/ifs24048-pabwe2026-proyek1.git
cd ifs24048-pabwe2026-proyek1
npm install
npm run dev      # http://localhost:5173 (proxy /api ke localhost:3001)
```

## Build
```
npm run build    # hasil di folder dist
```
Untuk build produksi, isi `.env.production` dengan URL backend online (`VITE_API_URL`).

## Rute
Publik: `/`, `/about`, `/services`, `/portfolio`, `/contact` | Auth: `/auth/login` | Terproteksi: `/dashboard`, `/settings`, `/profile`, `/orders`
