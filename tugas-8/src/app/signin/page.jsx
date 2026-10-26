"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import Link from 'next/link';
import { supabase } from '../../lib/supabase'; // Pastikan path ini sesuai dengan struktur folder Anda
import './signin.css';

export default function SignIn() {
  const router = useRouter();

  // State untuk menangkap inputan pengguna dan status loading
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fungsi yang dijalankan saat tombol Masuk diklik
  const handleLogin = async (e) => {
    e.preventDefault(); 
    setMessage({ type: '', text: '' });
    setIsLoading(true);

    try {
      // 1. Cek kecocokan data dengan database Authentication Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) throw authError;

      // 2. Jika cocok, cek role pengguna dari tabel 'warga'
      const { data: wargaData, error: wargaError } = await supabase
        .from('warga')
        .select('role')
        .eq('email', email)
        .single();

      setMessage({ type: 'success', text: 'Login berhasil! Mengalihkan...' });

      // 3. Arahkan pengguna ke halaman yang tepat berdasarkan role
      setTimeout(() => {
        if (wargaData && wargaData.role === 'admin') {
          router.push('/dashboard-admin');
        } else {
          router.push('/dashboard');
        }
      }, 1500);

    } catch (error) {
      // Jika email tidak terdaftar atau password salah, tampilkan error
      setMessage({ type: 'error', text: 'Login gagal. Periksa kembali email dan password Anda.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          
          {/* Kotak Notifikasi Error/Sukses (Menyesuaikan dengan desain) */}
          {message.text && (
            <div style={{
              padding: "12px", marginBottom: "16px", borderRadius: "8px", fontSize: "13px",
              backgroundColor: message.type === "error" ? "#FEE2E2" : "#DCFCE7",
              color: message.type === "error" ? "#B91C1C" : "#15803D"
            }}>
              {message.text}
            </div>
          )}

          <form id="signinForm" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                {/* Atribut value dan onChange ditambahkan agar input terhubung ke State */}
                <input 
                  type="email" 
                  placeholder="Masukkan email terdaftar" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input 
                  type="password" 
                  placeholder="Masukkan password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input type="checkbox" defaultChecked />
                Ingat saya
              </label>
              <a href="#" className="forgot-link">Lupa kata sandi?</a>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading} style={{ opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? 'Memeriksa...' : 'Masuk'}
            </button>
            
            {/* Tag a diubah menjadi Link Next.js untuk navigasi optimal */}
            <p className="register-link">Belum punya akun? <Link href="/signup">Daftar di sini</Link></p>

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