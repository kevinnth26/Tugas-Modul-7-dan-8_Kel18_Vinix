(function () {
  'use strict';
  var W = window.Warga;
  var $ = W.$, h = W.h;

  // a < 0 = pengeluaran, a > 0 = pemasukan
  var KAS = {
    oktober: [
      { t: 'Perbaikan Jalan',        m: 'Operasional - 4 Oktober 2026',     s: 'Ditolak',       a: -500000 },
      { t: 'Lampu Pos Ronda',        m: 'Operasional - 4 Oktober 2026',     s: 'Menunggu',      a: -50000 },
      { t: 'Iuran Warga September',  m: 'Faisal - 3 Oktober 2026',          s: 'Menunggu',      a: 150000 },
      { t: 'Iuran Warga September',  m: 'Ananda Fikri - 3 Oktober 2026',    s: 'Terverifikasi', a: 150000 },
      { t: 'Iuran Warga September',  m: 'Siti Rahma - 3 Oktober 2026',      s: 'Terverifikasi', a: 150000 },
      { t: 'Perbaikan Pompa Air',    m: 'Operasional - 2 Oktober 2026',     s: 'Terverifikasi', a: -650000 },
      { t: 'Tagihan Listrik Pos RT', m: 'Listrik - 1 Oktober 2026',         s: 'Menunggu',      a: -285000 }
    ],
    september: [
      { t: 'Iuran Warga Agustus',    m: 'Bambang S. - 28 September 2026',   s: 'Terverifikasi', a: 150000 },
      { t: 'Iuran Warga Agustus',    m: 'Dewi Ningsih - 27 September 2026', s: 'Terverifikasi', a: 150000 },
      { t: 'Kebersihan Lingkungan',  m: 'Operasional - 20 September 2026',  s: 'Terverifikasi', a: -200000 },
      { t: 'Konsumsi Rapat Warga',   m: 'Operasional - 15 September 2026',  s: 'Terverifikasi', a: -175000 },
      { t: 'Iuran Warga Agustus',    m: 'Andi Pratama - 5 September 2026',  s: 'Terverifikasi', a: 150000 }
    ],
    agustus: [
      { t: 'Lomba 17 Agustus',       m: 'Kegiatan - 17 Agustus 2026',       s: 'Terverifikasi', a: -1200000 },
      { t: 'Iuran Warga Juli',       m: 'Siti Rahma - 8 Agustus 2026',      s: 'Terverifikasi', a: 150000 },
      { t: 'Iuran Warga Juli',       m: 'Faisal - 6 Agustus 2026',          s: 'Terverifikasi', a: 150000 },
      { t: 'Tagihan Listrik Pos RT', m: 'Listrik - 2 Agustus 2026',         s: 'Ditolak',       a: -285000 }
    ],
    juli: [
      { t: 'Pembelian Tong Sampah',  m: 'Operasional - 12 Juli 2026',       s: 'Terverifikasi', a: -400000 },
      { t: 'Iuran Warga Juni',       m: 'Siti Rahma - 8 Juli 2026',         s: 'Terverifikasi', a: 150000 },
      { t: 'Iuran Warga Juni',       m: 'Faisal - 5 Juli 2026',             s: 'Terverifikasi', a: 150000 },
      { t: 'Tagihan Listrik Pos RT', m: 'Listrik - 2 Juli 2026',            s: 'Terverifikasi', a: -285000 }
    ],
    juni: [
      { t: 'Perbaikan Lampu Jalan',  m: 'Operasional - 16 Juni 2026',       s: 'Terverifikasi', a: -320000 },
      { t: 'Iuran Warga Mei',        m: 'Ananda Fikri - 10 Juni 2026',      s: 'Terverifikasi', a: 150000 },
      { t: 'Iuran Warga Mei',        m: 'Bambang S. - 6 Juni 2026',         s: 'Terverifikasi', a: 150000 },
      { t: 'Tagihan Listrik Pos RT', m: 'Listrik - 2 Juni 2026',            s: 'Terverifikasi', a: -285000 }
    ],
    mei: [
      { t: 'Kebersihan Lingkungan',  m: 'Operasional - 22 Mei 2026',        s: 'Terverifikasi', a: -200000 },
      { t: 'Iuran Warga April',      m: 'Andi Pratama - 9 Mei 2026',        s: 'Terverifikasi', a: 150000 },
      { t: 'Iuran Warga April',      m: 'Dewi Ningsih - 7 Mei 2026',        s: 'Terverifikasi', a: 150000 },
      { t: 'Tagihan Listrik Pos RT', m: 'Listrik - 2 Mei 2026',             s: 'Terverifikasi', a: -285000 }
    ],
    april: [
      { t: 'Pengecatan Pos Ronda',   m: 'Operasional - 18 April 2026',      s: 'Terverifikasi', a: -450000 },
      { t: 'Iuran Warga Maret',      m: 'Siti Rahma - 8 April 2026',        s: 'Terverifikasi', a: 150000 },
      { t: 'Iuran Warga Maret',      m: 'Faisal - 5 April 2026',            s: 'Terverifikasi', a: 150000 },
      { t: 'Tagihan Listrik Pos RT', m: 'Listrik - 2 April 2026',           s: 'Terverifikasi', a: -285000 }
    ],
    maret: [
      { t: 'Konsumsi Rapat Warga',   m: 'Operasional - 15 Maret 2026',      s: 'Terverifikasi', a: -175000 },
      { t: 'Iuran Warga Februari',   m: 'Ananda Fikri - 9 Maret 2026',      s: 'Terverifikasi', a: 150000 },
      { t: 'Iuran Warga Februari',   m: 'Bambang S. - 6 Maret 2026',        s: 'Terverifikasi', a: 150000 },
      { t: 'Tagihan Listrik Pos RT', m: 'Listrik - 2 Maret 2026',           s: 'Terverifikasi', a: -285000 }
    ],
    februari: [
      { t: 'Perbaikan Saluran Air',  m: 'Operasional - 14 Februari 2026',   s: 'Terverifikasi', a: -350000 },
      { t: 'Iuran Warga Januari',    m: 'Faisal - 10 Februari 2026',        s: 'Terverifikasi', a: 150000 },
      { t: 'Iuran Warga Januari',    m: 'Dewi Ningsih - 8 Februari 2026',   s: 'Terverifikasi', a: 150000 },
      { t: 'Tagihan Listrik Pos RT', m: 'Listrik - 2 Februari 2026',        s: 'Terverifikasi', a: -285000 }
    ],
    januari: [
      { t: 'Iuran Warga Desember',   m: 'Siti Rahma - 9 Januari 2026',      s: 'Terverifikasi', a: 150000 },
      { t: 'Iuran Warga Desember',   m: 'Andi Pratama - 7 Januari 2026',    s: 'Terverifikasi', a: 150000 },
      { t: 'Tagihan Listrik Pos RT', m: 'Listrik - 3 Januari 2026',         s: 'Terverifikasi', a: -285000 },
      { t: 'Kerja Bakti Awal Tahun', m: 'Kegiatan - 2 Januari 2026',        s: 'Terverifikasi', a: -120000 }
    ]
  };
  var STATUS_PILL = { 'Ditolak': 'pill--red', 'Menunggu': 'pill--amber', 'Terverifikasi': 'pill--green' };

  var select = $('#kas-month');
  var list = $('#kas-list');

  function render() {
    list.textContent = '';
    var rows = KAS[select.value] || [];
    if (!rows.length) {
      list.appendChild(h('li', { class: 'empty' }, 'Belum ada transaksi pada bulan ini.'));
      return;
    }
    rows.forEach(function (r) {
      var income = r.a > 0;
      list.appendChild(h('li', null,
        h('span', { class: 'tx__ico ' + (income ? 'tx__ico--in' : 'tx__ico--out') }, W.icon(income ? 'arrow-out' : 'arrow-in')),
        h('div', { class: 'tx__main' },
          h('p', { class: 'tx__title' }, r.t),
          h('p', { class: 'tx__meta' }, r.m)
        ),
        h('div', { class: 'tx__side' },
          h('span', { class: 'pill ' + STATUS_PILL[r.s] }, r.s),
          h('span', { class: 'tx__amt ' + (income ? 'tx__amt--in' : 'tx__amt--out') }, (income ? '+' : '-') + W.rupiah(r.a))
        )
      ));
    });
  }

  select.addEventListener('change', render);
  render();
})();