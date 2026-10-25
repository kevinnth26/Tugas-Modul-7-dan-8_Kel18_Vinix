"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './verifikasi-iuran.css';

export default function VerifikasiIuran() {
  const router = useRouter();
  
  // State Management untuk Modal
  const [activeModal, setActiveModal] = useState(null); // null, 'detail', 'success', 'reject'
  const [selectedItem, setSelectedItem] = useState(null);

  // Data Dummy Warga (bisa diganti dengan data dari API nanti)
  const iuranData = [
    { id: 'budi', name: 'Budi Santoso', nik: '3273 0012', months: '2 Bulan', amount: 'Rp 20.000', date: '22 September 2026', source: 'Tabungan BJB • 4417', billing: 'Agustus + September 2026' },
    { id: 'natasya', name: 'Natasya Cinta A.', nik: '3273 0034', months: '1 Bulan', amount: 'Rp 10.000', date: '24 September 2026', source: 'BCA • 1234', billing: 'September 2026' },
    { id: 'ali', name: 'Muhammad Ali', nik: '3273 0078', months: '1 Bulan', amount: 'Rp 10.000', date: '25 September 2026', source: 'Mandiri • 9876', billing: 'September 2026' },
    { id: 'sri', name: 'Sri Suaeni', nik: '3273 0091', months: '1 Bulan', amount: 'Rp 10.000', date: '26 September 2026', source: 'BNI • 4567', billing: 'September 2026' },
    { id: 'amadi', name: 'Amadi', nik: '3273 0104', months: '1 Bulan', amount: 'Rp 10.000', date: '27 September 2026', source: 'BRI • 1122', billing: 'September 2026' },
    { id: 'lilik', name: 'Lilik Iiati', nik: '3273 0119', months: '1 Bulan', amount: 'Rp 10.000', date: '28 September 2026', source: 'BSI • 3344', billing: 'September 2026' },
    { id: 'jackson', name: 'Jackson', nik: '3273 0127', months: '3 Bulan', amount: 'Rp 30.000', date: '29 September 2026', source: 'BCA • 5566', billing: 'Juli - September 2026' },
  ];

  // Handlers
  const openDetailModal = (item) => {
    setSelectedItem(item);
    setActiveModal('detail');
  };

  const closeAllModals = () => {
    setActiveModal(null);
    setTimeout(() => setSelectedItem(null), 300); // Bersihkan data setelah animasi tutup selesai
  };

  const handleVerifikasiSah = () => setActiveModal('success');
  const handleTolak = () => setActiveModal('reject');

  return (
    <div className="app" id="app">
      
      {/* 1. MODAL DETAIL BUKTI TRANSFER */}
      <div className={`modal-overlay ${activeModal === 'detail' ? 'active' : ''}`}>
        {selectedItem && (
          <div className="modal-card">
            <div className="modal-header-info">
              <h4>Bukti Transfer</h4>
              <p>{selectedItem.name} - {selectedItem.date}</p>
            </div>
            
            <div className="transfer-success-box">
              <div className="big-check-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <h5>Transfer Berhasil</h5>
              <h3>{selectedItem.amount}</h3>
            </div>

            <div className="modal-details-table">
              <div className="row"><span>Sumber Dana</span> <strong>{selectedItem.source}</strong></div>
              <div className="row"><span>Penerima</span> <strong>Kas RT 01 / RW 02</strong></div>
              <div className="row"><span>Keterangan</span> <strong>Iuran {selectedItem.months}</strong></div>
              <div className="row"><span>Nama</span> <strong>{selectedItem.name}</strong></div>
              <div className="row"><span>Bulan Tagihan</span> <strong>{selectedItem.billing}</strong></div>
            </div>

            <div className="modal-action-buttons">
              <button className="btn-tolak" onClick={handleTolak}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Tolak
              </button>
              <button className="btn-sah" onClick={handleVerifikasiSah}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Verifikasi Sah
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. MODAL SUKSES (VERIFIKASI SAH) */}
      <div className={`modal-overlay ${activeModal === 'success' ? 'active' : ''}`}>
        <div className="modal-popup-small">
          <div className="big-check-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h4>Kas berhasil ditambahkan</h4>
          <div className="success-info-box">
            <div className="row"><span>ID Transaksi</span> <strong>TRX-2609-0041</strong></div>
            <div className="row"><span>Di Catat Oleh</span> <strong>Budi (Admin)</strong></div>
            <div className="row"><span>Waktu</span> <strong>{new Date().toLocaleString('id-ID', {day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'})}</strong></div>
          </div>
          <button className="btn-lanjut" onClick={closeAllModals}>Lanjut</button>
        </div>
      </div>

      {/* 3. MODAL GAGAL (DITOLAK) */}
      <div className={`modal-overlay ${activeModal === 'reject' ? 'active' : ''}`}>
        <div className="modal-popup-small">
          <div className="big-check-icon red-bg">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
          <h4>Iuran Tidak Sah<br/>Berhasil Ditolak</h4>
          <button className="btn-lanjut" onClick={closeAllModals}>Lanjut</button>
        </div>
      </div>

      {/* =========================================================
          KONTEN HALAMAN UTAMA
          ========================================================= */}
      <main id="main">
        <section className="view-verifikasi" aria-label="Verifikasi Iuran Warga">
          
          <header className="appbar">
            <button className="appbar__back" onClick={() => router.back()} aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="appbar__text">
              <h1>Verifikasi Iuran Warga</h1>
            </div>
          </header>

          {/* Filter Section */}
          <div className="filter-section">
            <h2>Iuran Warga</h2>
            <div className="dropdown-filter">
              <span>Menunggu</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>

          {/* List Iuran Warga */}
          <div className="iuran-list">
            {iuranData.map(item => (
              <div key={item.id} className="iuran-card" onClick={() => openDetailModal(item)}>
                <div className="iuran-left">
                  <div className="check-icon-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div className="iuran-detail">
                    <h3>{item.name}</h3>
                    <p>NIK {item.nik} • {item.months}</p>
                  </div>
                </div>
                <div className="iuran-right">
                  <span className="status-badge">Menunggu</span>
                  <span className="nominal">{item.amount}</span>
                </div>
              </div>
            ))}
          </div>

        </section>
      </main>
    </div>
  );
}