"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './profil.css';

export default function Profil() {
  const router = useRouter();

  const handleSignOut = () => {
    // Logika hapus sesi/token akan ada di sini nanti
    // Setelah sign out, arahkan pengguna kembali ke halaman Sign In
    router.push('/signin');
  };

  return (
    <div className="app" id="app">
      <main id="main">
        <section className="view-profil" aria-label="Profil Saya">
          
          {/* Bagian Atas: Profil Hero */}
          <header className="hero">
            <h1 className="hero__title">Profil Saya</h1>
            <div className="avatar-profil" aria-hidden="true">B</div>
            <p className="hero__name">Budi Santoso</p>
            <span className="badge-verified">
              {/* Icon Shield Verified */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
              Warga terverifikasi
            </span>
          </header>

          {/* Bagian Tengah: Menu Kelola Akun */}
          <div className="sheet">
            <h2 className="sheet__title">Kelola akun</h2>
            <p className="lead">Perbarui data pribadi dan akses layanan pengaduan warga.</p>

            <Link className="menu-card" href="/detail-profil">
              <span className="menu-card__icon">
                {/* Icon Users */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </span>
              <span className="menu-card__text">
                <strong>Detail Profil</strong>
                <small>Periksa dan ubah data diri</small>
              </span>
              <svg className="menu-card__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>

            <Link className="menu-card" href="/pengaduan">
              <span className="menu-card__icon">
                {/* Icon Pengaduan / Message */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </span>
              <span className="menu-card__text">
                <strong>Pengaduan</strong>
                <small>Kirim laporan kepada pengurus</small>
              </span>
              <svg className="menu-card__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </Link>

            {/* Tombol Sign Out (Warna Merah) */}
            <button type="button" className="menu-card menu-card--danger" onClick={handleSignOut}>
              <span className="menu-card__icon">
                {/* Icon Trash */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </span>
              <span className="menu-card__text">
                <strong>Sign Out</strong>
                <small>Keluar dari akun ini</small>
              </span>
              <svg className="menu-card__chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>

            <p className="hint">
              {/* Icon Info/Help */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>Pastikan data profil selalu terbaru agar layanan warga tetap tepat sasaran.</span>
            </p>
          </div>
        </section>
      </main>

      {/* Bagian Bawah: Navigasi Tabbar */}
      <nav className="tabbar" aria-label="Navigasi utama">
        <Link className="tabbar__item" href="/dashboard">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Beranda</span>
        </Link>
        <Link className="tabbar__item" href="/katalog">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
          <span>Katalog</span>
        </Link>
        {/* Atribut aria-current="page" digunakan untuk menandai halaman yang sedang aktif */}
        <Link className="tabbar__item" href="/profil" aria-current="page">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>Profil</span>
        </Link>
      </nav>
    </div>
  );
}