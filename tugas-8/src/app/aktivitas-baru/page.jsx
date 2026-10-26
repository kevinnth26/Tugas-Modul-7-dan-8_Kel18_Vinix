"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import './aktivitas-baru.css';

const DATA_URL = '/data/aktivitas.json';
const MIN_SKELETON_MS = 600; // agar skeleton sempat terlihat walau data lokal sangat cepat
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
  'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const STATUS_PILL = { success: 'akt-pill--green', pending: 'akt-pill--amber', rejected: 'akt-pill--red' };
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/* ---------- Helper data ---------- */
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 'YYYY-MM-DD' -> ms (UTC, bebas masalah zona waktu)
const toUtc = (s) => { const p = s.split('-'); return Date.UTC(+p[0], +p[1] - 1, +p[2]); };

// Label grup: Hari ini / Kemarin / "2 Oktober 2026".
// `today` dibaca dari JSON agar tampilan prototipe konsisten dengan data contoh.
function groupLabel(dateStr, today) {
  const diff = Math.round((toUtc(today) - toUtc(dateStr)) / 86400000);
  if (diff === 0) return 'Hari ini';
  if (diff === 1) return 'Kemarin';
  const p = dateStr.split('-');
  return `${+p[2]} ${MONTHS[+p[1] - 1]} ${p[0]}`;
}

// "Siti Rahma" -> "SR", "Bambang S." -> "BS"
function initials(name) {
  const words = String(name).trim().split(/\s+/);
  const second = words.length > 1 ? words[1].charAt(0) : (words[0].charAt(1) || '');
  return (words[0].charAt(0) + second).toUpperCase();
}

// Sanitasi: buang data rusak, rapikan spasi, urutkan terbaru di atas
function clean(json) {
  if (!json || !Array.isArray(json.activities)) throw new Error('Format data tidak valid');
  const today = DATE_RE.test(json.today || '') ? json.today : new Date().toISOString().slice(0, 10);
  const items = json.activities
    .filter((a) => a && a.name && a.desc && DATE_RE.test(a.date || '') && /^\d{1,2}:\d{2}$/.test(a.time || ''))
    .map((a) => ({
      id: a.id,
      name: String(a.name).trim(),
      desc: String(a.desc).trim(),
      date: a.date,
      time: a.time,
      status: STATUS_PILL[a.status] ? a.status : 'success',
      label: String(a.label || '').trim(),
    }))
    .sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));
  return { today, items };
}

async function fetchActivities() {
  const res = await fetch(DATA_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return clean(await res.json());
}

/* ---------- Komponen kecil ---------- */
function SkeletonList() {
  return (
    <>
      {[2, 3].map((rows) => (
        <section key={rows} aria-hidden="true">
          <span className="akt-sk akt-sk--title" />
          <ul className="akt-list">
            {Array.from({ length: rows }, (_, i) => (
              <li className="akt-row" key={i}>
                <span className="akt-sk akt-sk--circle" />
                <div className="akt-body">
                  <span className="akt-sk akt-sk--line akt-sk--w60" />
                  <span className="akt-sk akt-sk--line akt-sk--w80" />
                  <span className="akt-sk akt-sk--line akt-sk--w30" />
                </div>
                <span className="akt-sk akt-sk--pill" />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

function StateBox({ kind, title, text, btnLabel, onClick }) {
  return (
    <div className={`akt-state akt-state--${kind}`} role={kind === 'error' ? 'alert' : 'status'}>
      <span className="akt-state__icon" aria-hidden="true">
        {kind === 'error' ? (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="m9 14 2 2 4-4"/>
          </svg>
        )}
      </span>
      <p className="akt-state__title">{title}</p>
      <p className="akt-state__text">{text}</p>
      <button type="button" className="akt-btn" id="btn-retry" onClick={onClick}>{btnLabel}</button>
    </div>
  );
}

export default function AktivitasBaru() {
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'empty' | 'error'
  const [data, setData] = useState(null);
  const [toast, setToast] = useState('');
  const loadingRef = useRef(false);
  const toastTimer = useRef(null);

  const load = useCallback(async (isRetry) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setStatus('loading');
    try {
      const [hasil] = await Promise.all([fetchActivities(), wait(MIN_SKELETON_MS)]);
      setData(hasil);
      if (!hasil.items.length) {
        setStatus('empty');
      } else {
        setStatus('success');
        if (isRetry) {
          setToast('Aktivitas berhasil dimuat');
          clearTimeout(toastTimer.current);
          toastTimer.current = setTimeout(() => setToast(''), 2500);
        }
      }
    } catch (err) {
      console.error('Gagal memuat aktivitas:', err);
      setStatus('error');
    } finally {
      loadingRef.current = false;
    }
  }, []);

  useEffect(() => {
    load(false);
    return () => clearTimeout(toastTimer.current);
  }, [load]);

  // Kelompokkan per tanggal (data sudah terurut, jadi urutan grup ikut terbaru -> lama)
  const groups = [];
  if (status === 'success' && data) {
    data.items.forEach((a) => {
      const last = groups[groups.length - 1];
      if (!last || last.date !== a.date) groups.push({ date: a.date, items: [a] });
      else last.items.push(a);
    });
  }

  return (
    <div className="app" id="app">
      <main id="main">
        <section className="view" aria-label="Aktivitas Terbaru">

          <header className="appbar">
            <Link className="appbar__back" href="/dashboard-admin" aria-label="Kembali ke Dashboard Admin">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
              </svg>
            </Link>
            <div className="appbar__text">
              <h1>Aktivitas Terbaru</h1>
              <p>Riwayat Aktivitas</p>
            </div>
          </header>

          <div className="akt-feed" id="feed" aria-live="polite" aria-busy={status === 'loading'}>
            {status === 'loading' && <SkeletonList />}

            {status === 'error' && (
              <StateBox kind="error" title="Gagal memuat data" text="Periksa koneksi Anda, lalu coba lagi."
                btnLabel="Coba lagi ↻" onClick={() => load(true)} />
            )}

            {status === 'empty' && (
              <StateBox kind="empty" title="Belum ada aktivitas" text="Aktivitas warga akan muncul di sini."
                btnLabel="Muat ulang" onClick={() => load(true)} />
            )}

            {groups.map((g) => (
              <section key={g.date}>
                <h2 className="akt-group__title">{groupLabel(g.date, data.today)}</h2>
                <ul className="akt-list">
                  {g.items.map((a) => (
                    <li className="akt-row" key={a.id ?? `${a.date}-${a.time}-${a.name}`}>
                      <span className="akt-ini" aria-hidden="true">{initials(a.name)}</span>
                      <div className="akt-body">
                        <p className="akt-name">{a.name}</p>
                        <p className="akt-desc">{a.desc}</p>
                        <p className="akt-time">{a.time.replace(':', '.')}</p>
                      </div>
                      <span className={`akt-pill ${STATUS_PILL[a.status]}`}>{a.label}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>
      </main>
      {toast && <div className="akt-toast" role="status">{toast}</div>}
    </div>
  );
}
