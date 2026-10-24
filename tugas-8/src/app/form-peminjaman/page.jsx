"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import './form-peminjaman.css';

export default function FormPeminjaman() {
  // --- STATE MANAGEMENT ---
  // Menyimpan status apakah form sudah dikirim atau belum
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Mengambil parameter dari URL (misal: /form-peminjaman?id=1&name=Kursi%20Lipat&status=24)
  const searchParams = useSearchParams();
  const [assetData, setAssetData] = useState({
    name: 'Kursi Lipat', // Default fallback
    status: '24',        // Default fallback
    image: '/assets/images/kursilipat.png' // Default fallback
  });

  // Saat halaman dimuat, ambil data dari URL jika ada
  useEffect(() => {
    const itemName = searchParams.get('name');
    const itemStatus = searchParams.get('status');
    const itemId = searchParams.get('id');

    if (itemName) {
      // Tentukan gambar berdasarkan nama (atau ID jika ada)
      let imgPath = '/assets/images/kursilipat.png';
      if (itemName.toLowerCase().includes('meja')) imgPath = '/assets/images/mejapanjang.png';
      if (itemName.toLowerCase().includes('suara')) imgPath = '/assets/images/pengerassuara.png';

      // Ekstrak angka saja dari string "8 unit tersedia"
      const unitNumber = itemStatus ? itemStatus.split(' ')[0] : '0';

      setAssetData({
        name: itemName,
        status: unitNumber,
        image: imgPath
      });
    }
  }, [searchParams]);


  // --- EVENT HANDLERS ---
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah halaman refresh
    
    // Di sini nanti Anda bisa menambahkan logika pengiriman ke API/Database
    
    // Ubah state untuk menampilkan tiket dan menyembunyikan tombol
    setIsSubmitted(true);
  };

  return (
    <>
      <div className="mobile-wrapper">
        {/* Header */}
        <div className="header">
          <Link href="/katalog" className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div className="header-text">
            <h1>Peminjaman Aset</h1>
            <p>Lengkapi data peminjaman</p>
          </div>
        </div>
        <hr className="divider" />

        <div className="content-area">
          {/* Card Aset Dipilih (Data Dinamis) */}
          <div className="asset-card">
            <img src={assetData.image} alt={assetData.name} className="asset-img" />
            <div className="asset-info">
              <span className="asset-label">Aset dipilih</span>
              <h2>{assetData.name}</h2>
              <span className="badge text-green">Tersedia • {assetData.status} unit</span>
            </div>
          </div>

          {/* Form Inputs */}
          <form id="formPeminjaman" onSubmit={handleSubmit}>
            <div className="date-row">
              <div className="form-group">
                <label>Tanggal Pinjam</label>
                <div className="input-icon-wrapper">
                  {/* Icon SVG dipertahankan untuk styling, tapi input type diubah ke 'date' */}
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <input type="date" id="tglPinjam" required style={{ paddingLeft: '40px', width: '100%', boxSizing: 'border-box' }}/>
                </div>
              </div>
              <div className="form-group">
                <label>Tanggal Kembali</label>
                <div className="input-icon-wrapper">
                  <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <input type="date" id="tglKembali" required style={{ paddingLeft: '40px', width: '100%', boxSizing: 'border-box' }}/>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Deskripsi Keperluan</label>
              <textarea id="deskripsi" rows="3" placeholder="Contoh: Rapat koordinasi warga di balai RT." required></textarea>
            </div>

            {/* Area Tombol Aksi - Hanya tampil jika form BELUM dikirim */}
            {!isSubmitted && (
              <div id="actionArea">
                <button type="submit" className="btn-submit">Ajukan Peminjaman</button>
                <div className="info-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  <p>Pastikan melakukan peminjaman setidaknya 2 hari sebelum barang dibutuhkan, jika kurang dari itu, pengajuan akan ditolak.</p>
                </div>
              </div>
            )}
          </form>

          {/* Status Ticket - Tampil HANYA SETELAH form dikirim */}
          {isSubmitted && (
            <>
              <div id="statusTicket" className="status-ticket">
                <div className="ticket-header">
                  <div className="clock-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 11h-4a1 1 0 0 1 0-2h3V7a1 1 0 0 1 2 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3>Menunggu Persetujuan</h3>
                    <p className="subtext">Hubungi Pengurus, jika belum dikonfirmasi dalam 1x24 jam</p>
                  </div>
                </div>
                <div className="ticket-details">
                  <div>
                    <span className="detail-label">Aset</span>
                    <p className="detail-val">{assetData.name} • (unit ditentukan form)</p>
                  </div>
                  <div className="text-right">
                    <span className="detail-label">Periode</span>
                    <p className="detail-val">(tgl ditentukan form)</p>
                  </div>
                </div>
              </div>

              {/* Footer Note Setelah Submit */}
              <div id="postSubmitNote" className="info-box" style={{ marginTop: '1rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <p>Hubungi Pengurus, jika belum dikonfirmasi dalam 1x24 jam</p>
              </div>
            </>
          )}

          <div style={{ height: '80px' }}></div>
        </div>

        {/* Bottom Nav */}
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