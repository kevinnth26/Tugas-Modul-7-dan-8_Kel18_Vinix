"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './dashboard.css';

export default function DashboardAdmin() {
  const router = useRouter();

  // Data Dummy Aktivitas Terbaru
  const activities = [
    { id: 1, initials: 'SR', name: 'Siti Rahma', desc: 'Membayar iuran September', time: '10 menit lalu', badge: 'Rp 150.000', badgeColor: 'green' },
    { id: 2, initials: 'AP', name: 'Andi Pratama', desc: 'Meminjam Tenda', time: '35 menit lalu', badge: 'Menunggu', badgeColor: 'yellow' },
    { id: 3, initials: 'DN', name: 'Dewi Ningsih', desc: 'Mengembalikan 10 Kursi', time: '2 jam lalu', badge: 'Selesai', badgeColor: 'green' },
  ];

  return (
    <div className="app" id="app">
      <main id="main">
        <section className="view-admin" aria-label="Dashboard Admin">
          
          <header className="appbar">
            {/* Tombol Back */}
            <button className="appbar__back" onClick={() => router.back()} aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="appbar__text">
              <h1>Dashboard Admin</h1>
              <p>Ringkasan RT 01/RW 02</p>
            </div>
          </header>

          <div className="stack">
            
            <div className="greeting">
              <div className="greeting__avatar" aria-hidden="true">B</div>
              <div>
                <p className="greeting__title" id="greeting">Selamat pagi, Pak Budi</p>
                <p className="greeting__sub">Administrator • 3 Oktober 2026</p>
              </div>
            </div>

            {/* Bagian Ringkasan (Bisa di-swipe Horizontal) */}
            <div>
              <div className="row-between">
                <h2 className="section-title">Ringkasan</h2>
                <span className="swipe-hint">Geser untuk melihat →</span>
              </div>
              
              <div className="stats">
                {/* Card 1: Saldo Kas */}
                <article className="stat">
                  <div className="stat__top">
                    <span>Saldo Kas</span>
                    <svg className="i" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  </div>
                  <p className="stat__value">Rp 5 jt</p>
                  <p className="stat__note stat__note--up">+8% bulan ini</p>
                </article>
                
                {/* Card 2: Barang Dipinjam */}
                <article className="stat">
                  <div className="stat__top">
                    <span>Barang Dipinjam</span>
                    <svg className="i" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                  </div>
                  <p className="stat__value">7</p>
                  <p className="stat__note">3 kembali pekan ini</p>
                </article>
                
                {/* Card 3: Menunggu Verifikasi */}
                <article className="stat">
                  <div className="stat__top">
                    <span>Menunggu Verifikasi</span>
                    <svg className="i-warn" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <p className="stat__value">4</p>
                  <p className="stat__note stat__note--warn">Perlu ditinjau</p>
                </article>
              </div>
            </div>

            {/* Aktivitas Terbaru */}
            <div>
              <div className="row-between">
                <h2 className="section-title">Aktivitas Terbaru</h2>
                <Link className="link-btn" href="/aktivitas-terbaru">Lihat semua</Link>
              </div>
              <ul className="activity">
                {activities.map(act => (
                  <li key={act.id}>
                    <div className="activity__ini">{act.initials}</div>
                    <div className="activity__body">
                      <p className="activity__name">{act.name}</p>
                      <p className="activity__desc">{act.desc}</p>
                      <p className="activity__time">{act.time}</p>
                    </div>
                    <span className={`act-badge act-badge--${act.badgeColor}`}>
                      {act.badge}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigasi Bawah (Admin Quick Actions) */}
            <nav className="quick" aria-label="Menu admin">
              <Link className="quick__item" href="/approval-peminjaman">
                <span className="quick__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14l2 2 4-4"/></svg>
                  <span className="quick__count">2</span>
                </span>
                <span>Approval Peminjaman</span>
              </Link>
              
              <Link className="quick__item" href="/manajemen-keuangan">
                <span className="quick__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </span>
                <span>Manajemen Keuangan</span>
              </Link>
              
              <Link className="quick__item" href="/data-warga">
                <span className="quick__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </span>
                <span>Data Warga & Keluarga</span>
              </Link>
            </nav>

          </div>
        </section>
      </main>
    </div>
  );
}