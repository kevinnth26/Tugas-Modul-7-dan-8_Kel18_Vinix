"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import './form-peminjaman.css';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function FormPeminjamanContent() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const searchParams = useSearchParams();

  const [assetData, setAssetData] = useState({
    id: '',
    name: 'Kursi Lipat',
    status: '24',
    image: '/kursilipat.png'
  });

  const [formData, setFormData] = useState({
    tanggal_pinjam: '',
    tanggal_kembali: '',
    jumlah_pinjam: 1,
    deskripsi: ''
  });

  useEffect(() => {
    const itemName = searchParams.get('name');
    const itemStatus = searchParams.get('status');
    const itemId = searchParams.get('id');

    if (itemName) {
      const nameLower = itemName.toLowerCase();
      let imgPath = '/kursilipat.png';
      
      if (nameLower.includes('meja')) {
        imgPath = '/mejapanjang.png';
      } else if (nameLower.includes('suara') || nameLower.includes('sound') || nameLower.includes('speaker')) {
        imgPath = '/pengerassuara.png';
      } else if (nameLower.includes('tenda')) {
        imgPath = '/tenda.png';
      }

      const unitNumber = itemStatus ? itemStatus.split(' ')[0] : '0';

      setAssetData({
        id: itemId || '1',
        name: itemName,
        status: unitNumber,
        image: imgPath
      });
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToInsert = {
      warga_id: 1, 
      inventaris_id: Number(assetData.id) || 1,
      jumlah_pinjam: Number(formData.jumlah_pinjam),
      tanggal_pinjam: formData.tanggal_pinjam,
      tanggal_kembali: formData.tanggal_kembali,
      status: 'Menunggu'
    };

    const { error } = await supabase.from('peminjaman').insert([dataToInsert]);

    if (error) {
      alert('Gagal mengajukan peminjaman: ' + error.message);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="mobile-wrapper">
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
        <div className="asset-card">
          <img src={assetData.image} alt={assetData.name} className="asset-img" />
          <div className="asset-info">
            <span className="asset-label">Aset dipilih</span>
            <h2>{assetData.name}</h2>
            <span className="badge text-green">Tersedia • {assetData.status} unit</span>
          </div>
        </div>

        {!isSubmitted ? (
          <form id="formPeminjaman" onSubmit={handleSubmit}>
            <div className="date-row">
              <div className="form-group">
                <label>Tanggal Pinjam</label>
                <div className="input-icon-wrapper">
                  <input 
                    type="date" 
                    id="tglPinjam" 
                    required 
                    value={formData.tanggal_pinjam}
                    onChange={(e) => setFormData({ ...formData, tanggal_pinjam: e.target.value })}
                    style={{ paddingLeft: '15px', width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Tanggal Kembali</label>
                <div className="input-icon-wrapper">
                  <input 
                    type="date" 
                    id="tglKembali" 
                    required 
                    value={formData.tanggal_kembali}
                    onChange={(e) => setFormData({ ...formData, tanggal_kembali: e.target.value })}
                    style={{ paddingLeft: '15px', width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Jumlah Unit Dipinjam</label>
              <input 
                type="number" 
                min="1" 
                max={assetData.status} 
                value={formData.jumlah_pinjam}
                onChange={(e) => setFormData({ ...formData, jumlah_pinjam: e.target.value })}
                className="w-full border p-2 rounded"
                required 
              />
            </div>

            <div className="form-group">
              <label>Deskripsi Keperluan</label>
              <textarea 
                id="deskripsi" 
                rows="3" 
                placeholder="Contoh: Rapat koordinasi warga di balai RT." 
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                required
              ></textarea>
            </div>

            <div id="actionArea">
              <button type="submit" className="btn-submit">Ajukan Peminjaman</button>
              <div className="info-box">
                <p>Pastikan melakukan peminjaman setidaknya 2 hari sebelum barang dibutuhkan.</p>
              </div>
            </div>
          </form>
        ) : (
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
                  <p className="subtext">Hubungi Pengurus jika belum dikonfirmasi</p>
                </div>
              </div>
              <div className="ticket-details">
                <div>
                  <span className="detail-label">Aset</span>
                  <p className="detail-val">{assetData.name} ({formData.jumlah_pinjam} unit)</p>
                </div>
                <div className="text-right">
                  <span className="detail-label">Periode</span>
                  <p className="detail-val">{formData.tanggal_pinjam} s/d {formData.tanggal_kembali}</p>
                </div>
              </div>
            </div>

            <div id="postSubmitNote" className="info-box" style={{ marginTop: '1rem' }}>
              <p>Pengajuan berhasil dikirim dan tersimpan di database!</p>
            </div>
          </>
        )}

        <div style={{ height: '80px' }}></div>
      </div>

      <div className="bottom-nav">
        <Link href="/dashboard" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>Beranda</span>
        </Link>
        
        <Link href="/katalog" className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
          <span>Katalog</span>
        </Link>
        
        <Link href="/profil" className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Profil</span>
        </Link>
      </div>
    </div>
  );
}

export default function FormPeminjaman() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '2rem' }}>Memuat halaman...</div>}>
      <FormPeminjamanContent />
    </Suspense>
  );
}