import { Component } from 'react';
import PropTypes from 'prop-types';

// Menangkap error render agar aplikasi tidak menjadi layar kosong.
export default class ErrorBoundary extends Component {
  static propTypes = { children: PropTypes.node.isRequired };

  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Terjadi kesalahan pada tampilan:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <main className="mx-auto max-w-xl px-4 py-16">
        <h1 className="text-3xl font-bold">Terjadi kesalahan</h1>
        <p className="mt-3 text-lg">Halaman gagal ditampilkan. Muat ulang atau kembali ke beranda.</p>
        <button className="btn mt-6" onClick={() => window.location.assign('/')}>Kembali ke beranda</button>
      </main>
    );
  }
}
