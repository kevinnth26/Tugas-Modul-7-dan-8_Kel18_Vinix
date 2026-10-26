"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../../../lib/supabase'; // Sesuaikan path ini dengan folder Anda
import '../data-keluarga.css';

export default function DataKeluargaDetail() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Mendapatkan ID warga dari URL
  
  const [showToast, setShowToast] = useState(false);
  
  // State untuk menyimpan data dari Supabase
  const [dataWarga, setDataWarga] = useState(null);
  const [anggotaKeluarga, setAnggotaKeluarga] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi pembantu untuk membuat inisial nama
  const getInitials = (name) => {
    if (!name) return "NN";
    const words = name.split(" ");
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  // Mengambil data dari Supabase saat halaman dimuat
  useEffect(() => {
    const fetchDetailKeluarga = async () => {
      setIsLoading(true);
      try {
        // 1. Ambil data Kepala Keluarga dari tabel 'warga'
        const { data: wargaData, error: wargaError } = await supabase
          .from('warga')
          .select('*')
          .eq('id', id)
          .single(); // single() karena ID pasti unik/satu orang

        if (wargaError) throw wargaError;
        setDataWarga(wargaData);

        // 2. Ambil data seluruh anggota keluarga dari tabel 'anggota_keluarga'
        const { data: anggotaData, error: anggotaError } = await supabase
          .from('anggota_keluarga')
          .select('*')
          .eq('warga_id', id)
          .order('id', { ascending: true }); // Urutkan berdasarkan ID agar Kepala Keluarga di atas

        if (anggotaError) throw anggotaError;
        setAnggotaKeluarga(anggotaData || []);

      } catch (error) {
        console.error('Error mengambil data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchDetailKeluarga();
    }
  }, [id]);

  const handleJadikanAdmin = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    // Nanti bisa ditambahkan logika Supabase .update() untuk mengubah kolom 'role' menjadi 'admin'
  };

  // Tampilan saat data sedang dimuat (Loading)
  if (isLoading) {
    return (
      <div className="app" id="app">
        <main id="main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <p style={{ color: '#64748b', fontWeight: '500' }}>Memuat data keluarga...</p>
        </main>
      </div>
    );
  }

  // Tampilan jika ID tidak ditemukan di database
  if (!dataWarga) {
    return (
      <div className="app" id="app">
        <main id="main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '24px', textAlign: 'center' }}>
          <h2 style={{ color: '#1A365D', marginBottom: '8px' }}>Data Tidak Ditemukan</h2>
          <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>Keluarga dengan ID "{id}" belum terdaftar atau telah dihapus.</p>
          <button onClick={() => router.back()} style={{ padding: '12px 24px', background: '#1A365D', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
            Kembali ke Data Warga
          </button>
        </main>
      </div>
    );
  }

  // Tampilan Utama jika Data Berhasil Ditarik
  return (
    <div className="app" id="app">
      
      <div className={`toast ${showToast ? 'show' : ''}`}>
        Berhasil memperbarui status admin!
      </div>

      <main id="main">
        <section className="view-keluarga" aria-label="Data Keluarga">
          
          <header className="appbar">
            <button className="appbar__back" onClick={() => router.back()} aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="appbar__text">
              <h1>Data Warga</h1>
              <p>Data Warga RT 01/RW 02</p>
            </div>
          </header>

          {/* Kartu Profil Kepala Keluarga (Dari tabel warga) */}
          <div className="family-profile-card">
            <div className="profile-header">
              <div className="avatar-large">{getInitials(dataWarga.nama_lengkap)}</div>
              <div className="profile-title">
                <h2>{dataWarga.nama_lengkap}</h2>
                <p>{dataWarga.alamat} • {dataWarga.jumlah_anggota || 1} Anggota</p>
                <span className="phone-text">{dataWarga.no_hp}</span>
              </div>
            </div>
          </div>

          <div className="section-title">
            <h3>Anggota Keluarga</h3>
          </div>

          {/* Daftar Anggota (Dari tabel anggota_keluarga) */}
          <div className="member-list">
            {anggotaKeluarga.length > 0 ? (
              anggotaKeluarga.map((member) => (
                <div key={member.id} className="member-card">
                  <div className="member-row">
                    <span className="label">Nama Lengkap</span>
                    <span className="value bold">{member.nama_lengkap}</span>
                  </div>
                  <div className="member-row">
                    <span className="label">NIK</span>
                    <span className="value nik">{member.nik}</span>
                  </div>
                  <div className="member-row">
                    <span className="label">Status Hubungan Dalam Keluarga</span>
                    <span className="value">{member.status_hubungan}</span>
                  </div>
                  <div className="member-row">
                    <span className="label">Jenis Kelamin</span>
                    <span className="value">{member.jenis_kelamin}</span>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginTop: '10px' }}>
                Belum ada data anggota keluarga yang ditambahkan.
              </p>
            )}
          </div>

          <div className="action-buttons-container">
            <button className="btn-admin" onClick={handleJadikanAdmin}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4-4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              Jadikan Admin
            </button>
            <button className="btn-kk">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
              </svg>
              Lihat Dokumen KK
            </button>
          </div>

        </section>
      </main>
    </div>
  );
}