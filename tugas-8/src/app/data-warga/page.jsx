"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";
import "./data-warga.css";

export default function DataWargaPage() {
  const [wargaList, setWargaList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk menarik data dari Supabase
  const fetchWarga = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("warga")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Gagal memuat data warga:", error.message);
    } else {
      setWargaList(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWarga();
  }, []);

  // Filter pencarian berdasarkan nama atau alamat
  const filteredWarga = wargaList.filter((warga) =>
    warga.nama_lengkap?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    warga.alamat?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <main>
        <div className="view-datawarga">
          
          {/* Header / Appbar */}
          <header className="appbar">
            <Link href="/dashboard" className="appbar__back">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="appbar__text">
              <h1>Data Warga</h1>
              <p>Dokumentasi & Informasi Warga RT</p>
            </div>
          </header>

          {/* Search Bar */}
          <div className="search-container">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Cari nama warga atau alamat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Stats Cards */}
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">{wargaList.length}</div>
              <p className="stat-label">Total Kepala Keluarga</p>
            </div>
          </div>

          {/* Section Header */}
          <div className="section-header">
            <h2>Daftar Warga Terdaftar</h2>
            <span className="sort-text" onClick={fetchWarga}>Perbarui Data</span>
          </div>

          {/* Warga List & Cards */}
          <div className="warga-list">
            {isLoading ? (
              // Loading Skeleton State
              [1, 2, 3].map((n) => (
                <div key={n} className="warga-card" style={{ opacity: 0.6 }}>
                  <div className="avatar-warga" style={{ background: "#cbd5e1" }}>...</div>
                  <div className="warga-info">
                    <div style={{ width: "120px", height: "14px", background: "#cbd5e1", borderRadius: "4px", marginBottom: "8px" }}></div>
                    <div style={{ width: "180px", height: "10px", background: "#e2e8f0", borderRadius: "4px" }}></div>
                  </div>
                </div>
              ))
            ) : filteredWarga.length > 0 ? (
              // Data Muncul dari Database
              filteredWarga.map((warga, index) => {
                // Ambil inisial nama untuk Avatar
                const initials = warga.nama_lengkap
                  ? warga.nama_lengkap.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
                  : "W";

                return (
                  <div key={warga.id || index} className="warga-card">
                    <div className="avatar-warga">{initials}</div>
                    <div className="warga-info">
                      <h3>{warga.nama_lengkap}</h3>
                      <p>{warga.alamat} • Jumlah Tanggungan: {warga.jumlah_anggota || 1} orang</p>
                      <span className="phone">📞 {warga.no_hp || "-"}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              // Empty State (Jika pencarian tidak ditemukan)
              <div className="empty-search">
                <p>Yah, warga yang kamu cari tidak ditemukan.</p>
                <button 
                  onClick={() => setSearchQuery("")} 
                  style={{ marginTop: "8px", padding: "6px 14px", background: "#0F172A", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: "600" }}
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}