"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './detail-profil.css';

export default function DetailProfil() {
  const router = useRouter();
  
  // State untuk mengatur visibilitas password
  const [showSandiLama, setShowSandiLama] = useState(false);
  const [showSandiBaru, setShowSandiBaru] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika penyimpanan data/API akan ada di sini
    alert("Profil berhasil diperbarui!");
    router.back();
  };

  return (
    <div className="app" id="app">
      <main id="main">
        <section className="view" aria-label="Detail Profil">
          
          <header className="appbar">
            {/* Tombol Back Dinamis menggunakan router.back() */}
            <button className="appbar__back" onClick={() => router.back()} aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="appbar__text">
              <h1>Detail Profil</h1>
              <p>Perbarui identitas dan keamanan akun</p>
            </div>
          </header>

          <form className="stack" id="form-profil" onSubmit={handleSubmit} noValidate>
            
            {/* KARTU 1: Informasi Pribadi */}
            <fieldset className="card">
              <legend className="card__title">Informasi pribadi</legend>
              <p className="card__sub">Data ini digunakan untuk keperluan layanan lingkungan.</p>

              <div className="field">
                <label htmlFor="f-nama">Nama Lengkap</label>
                <div className="input-wrap">
                  <svg className="input-wrap__lead" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input id="f-nama" name="nama" type="text" autoComplete="off" defaultValue="Budi Santoso" placeholder="Masukkan nama" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="f-email">Email</label>
                <div className="input-wrap">
                  <svg className="input-wrap__lead" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input id="f-email" name="email" type="email" autoComplete="off" defaultValue="budi.santoso@surat.id" placeholder="Masukkan email" />
                </div>
              </div>
            </fieldset>

            {/* KARTU 2: Ubah Sandi */}
            <fieldset className="card">
              <legend className="card__title">Ubah Sandi</legend>
              <p className="card__sub">Gunakan sandi baru yang kuat dan mudah Anda ingat.</p>

              <div className="field">
                <label htmlFor="f-sandi-lama">Sandi Lama</label>
                <div className="input-wrap">
                  <svg className="input-wrap__lead" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input 
                    id="f-sandi-lama" 
                    name="sandiLama" 
                    type={showSandiLama ? "text" : "password"} 
                    autoComplete="current-password" 
                    placeholder="Masukkan sandi lama" 
                  />
                  {/* Tombol Interaktif Toggle Sandi */}
                  <button type="button" className="input-wrap__toggle" onClick={() => setShowSandiLama(!showSandiLama)} aria-label="Tampilkan sandi">
                    {showSandiLama ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="f-sandi-baru">Sandi Baru</label>
                <div className="input-wrap">
                  <svg className="input-wrap__lead" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <input 
                    id="f-sandi-baru" 
                    name="sandiBaru" 
                    type={showSandiBaru ? "text" : "password"} 
                    autoComplete="new-password" 
                    placeholder="Minimal 8 karakter" 
                  />
                  <button type="button" className="input-wrap__toggle" onClick={() => setShowSandiBaru(!showSandiBaru)} aria-label="Tampilkan sandi baru">
                    {showSandiBaru ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>
            </fieldset>

            <button type="submit" className="btn">Simpan Perubahan</button>
          </form>

        </section>
      </main>
    </div>
  );
}