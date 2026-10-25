(function () {
  'use strict';
  var W = window.Warga;
  var $ = W.$, h = W.h;

  var DATA_URL = 'data/aktivitas.json';
  var MIN_SKELETON_MS = 600; // agar skeleton sempat terlihat walau data lokal sangat cepat
  var MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli',
    'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  var STATUS_PILL = { success: 'pill--green', pending: 'pill--amber', rejected: 'pill--red' };

  var feed = $('#feed');
  var loading = false;

  /* ---------- Helper data ---------- */
  function wait(ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); }

  function toUtc(dateStr) { // 'YYYY-MM-DD' -> ms (UTC, bebas masalah zona waktu)
    var p = dateStr.split('-');
    return Date.UTC(+p[0], +p[1] - 1, +p[2]);
  }

  // Label grup: Hari ini / Kemarin / "2 Oktober 2026".
  // `today` dibaca dari JSON agar tampilan prototipe konsisten dengan data contoh.
  function groupLabel(dateStr, today) {
    var diff = Math.round((toUtc(today) - toUtc(dateStr)) / 86400000);
    if (diff === 0) return 'Hari ini';
    if (diff === 1) return 'Kemarin';
    var p = dateStr.split('-');
    return (+p[2]) + ' ' + MONTHS[+p[1] - 1] + ' ' + p[0];
  }

  function initials(name) { // "Siti Rahma" -> "SR", "Bambang S." -> "BS"
    var words = String(name).trim().split(/\s+/);
    var first = words[0].charAt(0);
    var second = words.length > 1 ? words[1].charAt(0) : (words[0].charAt(1) || '');
    return (first + second).toUpperCase();
  }

  // Sanitasi: buang data yang rusak, rapikan spasi, urutkan terbaru di atas
  function clean(json) {
    if (!json || !Array.isArray(json.activities)) throw new Error('Format data tidak valid');
    var today = /^\d{4}-\d{2}-\d{2}$/.test(json.today || '') ? json.today : new Date().toISOString().slice(0, 10);
    var items = json.activities.filter(function (a) {
      return a && a.name && a.desc && /^\d{4}-\d{2}-\d{2}$/.test(a.date || '') && /^\d{1,2}:\d{2}$/.test(a.time || '');
    }).map(function (a) {
      return {
        id: a.id,
        name: String(a.name).trim(),
        desc: String(a.desc).trim(),
        date: a.date,
        time: a.time,
        status: STATUS_PILL[a.status] ? a.status : 'success',
        label: String(a.label || '').trim()
      };
    }).sort(function (a, b) {
      return (b.date + ' ' + b.time).localeCompare(a.date + ' ' + a.time);
    });
    return { today: today, items: items };
  }

  function fetchActivities() {
    return fetch(DATA_URL, { cache: 'no-store' }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    }).then(clean);
  }

  /* ---------- Render ---------- */
  function setBusy(busy) { feed.setAttribute('aria-busy', String(busy)); }

  function skeletonRow() {
    return h('li', { class: 'activity__row' },
      h('span', { class: 'sk sk--circle' }),
      h('div', { class: 'activity__body' },
        h('span', { class: 'sk sk--line sk--w60' }),
        h('span', { class: 'sk sk--line sk--w80' }),
        h('span', { class: 'sk sk--line sk--w30' })
      ),
      h('span', { class: 'sk sk--pill' })
    );
  }

  function renderSkeleton() {
    setBusy(true);
    feed.textContent = '';
    feed.appendChild(h('span', { class: 'sr-only' }, 'Memuat aktivitas…'));
    [2, 3].forEach(function (rows) {
      var list = h('ul', { class: 'activity' });
      for (var i = 0; i < rows; i++) list.appendChild(skeletonRow());
      feed.appendChild(h('section', { 'aria-hidden': 'true' }, h('span', { class: 'sk sk--title' }), list));
    });
  }

  function renderState(kind, title, text, btnLabel) {
    setBusy(false);
    feed.textContent = '';
    feed.appendChild(h('div', { class: 'state state--' + kind, role: kind === 'error' ? 'alert' : 'status' },
      h('span', { class: 'state__icon' }, W.icon(kind === 'error' ? 'info' : 'clipboard')),
      h('p', { class: 'state__title' }, title),
      h('p', { class: 'state__text' }, text),
      h('button', { type: 'button', class: 'btn btn--primary btn--sm', id: 'btn-retry', onclick: function () { load(true); } }, btnLabel)
    ));
  }

  function renderList(data) {
    setBusy(false);
    feed.textContent = '';

    // Kelompokkan per tanggal (data sudah terurut, jadi urutan grup ikut terbaru -> lama)
    var groups = [];
    data.items.forEach(function (a) {
      var last = groups[groups.length - 1];
      if (!last || last.date !== a.date) { last = { date: a.date, items: [] }; groups.push(last); }
      last.items.push(a);
    });

    groups.forEach(function (g) {
      feed.appendChild(h('section', null,
        h('h2', { class: 'group__title' }, groupLabel(g.date, data.today)),
        h('ul', { class: 'activity' }, g.items.map(function (a) {
          return h('li', { class: 'activity__row' },
            h('span', { class: 'activity__ini', 'aria-hidden': 'true' }, initials(a.name)),
            h('div', { class: 'activity__body' },
              h('p', { class: 'activity__name' }, a.name),
              h('p', { class: 'activity__desc' }, a.desc),
              h('p', { class: 'activity__time' }, a.time.replace(':', '.'))
            ),
            h('span', { class: 'pill ' + STATUS_PILL[a.status] }, a.label)
          );
        }))
      ));
    });
  }

  /* ---------- Alur muat data ---------- */
  function load(isRetry) {
    if (loading) return;
    loading = true;
    renderSkeleton();

    Promise.all([fetchActivities(), wait(MIN_SKELETON_MS)]).then(function (res) {
      var data = res[0];
      if (!data.items.length) {
        renderState('empty', 'Belum ada aktivitas', 'Aktivitas warga akan muncul di sini.', 'Muat ulang');
      } else {
        renderList(data);
        if (isRetry) W.toast('Aktivitas berhasil dimuat');
      }
    }).catch(function () {
      renderState('error', 'Gagal memuat data', 'Periksa koneksi Anda, lalu coba lagi.', 'Coba lagi ↻');
    }).then(function () { loading = false; });
  }

  load(false);
})();
