"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import './jadwal.css';

export default function JadwalKegiatan() {
  const router = useRouter();

  // States untuk Supabase
  const [jadwalList, setJadwalList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data jadwal dari Supabase
  const fetchJadwal = async () => {
    setLoading(true);
    // Ganti nama tabel di bawah jika nama tabel di Supabase Anda berbeda (misal: 'agenda' atau 'kegiatan')
    const { data, error } = await supabase.from('agenda_kegiatan').select('*').order('id', { ascending: true });
    
    if (error) {
      console.error('Gagal memuat jadwal:', error);
    } else {
      const formattedData = (data || []).map((item) => {
        // Mengantisipasi berbagai macam nama kolom agar tidak undefined
        const judul = item.nama_kegiatan || item.judul || item.kegiatan || 'Kegiatan Warga';
        const waktuKet = item.waktu || item.jam || '07.00 • Titik kumpul Pos RT';
        const tgl = item.tanggal || item.tgl || '11';
        const bln = item.bulan || item.bln || 'OKT';
        const statusVal = item.status || 'Terjadwal';

        return {
          id: item.id,
          tanggal: tgl,
          bulan: bln,
          judul: judul,
          deskripsi: waktuKet,
          status: statusVal
        };
      });
      setJadwalList(formattedData);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJadwal();
  }, []);

  return (
    <div className="app" id="app">
      <main id="main">
        {/* Menggunakan class view-jadwal yang sudah standar */}
        <section className="view-jadwal" aria-label="Jadwal Kegiatan">
          
          {/* Header Sticky (Appbar standar) */}
          <header className="appbar">
            {/* Tombol Back dinamis */}
            <button className="appbar__back" onClick={() => router.back()} aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="appbar__text">
              <h1>Jadwal Kegiatan</h1>
              <p>Jadwal aktivitas kewajiban warga</p>
            </div>
          </header>

          {/* Kalender Card (Desain Asli Tetap Aman) */}
          <div className="calendar-card">
            <div className="calendar-header">
              <svg className="nav-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
              <h3 className="month-title">October</h3>
              <svg className="nav-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </div>
            
            <div className="calendar-grid days">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div className="calendar-grid dates">
              <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
              <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span className="highlight">11</span>
              <span>12</span><span>13</span><span>14</span><span>15</span><span className="highlight">16</span><span>17</span><span>18</span>
              <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span className="highlight">25</span>
              <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span></span>
            </div>
          </div>

          {/* List Kegiatan Dinamis dari Database Supabase */}
          {loading ? (
            <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Memuat jadwal...</p>
          ) : jadwalList.length === 0 ? (
            <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Belum ada jadwal kegiatan tercatat.</p>
          ) : (
            jadwalList.map((item) => (
              <div className="list-card" key={item.id}>
                <div className="list-item">
                  <div className="date-box">
                    <span className="date-num">{item.tanggal}</span>
                    <span className="date-month">{item.bulan}</span>
                  </div>
                  <div className="item-details">
                    <h4>{item.judul}</h4>
                    <p>{item.deskripsi}</p>
                  </div>
                  <div className="badge">{item.status}</div>
                </div>
              </div>
            ))
          )}

        </section>
      </main>
    </div>
  );
}