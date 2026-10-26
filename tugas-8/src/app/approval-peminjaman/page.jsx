"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import './approval-peminjaman.css';

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ApprovalPeminjaman() {
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('menunggu');
  const [toastMessage, setToastMessage] = useState('');
  const [dataList, setDataList] = useState([]);

  // Ambil data peminjaman dari Supabase saat halaman dibuka
  useEffect(() => {
    fetchPeminjamanData();
  }, []);

  const fetchPeminjamanData = async () => {
    // 1. Ambil data dari tabel peminjaman dan inventaris
    const [peminjamanRes, inventarisRes, wargaRes] = await Promise.all([
      supabase.from('peminjaman').select('*'),
      supabase.from('inventaris').select('*'),
      supabase.from('warga').select('*')
    ]);

    if (peminjamanRes.error) {
      console.error('Gagal mengambil data peminjaman:', peminjamanRes.error.message);
      return;
    }

    const peminjamanData = peminjamanRes.data || [];
    const inventarisData = inventarisRes.data || [];
    const wargaData = wargaRes.data || [];

    // 2. Buat kamus untuk inventaris (ID -> nama_barang)
    const inventarisMap = {};
    inventarisData.forEach(inv => {
      inventarisMap[inv.id] = inv.nama_barang;
    });

    // 3. Buat kamus untuk warga (ID -> nama_lengkap)
    const wargaMap = {};
    wargaData.forEach(w => {
      wargaMap[w.id] = w.nama_lengkap;
    });

    // 4. Format data peminjaman
    const formattedData = peminjamanData.map((item) => {
      // Ambil nama barang
      const barangId = item.inventaris_id || item.barang_id;
      const namaBarang = inventarisMap[barangId] || 'Barang Inventaris';

      // Cek berbagai kemungkinan kolom nama warga di tabel peminjaman
      // Jika tidak ada di tabel peminjaman, gunakan nama dari profil aktif (misal: Budi Santoso) atau dari relasi ID warga
      const wargaId = item.warga_id || item.user_id;
      const namaWarga = item.nama_warga || item.nama || wargaMap[wargaId] || 'Budi Santoso';

      // Buat inisial otomatis dari nama warga
      let initials = 'BS';
      if (namaWarga) {
        const words = namaWarga.trim().split(' ');
        if (words.length >= 2) {
          initials = (words[0][0] + words[1][0]).toUpperCase();
        } else if (words.length === 1 && words[0].length >= 2) {
          initials = words[0].substring(0, 2).toUpperCase();
        }
      }

      return {
        id: item.id,
        status: item.status ? item.status.toLowerCase() : 'menunggu',
        initials: initials,
        name: namaWarga,
        time: `Pinjam: ${item.tanggal_pinjam || '-'}`,
        item: `${namaBarang} • ${item.jumlah_pinjam || 1} unit`,
        date: `${item.tanggal_pinjam || ''} s/d ${item.tanggal_kembali || ''}`,
        desc: item.deskripsi || 'Tidak ada keterangan keperluan'
      };
    });

    setDataList(formattedData);
  };

  // Hitung jumlah per status
  const countMenunggu = dataList.filter(d => d.status === 'menunggu').length;
  const countDiterima = dataList.filter(d => d.status === 'diterima').length;
  const countDitolak = dataList.filter(d => d.status === 'ditolak').length;

  // Filter data berdasarkan tab aktif
  const filteredData = dataList.filter(d => d.status === activeTab);

  // Fungsi untuk update status ke Supabase (Terima/Tolak)
  const handleUpdateStatus = async (id, newStatusString, displayStatus) => {
    const { error } = await supabase
      .from('peminjaman')
      .update({ status: displayStatus }) 
      .eq('id', id);

    if (error) {
      alert('Gagal memperbarui status: ' + error.message);
      return;
    }

    setDataList(prev => prev.map(item => item.id === id ? { ...item, status: newStatusString } : item));
    
    setToastMessage(displayStatus === 'Diterima' ? 'Permintaan disetujui!' : 'Permintaan ditolak.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const getSectionTitle = () => {
    if (activeTab === 'menunggu') return 'Menunggu persetujuan';
    if (activeTab === 'diterima') return 'Persetujuan Diterima';
    if (activeTab === 'ditolak') return 'Persetujuan Ditolak';
  };

  return (
    <div className="app" id="app">
      {/* Toast Notification */}
      <div className={`toast ${toastMessage ? 'show' : ''}`}>{toastMessage}</div>

      <main id="main">
        <section className="view-approval" aria-label="Approval Peminjaman">
          
          <header className="appbar">
            <button className="appbar__back" onClick={() => router.back()} aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="appbar__text">
              <h1>Approval Peminjaman</h1>
              <p>Tinjau permintaan warga</p>
            </div>
          </header>

          {/* TABS FILTER */}
          <div className="tabs">
            <button className={`tab-pill ${activeTab === 'menunggu' ? 'active' : ''}`} onClick={() => setActiveTab('menunggu')}>
              Menunggu <span className="badge-count">{countMenunggu}</span>
            </button>
            <button className={`tab-pill ${activeTab === 'diterima' ? 'active' : ''}`} onClick={() => setActiveTab('diterima')}>
              Diterima <span className="badge-count">{countDiterima}</span>
            </button>
            <button className={`tab-pill ${activeTab === 'ditolak' ? 'active' : ''}`} onClick={() => setActiveTab('ditolak')}>
              Ditolak <span className="badge-count">{countDitolak}</span>
            </button>
          </div>

          {/* SECTION HEADER DINAMIS */}
          <div className="section-header">
            <h2>{getSectionTitle()}</h2>
            <span className={`request-tag tag-${activeTab}`}>
              {filteredData.length} permintaan
            </span>
          </div>

          {/* EMPTY STATE */}
          {filteredData.length === 0 && (
            <div className="empty-state">
              Tidak ada pengajuan peminjaman di kategori ini.
            </div>
          )}

          {/* DAFTAR KARTU */}
          <div className="card-list">
            {filteredData.map(item => (
              <div key={item.id} className="approval-card">
                
                <div className="card-head">
                  <div className="user-info">
                    <div className="avatar-approval">{item.initials}</div>
                    <div className="user-detail">
                      <h3>{item.name}</h3>
                      <p>{item.time}</p>
                    </div>
                  </div>
                  <span className={`status-badge ${item.status}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>
                
                <div className="card-body-info">
                  <div className="info-row">
                    <svg className="info-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                    <strong>{item.item}</strong>
                  </div>
                  <div className="info-row">
                    <svg className="info-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>{item.date}</span>
                  </div>
                  <div className="info-desc"><strong>Keperluan:</strong> {item.desc}</div>
                </div>

                {/* TAMPILKAN TOMBOL AKSI HANYA JIKA STATUS MENUNGGU */}
                {item.status === 'menunggu' && (
                  <div className="card-actions">
                    <button className="btn-action btn-reject" onClick={() => handleUpdateStatus(item.id, 'ditolak', 'Ditolak')}>Tolak</button>
                    <button className="btn-action btn-approve" onClick={() => handleUpdateStatus(item.id, 'diterima', 'Diterima')}>Terima</button>
                  </div>
                )}
                
              </div>
            ))}
          </div>

          {/* FOOTER NOTE */}
          <div className="footer-note">
            <svg className="info-circle-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <span>Pastikan jadwal dan ketersediaan aset sebelum menyetujui.</span>
          </div>

        </section>
      </main>
    </div>
  );
}