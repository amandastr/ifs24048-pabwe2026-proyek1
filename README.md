# Dolceria Bakery - Frontend
React + Vite + Tailwind CSS. Membutuhkan backend (repo `ifs24048-pabwe2026-proyek1-backend`).

## Jalankan lokal
Jalankan backend lebih dulu di port 3001, lalu:
```
git clone https://github.com/amandastr/ifs24048-pabwe2026-proyek1-frontend.git
cd ifs24048-pabwe2026-proyek1-frontend
npm install
npm run dev      # http://localhost:5173 (proxy /api ke localhost:3001)
```

## Build produksi
Isi `.env.production` dengan URL backend online, lalu `npm run build`.

## Rute
Publik: `/`, `/about`, `/services`, `/portfolio`, `/contact` | Auth: `/auth/login` | Terproteksi: `/dashboard`, `/settings`, `/profile`, `/orders`
Login uji coba: `admin` / `password123`
