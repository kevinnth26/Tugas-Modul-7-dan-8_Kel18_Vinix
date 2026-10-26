"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { supabase } from "../../lib/supabase"; // Pastikan path ini sesuai
import './signup.css';

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // State untuk menampung inputan form
  const [formData, setFormData] = useState({
    nik: "",
    nama_lengkap: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi utama saat tombol Daftar ditekan
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    // Validasi apakah password dan konfirmasi password sama
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Password dan Konfirmasi Password tidak cocok!" });
      return;
    }

    setIsLoading(true);

    try {
      // 1. Daftarkan Email dan Password ke sistem Auth Supabase
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // 2. Simpan data profil ke tabel 'warga'
      // Catatan: no_hp dan alamat diisi kosong (null) karena tidak ada di form UI saat ini
      const { error: dbError } = await supabase.from("warga").insert([
        {
          nama_lengkap: formData.nama_lengkap,
          nik: formData.nik,
          email: formData.email,
          role: "warga", 
          jumlah_anggota: 1 
        },
      ]);

      if (dbError) throw dbError;

      // 3. Pesan sukses dan alihkan ke Sign In
      setMessage({ type: "success", text: "Pendaftaran berhasil! Mengalihkan ke Login..." });
      setTimeout(() => {
        router.push("/signin");
      }, 2000);

    } catch (error) {
      setMessage({ type: "error", text: error.message || "Terjadi kesalahan saat mendaftar." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mobile-wrapper">
        <div className="header">
          <Link href="/signin" className="back-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
          <div className="header-text">
            <h1>Buat Akun Warga</h1>
            <p>Daftarkan identitas Anda dengan aman</p>
          </div>
        </div>
        
        <hr className="divider" />

        <div className="content-section">
          <h2>Daftar sebagai warga</h2>
          <p className="subtitle">Gunakan data yang sesuai dengan administrasi lingkungan agar proses verifikasi lebih cepat.</p>

          {/* Kotak Notifikasi Error/Sukses */}
          {message.text && (
            <div style={{
              padding: "12px", marginBottom: "16px", borderRadius: "8px", fontSize: "13px",
              backgroundColor: message.type === "error" ? "#FEE2E2" : "#DCFCE7",
              color: message.type === "error" ? "#B91C1C" : "#15803D"
            }}>
              {message.text}
            </div>
          )}

          <form id="signupForm" onSubmit={handleRegister}>
            <div className="input-group">
              <label>NIK</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input type="text" name="nik" placeholder="Masukkan 16 digit NIK" value={formData.nik} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Nama Lengkap</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input type="text" name="nama_lengkap" placeholder="Masukkan nama sesuai KTP" value={formData.nama_lengkap} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input type="email" name="email" placeholder="contoh@surat.id" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} required minLength="6" />
                <svg className="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            </div>

            <div className="input-group">
              <label>Konfirmasi Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input type="password" name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} required />
                <svg className="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading} style={{ opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? "Memproses..." : "Daftar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}