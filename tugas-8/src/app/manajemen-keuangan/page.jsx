"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './manajemen-keuangan.css';

export default function ManajemenKeuangan() {
  const router = useRouter();
  
  // States
  const [showModal, setShowModal] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  // Data Dummy Riwayat
  const historyData = [
    { id: 1, type: 'income', title: 'Iuran Warga September', desc: 'Siti Rahma - 3 Oktober 2026', status: 'Terverifikasi', statusColor: 'text-green-bg', amount: '+Rp 150.000', amountColor: 'text-green' },
    { id: 2, type: 'expense', title: 'Perbaikan Pompa Air', desc: 'Operasional - 2 Oktober 2026', status: 'Terverifikasi', statusColor: 'text-green-bg', amount: '-Rp 650.000', amountColor: 'text-red' },
    { id: 3, type: 'expense', title: 'Tagihan Listrik Pos RT', desc: 'Listrik - 1 Oktober 2026', status: 'Menunggu', statusColor: 'text-yellow-bg', amount: '-Rp 285.000', amountColor: 'text-red' },
  ];

  // Handler Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };
  const triggerFileInput = () => fileInputRef.current.click();

  // Handler Submit
  const handleSaveExpense = (e) => {
    e.preventDefault();
    setShowModal(true); // Munculkan modal sukses
  };

  const closeModal = () => {
    setShowModal(false);
    // Disini Anda bisa menambahkan logika reset form jika diperlukan
  };

  return (
    <div className="app" id="app">
      
      {/* MODAL POP-UP (Akan muncul saat form di submit) */}
      <div className={`modal-overlay ${showModal ? 'active' : ''}`}>
        <div className="modal-popup-small">
          <div className="big-check-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h4>Pengeluaran Berhasil<br/>Ditambahkan</h4>
          <button type="button" className="btn-lanjut" onClick={closeModal}>Lanjut</button>
        </div>
      </div>

      <main id="main">
        <section className="view-keuangan" aria-label="Manajemen Keuangan">
          
          <header className="appbar">
            <button className="appbar__back" onClick={() => router.back()} aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="appbar__text">
              <h1>Manajemen Keuangan</h1>
              <p>Pemasukan dan Pengeluaran RT</p>
            </div>
          </header>

          {/* Shortcut Verifikasi Iuran Button */}
          <div className="top-action-bar">
            <Link href="/verifikasi-iuran" className="btn-verifikasi-link">
              Verifikasi Iuran
            </Link>
          </div>

          {/* Summary Cards */}
          <div className="summary-cards-container">
            <div className="summary-card card-saldo">
              <p className="card-title">Saldo Saat Ini</p>
              <h2 className="card-amount">Rp 5.000.000</h2>
              <p className="card-subtitle">+865.000 bulan ini</p>
            </div>
            <div className="summary-card card-pengeluaran">
              <p className="card-title">Pengeluaran Bulan Ini</p>
              <h2 className="card-amount">Rp 1.200.000</h2>
              <p className="card-subtitle">-140.000 hari ini</p>
            </div>
          </div>

          {/* Riwayat Kas Section */}
          <div className="section-header">
            <h2>Riwayat Kas</h2>
            <Link href="/riwayat-kas" className="see-all-link">Semua</Link>
          </div>

          <div className="history-card-container">
            {historyData.map(item => (
              <div key={item.id} className="history-item">
                <div className={`icon-box ${item.type === 'income' ? 'icon-income' : 'icon-expense'}`}>
                  {item.type === 'income' ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="17" y1="7" x2="7" y2="17"/><polyline points="17 17 7 17 7 7"/></svg>
                  )}
                </div>
                <div className="history-detail">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="history-right">
                  <span className={`status-badge ${item.statusColor}`}>{item.status}</span>
                  <span className={`amount ${item.amountColor}`}>{item.amount}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Pengeluaran Section */}
          <div className="section-header">
            <h2>Input Pengeluaran</h2>
          </div>

          <div className="form-container">
            <form onSubmit={handleSaveExpense}>
              
              <div className="form-row-group">
                <div className="form-group flex-1">
                  <label htmlFor="expenseNominal">Nominal</label>
                  <input type="text" id="expenseNominal" placeholder="Rp 0" required />
                </div>
                <div className="form-group flex-1">
                  <label htmlFor="expenseCategory">Kategori</label>
                  <select id="expenseCategory">
                    <option value="Perbaikan">Perbaikan</option>
                    <option value="Operasional">Operasional</option>
                    <option value="Listrik">Listrik & Air</option>
                    <option value="Acara">Acara RT</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="expenseDesc">Deskripsi Pengeluaran</label>
                <input type="text" id="expenseDesc" placeholder="Deskripsi" required />
              </div>

              {/* Upload Box Interactive */}
              <input type="file" ref={fileInputRef} hidden accept="image/*,.pdf" onChange={handleFileChange} />
              
              <div className="upload-box" onClick={triggerFileInput} style={{ borderColor: fileName ? '#1A365D' : '#cbd5e1' }}>
                <svg className="upload-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                <strong>{fileName ? fileName : 'Upload Bukti Transaksi'}</strong>
                <p>{fileName ? 'Klik untuk mengganti file' : 'JPG, PNG, atau PDF'}</p>
              </div>

              <button type="submit" className="btn-save">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                Simpan Pengeluaran
              </button>

            </form>
          </div>

        </section>
      </main>
    </div>
  );
}