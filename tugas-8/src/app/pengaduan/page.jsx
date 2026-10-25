"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './pengaduan.css';

export default function Pengaduan() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini logika untuk mengirim pengaduan ke database
    alert("Laporan Anda berhasil dikirim!");
    router.back(); // Kembali ke halaman sebelumnya setelah submit
  };

  return (
    <div className="app" id="app">
      <main id="main">
        <section className="view" aria-label="Pengaduan">
          
          <header className="appbar">
            {/* Tombol Back Dinamis menggunakan router.back() */}
            <button className="appbar__back" onClick={() => router.back()} aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="appbar__text">
              <h1>Pengaduan</h1>
              <p>Laporkan kejadian di lingkungan Anda</p>
            </div>
          </header>

          <form className="stack" id="form-pengaduan" onSubmit={handleSubmit} noValidate>
            <div>
              <h2 className="form-title">Buat laporan baru</h2>
              <p className="lead">Berikan informasi yang jelas agar pengurus dapat menindaklanjuti laporan dengan tepat.</p>
            </div>

            <div className="field">
              <label htmlFor="p-deskripsi">Deskripsi Kejadian</label>
              <textarea 
                id="p-deskripsi" 
                className="textarea" 
                rows="3" 
                placeholder="Jelaskan lokasi, waktu, dan kronologi kejadian..." 
                required
              ></textarea>
            </div>

            <div className="field">
              <label id="p-foto-label">Upload Foto</label>
              
              {/* Input file asli (disembunyikan) */}
              <input 
                type="file" 
                id="p-foto" 
                ref={fileInputRef}
                accept="image/jpeg,image/png" 
                onChange={handleFileChange}
                hidden 
              />
              
              {/* Tombol visual Dropzone yang interaktif */}
              <div 
                className="dropzone" 
                id="p-drop" 
                onClick={triggerFileInput}
                style={{ borderStyle: fileName ? 'solid' : 'dashed' }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <strong>
                  {fileName ? fileName : 'Pilih foto dari perangkat'}
                </strong>
                <small>
                  {fileName ? 'Klik untuk mengganti gambar' : 'JPG atau PNG, maksimal 2 MB'}
                </small>
              </div>
            </div>

            <p className="hint">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              <span>Pastikan foto tidak memuat data pribadi warga lain tanpa izin.</span>
            </p>

            <button type="submit" className="btn">Kirim Laporan</button>
          </form>

        </section>
      </main>
    </div>
  );
}