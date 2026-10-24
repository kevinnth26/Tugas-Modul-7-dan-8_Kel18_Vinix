import Link from 'next/link'; // Menggunakan Link dari Next.js untuk navigasi
import './signup.css';

export default function SignUp() {
  return (
    <>
      <div className="mobile-wrapper">
        <div className="header">
          {/* Ubah href menjadi menggunakan <Link> dan arahkan ke '/signin' */}
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
        
        {/* Tutup tag tunggal <hr> */}
        <hr className="divider" />

        <div className="content-section">
          <h2>Daftar sebagai warga</h2>
          <p className="subtitle">Gunakan data yang sesuai dengan administrasi lingkungan agar proses verifikasi lebih cepat.</p>

          <form id="signupForm">
            <div className="input-group">
              <label>NIK</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                {/* Tutup tag tunggal <input> */}
                <input type="text" placeholder="Masukkan 16 digit NIK" />
              </div>
            </div>

            <div className="input-group">
              <label>Nama Lengkap</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <input type="text" placeholder="Masukkan nama sesuai KTP" />
              </div>
            </div>

            <div className="input-group">
              <label>Email (Opsional)</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <input type="email" placeholder="contoh@surat.id" />
              </div>
            </div>

            <div className="input-group">
              <label>Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <input type="password" placeholder="••••••••" />
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
                <input type="password" placeholder="••••••••" />
                <svg className="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
            </div>

            <button type="submit" className="btn-primary">Daftar</button>
          </form>
        </div>
      </div>
    </>
  );
}