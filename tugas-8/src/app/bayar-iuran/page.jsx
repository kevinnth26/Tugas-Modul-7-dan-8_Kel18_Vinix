"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import './bayar-iuran.css';

export default function BayarIuran() {
  // --- STATE MANAGEMENT ---
  const [fileName, setFileName] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  // --- HANDLERS ---
  const handleCopy = () => {
    // Menyalin nomor rekening ke clipboard perangkat
    navigator.clipboard.writeText("00218834591");
    setIsCopied(true);
    // Mengembalikan teks tombol copy setelah 2 detik
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const triggerFileInput = () => {
    // Memicu klik pada input file yang disembunyikan saat area dropzone diklik
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini logika untuk mengirim data form & file bukti ke database
    setIsSubmitted(true);
  };

  return (
    <div className="app" id="app">
      <main id="main">
        <section className="view" aria-label="Bayar Iuran">
          
          <header className="appbar">
            {/* Tombol kembali diarahkan ke dashboard */}
            <Link className="appbar__back" href="/dashboard" aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
            </Link>
            <div className="appbar__text">
              <h1>Bayar Iuran</h1>
              <p>Konfirmasi Pembayaran Warga</p>
            </div>
          </header>

          <form className="stack stack--plain" id="form-iuran" onSubmit={handleSubmit} noValidate>
            
            {/* Tagihan Info */}
            <article className="bill">
              <div className="bill__top">
                <span>Tagihan Aktif</span>
                <span className="pill" id="iuran-status">
                  {isSubmitted ? 'Menunggu Verifikasi' : 'Belum Dibayar'}
                </span>
              </div>
              <p className="bill__name">Iuran RT - September 2026</p>
              <p className="bill__amount">Rp 150.000</p>
              <p className="bill__due">Batas Pembayaran 10 Oktober 2026</p>
            </article>

            {/* Info Bank & Fitur Copy */}
            <div className="bank">
              <span className="bank__logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="21" width="18" height="2"/><path d="M12 3l9 4v2H3V7l9-4z"/><path d="M6 9v8M10 9v8M14 9v8M18 9v8"/>
                </svg>
              </span>
              <div className="bank__text">
                <small>Rekening Tujuan</small>
                <strong>BJB - Haryanto Wijaya</strong>
                <span className="bank__no" id="bank-no">0021 8834 591</span>
              </div>
              <button 
                type="button" 
                className="bank__copy" 
                onClick={handleCopy} 
                aria-label="Salin nomor rekening"
                style={{ padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {isCopied ? (
                  <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 'bold' }}>Tersalin!</span>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Input Nominal */}
            <div className="field">
              <label htmlFor="i-nominal">Nominal</label>
              <input 
                id="i-nominal" 
                className="input" 
                type="text" 
                inputMode="numeric" 
                defaultValue="Rp 150.000" 
                autoComplete="off" 
                disabled={isSubmitted} // Disable jika sudah disubmit
              />
              <p className="error" id="err-nominal" role="alert"></p>
            </div>

            {/* Area Upload Bukti Transfer */}
            <div className="field">
              <label id="i-bukti-label">Bukti Pembayaran</label>
              
              {/* Input file asli (disembunyikan) */}
              <input 
                type="file" 
                id="i-bukti" 
                ref={fileInputRef}
                accept="image/jpeg,image/png,application/pdf" 
                onChange={handleFileChange}
                disabled={isSubmitted}
                hidden 
              />
              
              {/* Tombol visual yang menggantikan input file */}
              <button 
                type="button" 
                className="dropzone dropzone--lg" 
                onClick={triggerFileInput}
                disabled={isSubmitted}
                style={{ cursor: isSubmitted ? 'not-allowed' : 'pointer', borderStyle: fileName ? 'solid' : 'dashed' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <strong id="i-drop-title">
                  {fileName ? fileName : 'Upload Bukti Transfer (Max 2MB)'}
                </strong>
                <small id="i-drop-sub">
                  {fileName ? 'Klik untuk mengganti file' : 'JPG, PNG, atau PDF'}
                </small>
              </button>
              <p className="error" id="err-bukti" role="alert"></p>
            </div>

            <p className="note">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
              </svg>
              <span>Konfirmasi akan diverifikasi pengurus maksimal 1 x 24 jam</span>
            </p>

            {/* Tombol Submit dinamis */}
            <button 
              type="submit" 
              className={`btn btn--primary btn--icon ${isSubmitted ? 'btn--disabled' : ''}`} 
              disabled={isSubmitted}
              style={isSubmitted ? { backgroundColor: '#10B981', borderColor: '#10B981' } : {}}
            >
              {isSubmitted ? (
                <span>Bukti Terkirim</span>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  <span>Kirim Konfirmasi</span>
                </>
              )}
            </button>
          </form>

        </section>
      </main>
    </div>
  );
}