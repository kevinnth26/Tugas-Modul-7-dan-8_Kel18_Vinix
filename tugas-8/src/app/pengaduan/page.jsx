"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import './pengaduan.css';

export default function Pengaduan() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  
  const [deskripsi, setDeskripsi] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deskripsi.trim()) return;
    
    setLoading(true);

    try {
      // 1. Ambil dulu ID warga yang ada di database agar tidak melanggar Foreign Key (warga_id)
      const { data: wargaData, error: wargaError } = await supabase
        .from('warga')
        .select('id')
        .limit(1);

      if (wargaError || !wargaData || wargaData.length === 0) {
        throw new Error("Tidak ada data warga di database untuk mengisi warga_id.");
      }

      const validWargaId = wargaData[0].id;

      // 2. Kirim pengaduan dengan warga_id yang valid
      const { error } = await supabase.from('pengaduan').insert([
        { 
          warga_id: validWargaId,
          deskripsi: deskripsi, 
          status: 'Menunggu',
          judul_laporan: 'Laporan Warga',
          foto_url: fileName || ''
        }
      ]);

      if (error) throw error;

      setLoading(false);
      setShowModal(true);
      setDeskripsi('');
      setFileName('');

    } catch (err) {
      setLoading(false);
      console.error('Error detail:', err);
      alert("Gagal mengirim laporan. Pastikan tabel 'warga' sudah memiliki minimal 1 data warga di Supabase.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
    router.back();
  };

  return (
    <div className="app" id="app">
      
      {/* MODAL POP-UP SUKSES */}
      <div className={`modal-overlay ${showModal ? 'active' : ''}`}>
        <div className="modal-popup-small">
          <div className="big-check-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h4>Laporan Berhasil<br/>Dikirim!</h4>
          <button type="button" className="btn-lanjut" onClick={closeModal}>Lanjut</button>
        </div>
      </div>

      <main id="main">
        <section className="view" aria-label="Pengaduan">
          
          <header className="appbar">
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
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="field">
              <label id="p-foto-label">Upload Foto</label>
              
              <input 
                type="file" 
                id="p-foto" 
                ref={fileInputRef}
                accept="image/jpeg,image/png" 
                onChange={handleFileChange}
                hidden 
              />
              
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

            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Mengirim...' : 'Kirim Laporan'}
            </button>
          </form>

        </section>
      </main>
    </div>
  );
}