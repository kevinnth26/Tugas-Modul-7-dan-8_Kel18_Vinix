"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase'; // Sesuaikan path ini
import './data-warga.css';

export default function DataWarga() {
  const router = useRouter();
  
  // State untuk data dan pencarian
  const [searchQuery, setSearchQuery] = useState("");
  const [wargaData, setWargaData] = useState([]);
  
  // State untuk kartu statistik (Card Biru)
  const [totalWarga, setTotalWarga] = useState(0);
  const [totalKepalaKeluarga, setTotalKepalaKeluarga] = useState(0);
  
  // State untuk status loading
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk menarik data dari Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 1. Ambil data daftar Kepala Keluarga (Tabel warga) sekaligus hitung totalnya
        const { data: warga, count: kkCount, error: wargaError } = await supabase
          .from('warga')
          .select('*', { count: 'exact' })
          .order('nama_lengkap', { ascending: true }); // Mengurutkan dari A-Z

        if (wargaError) throw wargaError;

        // 2. Hitung total anggota keluarga (Tabel anggota_keluarga)
        // head: true artinya kita hanya butuh angkanya (count), bukan isi datanya
        const { count: anggotaCount, error: anggotaError } = await supabase
          .from('anggota_keluarga')
          .select('*', { count: 'exact', head: true });

        if (anggotaError) throw anggotaError;

        // Simpan ke dalam state
        setWargaData(warga || []);
        setTotalKepalaKeluarga(kkCount || 0);
        
        // Memasukkan hasil hitung tabel anggota_keluarga ke card kiri
        setTotalWarga(anggotaCount || 0); 
        
      } catch (error) {
        console.error('Error mengambil data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fungsi pembantu untuk membuat inisial nama (Misal: "Bambang Susanto" -> "BS")
  const getInitials = (name) => {
    if (!name) return "NN";
    const words = name.split(" ");
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  // Logika Filter Data Pencarian (Mencari berdasarkan Nama, Alamat, atau No HP)
  const filteredWarga = wargaData.filter(warga => {
    const nameMatch = warga.nama_lengkap?.toLowerCase().includes(searchQuery.toLowerCase());
    const phoneMatch = warga.no_hp?.includes(searchQuery);
    const addressMatch = warga.alamat?.toLowerCase().includes(searchQuery.toLowerCase());
    return nameMatch || phoneMatch || addressMatch;
  });

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

          {/* Stats Cards (Terhubung ke Database) */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{isLoading ? '...' : totalWarga}</div>
              <div className="stat-label">Total warga</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{isLoading ? '...' : totalKepalaKeluarga}</div>
              <div className="stat-label">Kepala keluarga</div>
            </div>
          </div>

          {/* Section Title */}
          <div className="section-header">
            <h2>Daftar warga</h2>
            <span className="sort-text">Nama A–Z ▾</span>
          </div>

          {/* List Warga (Dari Supabase) */}
          <div className="warga-list">
            {isLoading ? (
              <div className="empty-search">Memuat data dari database...</div>
            ) : filteredWarga.length > 0 ? (
              filteredWarga.map((warga, index) => (
                // Menggunakan kombinasi index jika id belum terbentuk sempurna
                <Link href={`/data-keluarga/${warga.id}`} key={warga.id || index} className="warga-card">
                  <div className="avatar-warga">{getInitials(warga.nama_lengkap)}</div>
                  <div className="warga-info">
                    <h3>{warga.nama_lengkap}</h3>
                    <p>{warga.alamat} • {warga.jumlah_anggota || 1} Anggota</p>
                    <span className="phone">{warga.no_hp}</span>
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