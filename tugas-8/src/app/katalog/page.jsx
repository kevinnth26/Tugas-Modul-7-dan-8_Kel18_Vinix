"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import './katalog.css';

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Katalog() {
  const [activeTab, setActiveTab] = useState('semua');
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Ambil data inventaris dari Supabase saat halaman dimuat
  useEffect(() => {
    fetchInventaris();
  }, []);

  const fetchInventaris = async () => {
    const { data, error } = await supabase
      .from('inventaris')
      .select('*');

    if (error) {
      console.error('Gagal mengambil data inventaris:', error.message);
    } else if (data) {
      // Format data dari Supabase agar sesuai dengan struktur tampilan katalog
      const formattedItems = data.map((item) => {
       // Tentukan apakah barang tersedia berdasarkan stok_tersedia dari Supabase
const stok = item.stok_tersedia !== undefined ? item.stok_tersedia : item.total_stok;
const isAvailable = stok > 0;
        
        // Pemetaan gambar berdasarkan nama barang atau default
        let imagePath = '/kursilipat.png';
        const namaLower = item.nama_barang ? item.nama_barang.toLowerCase().trim() : '';
        
        if (namaLower.includes('meja')) {
          imagePath = '/mejapanjang.png';
        } else if (namaLower.includes('suara') || namaLower.includes('sound') || namaLower.includes('speaker')) {
          imagePath = '/pengerassuara.png';
        } else if (namaLower.includes('tenda') || namaLower.includes('dome')) {
          imagePath = '/tenda.png';
        }
        return {
          id: item.id,
          name: item.nama_barang || 'Aset Warga',
          image: imagePath,
          status: isAvailable ? `${stok} unit tersedia` : 'Sedang dipinjam',
          isAvailable: isAvailable
        };
      });
      setItems(formattedItems);
    }
  };

  // Logika Filter & Pencarian
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'tersedia') return matchesSearch && item.isAvailable === true;
    if (activeTab === 'dipinjam') return matchesSearch && item.isAvailable === false;
    return matchesSearch;
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
            <input 
              type="text" 
              className="search-input" 
              placeholder="Cari aset warga..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* TAB FILTER DINAMIS */}
          <div className="tabs">
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

          {/* GRID KATALOG */}
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