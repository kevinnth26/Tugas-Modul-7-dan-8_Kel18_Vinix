import Link from 'next/link';
import './jadwal.css';

export default function JadwalKegiatan() {
  return (
    <>
      <div className="mobile-wrapper">
        <div className="content-area">
          {/* Header Putih */}
          <div className="header">
            {/* Tombol kembali diarahkan ke dashboard (beranda) */}
            <Link href="/dashboard" className="back-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A365D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </Link>
            <div className="header-text">
              <h1>Jadwal Kegiatan</h1>
              <p>Jadwal aktivitas kewajiban warga</p>
            </div>
          </div>
          
          {/* Tutup tag tunggal hr */}
          <hr className="divider" />

          <div className="main-content">
            {/* Kalender */}
            <div className="calendar-card">
              <div className="calendar-header">
                <svg className="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
                <h3 className="month-title">October</h3>
                <svg className="nav-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
              
              <div className="calendar-grid days">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>
              <div className="calendar-grid dates">
                {/* Baris 1 */}
                <span></span><span></span><span></span><span>1</span><span>2</span><span>3</span><span>4</span>
                {/* Baris 2 */}
                <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span className="highlight">11</span>
                {/* Baris 3 */}
                <span>12</span><span>13</span><span>14</span><span>15</span><span className="highlight">16</span><span>17</span><span>18</span>
                {/* Baris 4 */}
                <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span className="highlight">25</span>
                {/* Baris 5 */}
                <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span><span></span>
              </div>
            </div>

            {/* Daftar Kegiatan */}
            <div className="list-card">
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

            <div className="list-card">
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

            <div className="list-card">
              <div className="list-item">
                <div className="date-box">
                  <span className="date-num">25</span>
                  <span className="date-month">OKT</span>
                </div>
                <div className="item-details">
                  <h4>Kerja Bakti Lingkungan</h4>
                  <p>07.00 • Titik kumpul Pos RT</p>
                </div>
                <div className="badge">Terjadwal</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}