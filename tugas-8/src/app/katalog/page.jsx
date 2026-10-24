"use client"; // Wajib karena kita menggunakan interaksi klik dan state

import { useState } from 'react';
import Link from 'next/link';
import './katalog.css';

export default function Katalog() {
  // 1. STATE UNTUK TAB AKTIF
  // Secara default, tab yang aktif adalah 'semua'
  const [activeTab, setActiveTab] = useState('semua');

  // 2. DATA ASET (Sementara kita taruh di sini sebelum pakai Database)
  const items = [
    { id: 1, name: 'Kursi Lipat', image: '/assets/images/kursilipat.png', status: '24 unit tersedia', isAvailable: true },
    { id: 2, name: 'Meja Panjang', image: '/assets/images/mejapanjang.png', status: '8 unit tersedia', isAvailable: true },
    { id: 3, name: 'Pengeras Suara', image: '/assets/images/pengerassuara.png', status: '2 unit tersedia', isAvailable: true },
    { id: 4, name: 'Tenda', image: '/assets/images/tenda.png', status: 'Sedang dipinjam', isAvailable: false },
  ];

  // 3. LOGIKA FILTER
  // Ini yang menggantikan fungsi 3 file HTML Anda!
  const filteredItems = items.filter(item => {
    if (activeTab === 'tersedia') return item.isAvailable === true;
    if (activeTab === 'dipinjam') return item.isAvailable === false;
    return true; // Jika tab 'semua', tampilkan semua
  });

  return (
    <>
      <div className="mobile-wrapper">
        <div className="header">
          <Link href="/dashboard" className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div className="header-text">
            <h1>Katalog Inventaris</h1>
            <p>Aset bersama RT 01/RW 02</p>
          </div>
        </div>
        <hr className="divider" />

        <div className="content-area">
          <div className="search-container">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input type="text" className="search-input" placeholder="Cari aset warga..." />
          </div>

          {/* TAB FILTER DINAMIS */}
          <div className="tabs">
            {/* Menggunakan onClick untuk mengubah state, dan class berubah otomatis */}
            <span 
              className={`tab-pill ${activeTab === 'semua' ? 'active' : ''}`} 
              onClick={() => setActiveTab('semua')}
              style={{ cursor: 'pointer' }}
            >
              Semua
            </span>
            <span 
              className={`tab-pill ${activeTab === 'tersedia' ? 'active' : ''}`} 
              onClick={() => setActiveTab('tersedia')}
              style={{ cursor: 'pointer' }}
            >
              Tersedia
            </span>
            <span 
              className={`tab-pill ${activeTab === 'dipinjam' ? 'active' : ''}`} 
              onClick={() => setActiveTab('dipinjam')}
              style={{ cursor: 'pointer' }}
            >
              Dipinjam
            </span>
          </div>

          {/* GRID KATALOG MENGGUNAKAN LOOPING (.map) */}
          <div className="katalog-grid">
            {filteredItems.map((item) => (
              <div className="katalog-card" key={item.id}>
                <img src={item.image} alt={item.name} className="card-img" />
                <div className="card-body">
                  <h3>{item.name}</h3>
                  <span className={`status ${item.isAvailable ? 'text-green' : 'text-red'}`}>
                    {item.status}
                  </span>
                  
                  {item.isAvailable ? (
                    <Link href={`/form-peminjaman?id=${item.id}&name=${encodeURIComponent(item.name)}&status=${encodeURIComponent(item.status)}`} style={{ textDecoration: 'none' }}>
  <button className="btn-pinjam active">Pinjam</button>
</Link>
                  ) : (
                    <button className="btn-pinjam disabled" disabled>Pinjam</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p className="footer-note">Ketersediaan diperbarui oleh pengurus secara berkala.</p>
          <div style={{ height: '80px' }}></div>
        </div>

        {/* Navigasi Bawah */}
        <div className="bottom-nav">
          <Link href="/dashboard" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>Beranda</span>
          </Link>
          <Link href="/katalog" className="nav-item active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
            <span>Katalog</span>
          </Link>
          <Link href="/profil" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span>Profil</span>
          </Link>
        </div>
      </div>
    </>
  );
}