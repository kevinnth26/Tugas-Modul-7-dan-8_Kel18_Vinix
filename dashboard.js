(function () {
  'use strict';
  var W = window.Warga;
  var $ = W.$, h = W.h;

  var DEFAULT_ACTIVITIES = [
    { id: 1, ini: 'SR', name: 'Siti Rahma',    desc: 'Membayar iuran September', time: '10 menit lalu',  status: 'bayar',   label: 'Rp 150.000' },
    { id: 2, ini: 'AP', name: 'Andi Pratama',  desc: 'Meminjam Tenda',           time: '35 menit lalu',  status: 'pending', label: 'Menunggu' },
    { id: 3, ini: 'DN', name: 'Dewi Ningsih',  desc: 'Mengembalikan 10 Kursi',   time: 'Kemarin, 16.20', status: 'done',    label: 'Selesai' },
    { id: 4, ini: 'BS', name: 'Bambang S.',    desc: 'Membayar iuran Oktober',   time: 'Kemarin, 09.10', status: 'bayar',   label: 'Rp 150.000' },
    { id: 5, ini: 'LM', name: 'Lilis Marlina', desc: 'Meminjam Sound System',    time: '2 hari lalu',    status: 'pending', label: 'Menunggu' },
    { id: 6, ini: 'FH', name: 'Faisal H.',     desc: 'Membayar iuran September', time: '3 hari lalu',    status: 'bayar',   label: 'Rp 150.000' }
  ];
  var activities = W.store.get('activities', null) || DEFAULT_ACTIVITIES;

  function pillClass(status) { return status === 'pending' ? 'pill--amber' : 'pill--green'; }

  function render() {
    var first = W.getUser().name.trim().split(/\s+/)[0] || 'Warga';
    $('#greeting').textContent = 'Selamat pagi, Pak ' + first;

    var list = $('#activity-list');
    list.textContent = '';
    activities.slice(0, 4).forEach(function (a) {
      list.appendChild(h('li', null,
        h('span', { class: 'activity__ini' }, a.ini),
        h('div', { class: 'activity__body' },
          h('p', { class: 'activity__name' }, a.name),
          h('p', { class: 'activity__desc' }, a.desc),
          h('p', { class: 'activity__time' }, a.time)
        ),
        h('span', { class: 'pill ' + pillClass(a.status) }, a.label)
      ));
    });

    var pending = activities.filter(function (a) { return a.status === 'pending'; }).length;
    var badge = $('#pending-count');
    badge.textContent = pending;
    badge.hidden = pending === 0;
  }

  render();
})();