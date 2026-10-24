import Link from 'next/link';
// Ubah nama file CSS di bawah ini jika Anda me-rename index.css menjadi dashboard.css
import './index.css'; 

export default function Dashboard() {
  return (
    <>
      <div className="mobile-wrapper">
        {/* Area Konten Utama yang bisa di-scroll */}
        <div className="content-area-dashboard">
          {/* Header Biru */}
          <div className="header-blue">
            <div className="user-info">
              <div>
                <h1>Halo, Budi!</h1>
                <p>Sabtu, 3 Oktober 2026</p>
              </div>
              <div className="avatar"></div>
            </div>
          </div>

          {/* Konten Bawah (Abu-abu) */}
          <div className="main-content">
            {/* Kartu Saldo */}
            <div className="balance-card">
              <div className="balance-header">
                <span>Total Saldo Kas RT</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 8h20M6 16h.01" />
                </svg>
              </div>
              <h2>Rp 5.000.000</h2>
              <p>Diperbarui hari ini pukul 08.30</p>
            </div>

            {/* Menu Aksi Cepat */}
            <div className="quick-actions">
              <Link href="/bayar-iuran" className="action-btn" id="btnBayarIuran" style={{ textDecoration: 'none', color: 'inherit' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span>Bayar Iuran</span>
              </Link>
              <Link href="/katalog" className="action-btn" id="btnPinjam" style={{ textDecoration: 'none', color: 'inherit' }}>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
  <span>Pinjam Aset</span>
</Link>
              <button className="action-btn" id="btnAdminPanel">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Panel Admin</span>
              </button>
            </div>

            {/* Arus Saldo Kas */}
            <div className="section-header">
              <h3>Arus Saldo Kas</h3>
              {/* Note: Sesuaikan Link ini nanti dengan nama folder riwayat-kas Anda */}
              <Link href="/riwayat-kas">Lihat semua</Link>
            </div>
            <div className="list-card">
              <div className="list-item">
                <div className="icon-box green-bg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                    <polyline points="7 17 17 17 17 7" />
                    <line x1="7" y1="17" x2="17" y2="7" />
                  </svg>
                </div>
                <div className="item-details">
                  <h4>Iuran September</h4>
                  <p>Hari ini, 08.15</p>
                </div>
                <div className="item-amount text-green">+Rp 150.000</div>
              </div>
              <div className="divider"></div>
              <div className="list-item">
                <div className="icon-box red-bg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                    <polyline points="7 7 17 7 17 17" />
                    <line x1="17" y1="7" x2="7" y2="17" />
                  </svg>
                </div>
                <div className="item-details">
                  <h4>Perbaikan pos ronda</h4>
                  <p>28 Sep 2026</p>
                </div>
                <div className="item-amount text-red">-Rp 450.000</div>
              </div>
            </div>

            {/* Jadwal Kegiatan */}
            <div className="section-header">
              <h3>Jadwal Kegiatan</h3>
              {/* Note: Sesuaikan Link ini nanti dengan nama folder jadwal Anda */}
              <Link href="/jadwal">Lihat semua</Link>
            </div>
            {/* Pada React, kita bisa mengganti div clickable + onclick dengan <Link> murni */}
            <Link href="/jadwal" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="list-card clickable">
                <div className="list-item">
                  <div className="date-box">
                    <span className="date-num">11</span>
                    <span className="date-month">OKT</span>
                  </div>
                  <div className="item-details">
                    <h4>Kerja Bakti Lingkungan</h4>
                    <p>07.00 • Titik kumpul Pos RT</p>
                  </div>
                  <div className="badge">Terjadwal</div>
                </div>
              </div>
            </Link>

            <Link href="/jadwal" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="list-card clickable" style={{ marginTop: '10px' }}>
                <div className="list-item">
                  <div className="date-box">
                    <span className="date-num">16</span>
                    <span className="date-month">OKT</span>
                  </div>
                  <div className="item-details">
                    <h4>Rapat Warga</h4>
                    <p>19.00 • Titik kumpul Pos RT</p>
                  </div>
                  <div className="badge">Terjadwal</div>
                </div>
              </div>
            </Link>
            
            {/* Spasi kosong agar konten tidak tertutup navigasi bawah */}
            <div style={{ height: '80px' }}></div> 
          </div>
        </div>

        {/* Navigasi Bawah */}
        <div className="bottom-nav">
          <Link href="/dashboard" className="nav-item active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Beranda</span>
          </Link>
          <Link href="/katalog" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
            <span>Katalog</span>
          </Link>
          <Link href="/profil" className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Profil</span>
          </Link>
        </div>
      </div>
    </>
  );
}