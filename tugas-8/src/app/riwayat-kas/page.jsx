"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import './riwayat-kas.css';

export default function RiwayatKas() {
  const router = useRouter(); 
  const [bulan, setBulan] = useState('oktober');

  // Data riwayat disesuaikan dengan contoh di foto 4
  const riwayatData = [
    { id: 1, title: 'Perbaikan Jalan', date: 'Operasional - 4 Oktober 2026', amount: '-Rp 500.000', type: 'out', status: 'Ditolak', statusColor: 'red' },
    { id: 2, title: 'Lampu Pos Ronda', date: 'Operasional - 4 Oktober 2026', amount: '-Rp 50.000', type: 'out', status: 'Menunggu', statusColor: 'yellow' },
    { id: 3, title: 'Iuran Warga September', date: 'Faisal - 3 Oktober 2026', amount: '+Rp 150.000', type: 'in', status: 'Menunggu', statusColor: 'yellow' },
    { id: 4, title: 'Iuran Warga September', date: 'Ananda Fikri - 3 Oktober 2026', amount: '+Rp 150.000', type: 'in', status: 'Terverifikasi', statusColor: 'green' },
    { id: 5, title: 'Iuran Warga September', date: 'Siti Rahma - 3 Oktober 2026', amount: '+Rp 150.000', type: 'in', status: 'Terverifikasi', statusColor: 'green' },
    { id: 6, title: 'Perbaikan Pompa Air', date: 'Operasional - 2 Oktober 2026', amount: '-Rp 650.000', type: 'out', status: 'Terverifikasi', statusColor: 'green' },
    { id: 7, title: 'Tagihan Listrik Pos RT', date: 'Listrik - 1 Oktober 2026', amount: '-Rp 285.000', type: 'out', status: 'Menunggu', statusColor: 'yellow' },
  ];

  return (
    <div className="app" id="app">
      <main id="main">
        <section className="view" aria-label="Riwayat Kas Warga">
          
          <header className="appbar">
            {/* Tombol Back Dinamis - otomatis mengembalikan pengguna ke halaman asal (Dashboard atau Admin) */}
            <button className="appbar__back" onClick={() => router.back()} aria-label="Kembali">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <div className="appbar__text">
              <h1>Riwayat Kas</h1>
            </div>
          </header>

          <div className="stack stack--plain">
            <div className="row-between">
              <h2 className="section-title">Riwayat Kas</h2>
              
              <label className="select-wrap">
                <span className="sr-only">Pilih bulan</span>
                <select 
                  id="kas-month" 
                  className="select" 
                  value={bulan}
                  onChange={(e) => setBulan(e.target.value)}
                >
                  <option value="agustus">Agustus</option>
                  <option value="september">September</option>
                  <option value="oktober">Oktober</option>
                </select>
                <svg className="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </label>
            </div>

            <ul className="tx" id="kas-list">
              {riwayatData.map((item) => (
                <li key={item.id}>
                  <div className={`tx__ico ${item.type === 'in' ? 'tx__ico--in' : 'tx__ico--out'}`}>
                    {item.type === 'in' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 17 17 17 17 7"/><line x1="7" y1="17" x2="17" y2="7"/></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 7 17 7 17 17"/><line x1="17" y1="7" x2="7" y2="17"/></svg>
                    )}
                  </div>
                  
                  <div className="tx__main">
                    <h4 className="tx__title">{item.title}</h4>
                    <p className="tx__meta">{item.date}</p>
                  </div>
                  
                  <div className="tx__side">
                    {/* Status badge dengan warna yang berubah-ubah */}
                    <span className={`pill pill--${item.statusColor}`}>
                      {item.status}
                    </span>
                    <span className={`tx__amt ${item.type === 'in' ? 'tx__amt--in' : 'tx__amt--out'}`}>
                      {item.amount}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            
          </div>
        </section>
      </main>
    </div>
  );
}