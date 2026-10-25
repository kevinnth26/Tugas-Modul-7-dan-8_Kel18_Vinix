"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import '../data-keluarga.css';

export default function DataKeluargaDetail() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; 
  
  const [showToast, setShowToast] = useState(false);

  // 1. DATABASE BUATAN (Sudah dilengkapi semua warga)
  const databaseKeluarga = {
    andi: {
      inisial: 'AP',
      nama_kk: 'Andi Pratama',
      alamat: 'Jl. Garuda VI No. 31 • 4 Anggota',
      telepon: '0821 3184 3044',
      anggota: [
        { id: 1, nama: 'Andi Pratama', nik: '3578••••••••0001', status: 'Kepala keluarga', gender: 'Laki-laki' },
        { id: 2, nama: 'Sari Wulandari', nik: '3578••••••••0002', status: 'Istri', gender: 'Perempuan' },
        { id: 3, nama: 'Rizky Pratama', nik: '3578••••••••0003', status: 'Anak', gender: 'Laki-laki' },
        { id: 4, nama: 'Nadia Putri Pratama', nik: '3578••••••••0004', status: 'Anak', gender: 'Perempuan' },
      ]
    },
    bambang: {
      inisial: 'BS',
      nama_kk: 'Bambang Susanto',
      alamat: 'Jl. Garuda VII No. 12 • 3 Anggota',
      telepon: '0812 8841 2330',
      anggota: [
        { id: 1, nama: 'Bambang Susanto', nik: '3578••••••••0010', status: 'Kepala keluarga', gender: 'Laki-laki' },
        { id: 2, nama: 'Siti Aminah', nik: '3578••••••••0011', status: 'Istri', gender: 'Perempuan' },
        { id: 3, nama: 'Dimas Susanto', nik: '3578••••••••0012', status: 'Anak', gender: 'Laki-laki' },
      ]
    },
    dewi: {
      inisial: 'DN',
      nama_kk: 'Dewi Ningsih',
      alamat: 'Jl. Merdeka VI No. 21 • 2 Anggota',
      telepon: '0812 7712 3401',
      anggota: [
        { id: 1, nama: 'Dewi Ningsih', nik: '3578••••••••0020', status: 'Kepala keluarga', gender: 'Perempuan' },
        { id: 2, nama: 'Budi Santoso', nik: '3578••••••••0021', status: 'Suami', gender: 'Laki-laki' },
      ]
    },
    fajar: {
      inisial: 'FA',
      nama_kk: 'Fajar Aditya',
      alamat: 'Jl. Garuda VI No. 16 • 2 Anggota',
      telepon: '0813 4120 0892',
      anggota: [
        { id: 1, nama: 'Fajar Aditya', nik: '3578••••••••0030', status: 'Kepala keluarga', gender: 'Laki-laki' },
        { id: 2, nama: 'Rina Marlina', nik: '3578••••••••0031', status: 'Istri', gender: 'Perempuan' },
      ]
    },
    siti: {
      inisial: 'SR',
      nama_kk: 'Siti Rahma',
      alamat: 'Jl. Merdeka VII No. 16 • 2 Anggota',
      telepon: '0888 0563 7589',
      anggota: [
        { id: 1, nama: 'Siti Rahma', nik: '3578••••••••0040', status: 'Kepala keluarga', gender: 'Perempuan' },
        { id: 2, nama: 'Ahmad Fauzi', nik: '3578••••••••0041', status: 'Suami', gender: 'Laki-laki' },
      ]
    },
    yani: {
      inisial: 'YK',
      nama_kk: 'Yani Kurniawan',
      alamat: 'Jl. Garuda VI No. 14 • 4 Anggota',
      telepon: '0813 2245 6701',
      anggota: [
        { id: 1, nama: 'Yani Kurniawan', nik: '3578••••••••0050', status: 'Kepala keluarga', gender: 'Laki-laki' },
        { id: 2, nama: 'Fitri Handayani', nik: '3578••••••••0051', status: 'Istri', gender: 'Perempuan' },
        { id: 3, nama: 'Zidan Kurniawan', nik: '3578••••••••0052', status: 'Anak', gender: 'Laki-laki' },
        { id: 4, nama: 'Zahra Kurniawan', nik: '3578••••••••0053', status: 'Anak', gender: 'Perempuan' },
      ]
    },
    wawan: {
      inisial: 'WW',
      nama_kk: 'Wawan Wirhayu',
      alamat: 'Jl. Garuda V No. 08 • 3 Anggota',
      telepon: '0812 9987 1122',
      anggota: [
        { id: 1, nama: 'Wawan Wirhayu', nik: '3578••••••••0060', status: 'Kepala keluarga', gender: 'Laki-laki' },
        { id: 2, nama: 'Ratna Sari', nik: '3578••••••••0061', status: 'Istri', gender: 'Perempuan' },
        { id: 3, nama: 'Gilang Wirhayu', nik: '3578••••••••0062', status: 'Anak', gender: 'Laki-laki' },
      ]
    }
  };

  // 2. AMBIL DATA SESUAI ID DI URL
  const dataKeluarga = databaseKeluarga[id];

  const handleJadikanAdmin = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // 3. JIKA DATA TIDAK DITEMUKAN
  if (!dataKeluarga) {
    return (
      <div className="app" id="app">
        <main id="main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '24px', textAlign: 'center' }}>
          <h2 style={{ color: '#1A365D', marginBottom: '8px' }}>Data Tidak Ditemukan</h2>
          <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>Keluarga dengan ID "{id}" belum terdaftar.</p>
          <button onClick={() => router.back()} style={{ padding: '12px 24px', background: '#1A365D', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
            Kembali ke Data Warga
          </button>
        </main>
      </div>
    );
  }

  // 4. JIKA DATA DITEMUKAN
  return (
    <div className="app" id="app">
      
      <div className={`toast ${showToast ? 'show' : ''}`}>
        Berhasil memperbarui status admin!
      </div>

      <main id="main">
        <section className="view-keluarga" aria-label="Data Keluarga">
          
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

          <div className="family-profile-card">
            <div className="profile-header">
              <div className="avatar-large">{dataKeluarga.inisial}</div>
              <div className="profile-title">
                <h2>{dataKeluarga.nama_kk}</h2>
                <p>{dataKeluarga.alamat}</p>
                <span className="phone-text">{dataKeluarga.telepon}</span>
              </div>
            </div>
          </div>

          <div className="section-title">
            <h3>Anggota Keluarga</h3>
          </div>

          <div className="member-list">
            {dataKeluarga.anggota.map((member) => (
              <div key={member.id} className="member-card">
                <div className="member-row">
                  <span className="label">Nama Lengkap</span>
                  <span className="value bold">{member.nama}</span>
                </div>
                <div className="member-row">
                  <span className="label">NIK</span>
                  <span className="value nik">{member.nik}</span>
                </div>
                <div className="member-row">
                  <span className="label">Status Hubungan Dalam Keluarga</span>
                  <span className="value">{member.status}</span>
                </div>
                <div className="member-row">
                  <span className="label">Jenis Kelamin</span>
                  <span className="value">{member.gender}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="action-buttons-container">
            <button className="btn-admin" onClick={handleJadikanAdmin}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4-4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Jadikan Admin
            </button>
            <button className="btn-kk">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
              Lihat Dokumen KK
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}