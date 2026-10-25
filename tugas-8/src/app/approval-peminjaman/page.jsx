"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './approval-peminjaman.css';

export default function ApprovalPeminjaman() {
  const router = useRouter();
  
  // State untuk melacak tab aktif
  const [activeTab, setActiveTab] = useState('menunggu');
  const [toastMessage, setToastMessage] = useState('');

  // Data Dummy Approval
  const initialData = [
    { id: 1, status: 'menunggu', initials: 'AP', name: 'Andi Pratama', time: 'Diajukan hari ini, 08.45', item: 'Tenda Pleton • 1 unit', date: '10–12 Oktober 2026', desc: 'Acara syukuran keluarga' },
    { id: 2, status: 'menunggu', initials: 'LN', name: 'Lina Nurhayati', time: 'Diajukan hari ini, 08.45', item: 'Kursi Lipat • 20 unit', date: '15–16 Oktober 2026', desc: 'Pertemuan PKK RT 01' },
    { id: 3, status: 'diterima', initials: 'WW', name: 'Wawan Wihayu', time: 'Diajukan kemarin, 09.10', item: 'Sound System • 1 set', date: '10–12 Oktober 2026', desc: 'Pentas seni warga RT 01' },
    { id: 4, status: 'diterima', initials: 'WR', name: 'Winona Ryder', time: 'Diajukan kemarin, 11.20', item: 'Tenda • 1 unit', date: '11–12 Oktober 2026', desc: 'Acara ulang tahun anak' },
    { id: 5, status: 'diterima', initials: 'BS', name: 'Budi Santoso', time: 'Diajukan 3 Okt 2026', item: 'Proyektor & Layar • 1 set', date: '14 Oktober 2026', desc: 'Rapat pleno bulanan warga' },
    { id: 6, status: 'diterima', initials: 'SR', name: 'Siti Rahma', time: 'Diajukan 2 Okt 2026', item: 'Meja Serbaguna • 5 unit', date: '18–19 Oktober 2026', desc: 'Bazar UMKM warga' },
    { id: 7, status: 'ditolak', initials: 'FA', name: 'Fajar Aditya', time: 'Diajukan 2 Okt 2026', item: 'Tenda • 1 unit', date: '10–12 Oktober 2026', desc: 'Kegiatan luar kota (tidak diizinkan)' },
  ];

  const [dataList, setDataList] = useState(initialData);

  // Menghitung jumlah per status
  const countMenunggu = dataList.filter(d => d.status === 'menunggu').length;
  const countDiterima = dataList.filter(d => d.status === 'diterima').length;
  const countDitolak = dataList.filter(d => d.status === 'ditolak').length;

  // Filter data berdasarkan tab aktif
  const filteredData = dataList.filter(d => d.status === activeTab);

  // Fungsi untuk update status (Terima/Tolak)
  const handleUpdateStatus = (id, newStatus) => {
    setDataList(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    
    // Tampilkan Toast Notifikasi
    setToastMessage(newStatus === 'diterima' ? 'Permintaan disetujui!' : 'Permintaan ditolak.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Label Dinamis untuk Section Title
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
                    {/* Menggunakan class unik avatar-approval */}
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
                  <div className="info-desc">{item.desc}</div>
                </div>

                {/* TAMPILKAN TOMBOL AKSI HANYA JIKA STATUS MENUNGGU */}
                {item.status === 'menunggu' && (
                  <div className="card-actions">
                    <button className="btn-action btn-reject" onClick={() => handleUpdateStatus(item.id, 'ditolak')}>Tolak</button>
                    <button className="btn-action btn-approve" onClick={() => handleUpdateStatus(item.id, 'diterima')}>Terima</button>
                  </div>
                )}
                
              </div>
            ))}
          </div>

          {/* FOOTER NOTE (Sticky Bottom Effect) */}
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