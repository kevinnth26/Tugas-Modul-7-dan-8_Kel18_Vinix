"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import './history.css';

export default function HistoryPeminjaman() {
  const router = useRouter();
  const [historyItems, setHistoryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // 1. Ambil user yang sedang login
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          setIsLoading(false);
          return;
        }

        // 2. Cari warga_id milik user ini (menggunakan ilike agar tidak sensitif huruf besar/kecil)
        const { data: dataWarga, error: wargaError } = await supabase
          .from('warga')
          .select('id')
          .ilike('email', user.email)
          .maybeSingle();

        if (wargaError || !dataWarga) {
          setIsLoading(false);
          return;
        }

        // 3. Ambil data peminjaman KHUSUS untuk warga_id tersebut
        const { data, error } = await supabase
          .from('peminjaman')
          .select(`
            *,
            inventaris:inventaris_id ( nama_barang )
          `)
          .eq('warga_id', dataWarga.id) // INI FILTER KUNCINYA
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistoryItems(data || []);
      } catch (error) {
        console.error("Error mengambil history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const getStatusStyle = (status) => {
    const s = status ? status.toLowerCase() : '';
    if (s.includes('menunggu')) {
      return { cardClass: 'history-card--yellow', iconClass: 'icon-clock--yellow', text: 'Menunggu Persetujuan' };
    } else if (s.includes('terima') || s.includes('selesai')) {
      return { cardClass: 'history-card--green', iconClass: 'icon-clock--green', text: 'Disetujui' };
    } else if (s.includes('tolak')) {
      return { cardClass: 'history-card--red', iconClass: 'icon-clock--red', text: 'Ditolak' };
    }
    return { cardClass: 'history-card--yellow', iconClass: 'icon-clock--yellow', text: status };
  };

  return (
    <div className="mobile-wrapper">
      <div className="header">
        <button onClick={() => router.back()} className="back-btn" style={{ background: 'none', border: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
        </button>
        <div className="header-text">
          <h1>Riwayat Peminjaman</h1>
          <p>Status pengajuan aset Anda</p>
        </div>
      </div>
      <hr className="divider" />

      <div className="content-area">
        {isLoading ? (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Memuat riwayat...</p>
        ) : historyItems.length > 0 ? (
          <div className="history-list">
            {historyItems.map((item) => {
              const style = getStatusStyle(item.status);
              const namaBarang = item.inventaris?.nama_barang || 'Aset Warga';
              
              return (
                <div key={item.id} className={`history-card ${style.cardClass}`}>
                  <div className="status-header">
                    <div className={`icon-clock ${style.iconClass}`}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <div className="status-text">
                      <h4>{style.text}</h4>
                      <p>
                        {style.text === 'Ditolak' ? 'Pengajuan Anda tidak dapat diproses' : 'Hubungi Pengurus jika belum dikonfirmasi'}
                      </p>
                    </div>
                  </div>
                  <div className="card-divider"></div>
                  <div className="status-details">
                    <div className="detail-col">
                      <span className="detail-label">ASET</span>
                      <p className="detail-val">{namaBarang} ({item.jumlah_pinjam} unit)</p>
                    </div>
                    <div className="detail-col right">
                      <span className="detail-label">PERIODE</span>
                      <p className="detail-val">{item.tanggal_pinjam} s/d {item.tanggal_kembali}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '20px', color: '#6B7280' }}>Belum ada riwayat peminjaman.</p>
        )}
      </div>
    </div>
  );
}