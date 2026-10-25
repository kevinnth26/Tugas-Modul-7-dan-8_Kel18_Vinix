"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './data-warga.css';

export default function DataWarga() {
  const router = useRouter();
  
  // State untuk pencarian
  const [searchQuery, setSearchQuery] = useState("");

  // Data Dummy Warga Lengkap
  const wargaData = [
    { id: 'andi', initials: 'AP', name: 'Andi Pratama', detail: 'Jl. Garuda VI No. 31 • 4 Anggota', phone: '0821 3184 3044' },
    { id: 'bambang', initials: 'BS', name: 'Bambang Susanto', detail: 'Jl. Garuda VII No. 12 • 3 Anggota', phone: '0812 8841 2330' },
    { id: 'dewi', initials: 'DN', name: 'Dewi Ningsih', detail: 'Jl. Merdeka VI No. 21 • 2 Anggota', phone: '0812 7712 3401' },
    { id: 'fajar', initials: 'FA', name: 'Fajar Aditya', detail: 'Jl. Garuda VI No. 16 • 2 Anggota', phone: '0813 4120 0892' },
    { id: 'siti', initials: 'SR', name: 'Siti Rahma', detail: 'Jl. Merdeka VII No. 16 • 2 Anggota', phone: '0888 0563 7589' },
    { id: 'yani', initials: 'YK', name: 'Yani Kurniawan', detail: 'Jl. Garuda VI No. 14 • 4 Anggota', phone: '0813 2245 6701' },
    { id: 'wawan', initials: 'WW', name: 'Wawan Wirhayu', detail: 'Jl. Garuda V No. 08 • 3 Anggota', phone: '0812 9987 1122' },
  ];

  // Logika Filter Data
  const filteredWarga = wargaData.filter(warga => 
    warga.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    warga.phone.includes(searchQuery) ||
    warga.detail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app" id="app">
      <main id="main">
        <section className="view-datawarga" aria-label="Data Warga">
          
          <header className="appbar">
            <button className="appbar__back" onClick={() => router.back()} aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="appbar__text">
              <h1>Data Warga</h1>
              <p>Data Warga RT 01/RW 02</p>
            </div>
          </header>

          {/* Search Bar Interactive */}
          <div className="search-container">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Cari nama, alamat, atau nomor HP..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Stats Cards */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">86</div>
              <div className="stat-label">Total warga</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">32</div>
              <div className="stat-label">Kepala keluarga</div>
            </div>
          </div>

          {/* Section Title */}
          <div className="section-header">
            <h2>Daftar warga</h2>
            <span className="sort-text">Nama A–Z ▾</span>
          </div>

          {/* List Warga Lengkap (Filtered) */}
          <div className="warga-list">
            {filteredWarga.length > 0 ? (
              filteredWarga.map(warga => (
                <Link href={`/data-keluarga/${warga.id}`} key={warga.id} className="warga-card">
                  <div className="avatar-warga">{warga.initials}</div>
                  <div className="warga-info">
                    <h3>{warga.name}</h3>
                    <p>{warga.detail}</p>
                    <span className="phone">{warga.phone}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty-search">
                Pencarian "{searchQuery}" tidak ditemukan.
              </div>
            )}
          </div>

        </section>
      </main>
    </div>
  );
}