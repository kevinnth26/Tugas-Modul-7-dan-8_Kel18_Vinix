"use client"; // Wajib ditambahkan agar kita bisa menggunakan fungsi interaktif/klik

import { useRouter } from 'next/navigation'; // Fitur Next.js untuk pindah halaman
import Link from 'next/link';
import './signin.css';

export default function SignIn() {
  const router = useRouter(); // Inisialisasi router

  // Fungsi yang akan dijalankan saat tombol Masuk diklik
  const handleLogin = (e) => {
    e.preventDefault(); // Mencegah halaman refresh/berkedip
    
    // Nanti, logika pengecekan database akan kita taruh di sini.
    // Untuk sekarang (UI/UX testing), kita langsung arahkan ke dashboard:
    router.push('/dashboard'); 
  };
  return (
    <>
      {/* PASTE SEMUA KODE HTML ANDA DI SINI DI DALAM FRAGMENT (<> dan </>) */}
      <div className="mobile-wrapper">
        <div className="top-section">
          <div className="logo-container">
            <div className="logo-box">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
              </svg>
            </div>
            <h1>RuangWarga</h1>
            <p>RT 01/RW 02 Kemang</p>
          </div>
        </div>

        <div className="bottom-section">
          <h2>Selamat datang kembali</h2>
          <p className="subtitle">Kelola layanan warga, iuran, dan inventaris lingkungan dalam satu ruang yang aman.</p>
          
          <form id="signinForm" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email/NIK</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <input type="text" placeholder="Masukkan email atau NIK" />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input type="password" placeholder="Masukkan password" />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" defaultChecked />
                Ingat saya
              </label>
              <a href="#" className="forgot-link">Lupa kata sandi?</a>
            </div>

            <button type="submit" className="btn-primary">Masuk</button>
            
            <p className="register-link">Belum punya akun? <a href="/signup">Daftar di sini</a></p>

            <div className="info-box">
              <span className="dot"></span>
              <p>Akses resmi untuk warga dan pengurus RT 01/RW 02.</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}