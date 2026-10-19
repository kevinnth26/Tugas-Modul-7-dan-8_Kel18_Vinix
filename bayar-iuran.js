(function () {
  'use strict';
  var W = window.Warga;
  var $ = W.$, h = W.h;

  var TAGIHAN = 150000;
  var STATUS = {
    belum:    { label: 'Belum Dibayar',       pill: 'pill--red',   btn: 'Kirim Konfirmasi' },
    menunggu: { label: 'Menunggu Konfirmasi', pill: 'pill--amber', btn: 'Menunggu Verifikasi Pengurus' },
    terbayar: { label: 'Terbayar',            pill: 'pill--green', btn: 'Pembayaran Terverifikasi' }
  };

  // Page selalu mulai dari "belum". Untuk melihat satu status langsung,
  var DELAY_VERIFIKASI = 5000; // jeda simulasi (ms)
  var paramStatus = new URLSearchParams(location.search).get('status');
  var pinned = !!(paramStatus && STATUS[paramStatus]);
  var state = { status: pinned ? paramStatus : 'belum', fileName: '' };
  if (state.status !== 'belum') state.fileName = 'bukti-transfer.jpg';
  var verifTimer = null;

  var form = $('#form-iuran');
  var nominal = $('#i-nominal'), bukti = $('#i-bukti'), drop = $('#i-drop');
  var buktiFile = null;

  function render() {
    var meta = STATUS[state.status];
    var pill = $('#iuran-status');
    pill.textContent = meta.label;
    pill.className = 'pill ' + meta.pill;

    var locked = state.status !== 'belum';
    $('#btn-kirim-iuran').disabled = locked;
    $('#btn-kirim-label').textContent = meta.btn;
    nominal.readOnly = locked;
    drop.disabled = locked;

    var name = state.fileName;
    $('#i-drop-title').textContent = name ? name : 'Upload Bukti Transfer (Max 2MB)';
    $('#i-drop-sub').textContent = name ? (locked ? 'Bukti sudah dikirim' : 'Ketuk untuk mengganti file') : 'JPG, PNG, atau PDF';
  }

  function setStatus(status) {
    state.status = status;
    if (status === 'belum') {
      state.fileName = '';
      buktiFile = null;
      bukti.value = '';
      nominal.value = W.rupiah(TAGIHAN);
    } else if (!state.fileName) {
      state.fileName = 'bukti-transfer.jpg';
    }
    W.setError(W.fieldOf(nominal), $('#err-nominal'), '');
    W.setError(W.fieldOf(bukti), $('#err-bukti'), '');
    render();
  }

  // Format nominal otomatis: "Rp 150.000"
  nominal.addEventListener('input', function () {
    var digits = nominal.value.replace(/\D/g, '').slice(0, 10);
    nominal.value = digits ? W.rupiah(parseInt(digits, 10)) : '';
    W.setError(W.fieldOf(nominal), $('#err-nominal'), '');
  });

  // Upload bukti transfer
  W.bindDropzone(drop, bukti, function (file) {
    var msg = W.validateFile(file, ['image/jpeg', 'image/png', 'application/pdf'], 2 * 1024 * 1024,
      'Format bukti harus JPG, PNG, atau PDF.');
    W.setError(W.fieldOf(bukti), $('#err-bukti'), msg);
    if (msg || !file) { buktiFile = null; bukti.value = ''; return; }
    buktiFile = file;
    state.fileName = file.name;
    render();
  });

  // Kirim konfirmasi -> status Menunggu
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (state.status !== 'belum') return;
    var digits = parseInt(nominal.value.replace(/\D/g, '') || '0', 10);
    var nomMsg = !digits ? 'Nominal wajib diisi.' : digits < TAGIHAN ? 'Nominal minimal ' + W.rupiah(TAGIHAN) + '.' : '';
    var fileMsg = !buktiFile ? 'Bukti pembayaran wajib diunggah.' : '';
    W.setError(W.fieldOf(nominal), $('#err-nominal'), nomMsg);
    W.setError(W.fieldOf(bukti), $('#err-bukti'), fileMsg);
    if (nomMsg || fileMsg) return;
    setStatus('menunggu');
    W.toast('Konfirmasi terkirim. Menunggu verifikasi pengurus.');

    // Simulasi: pengurus memverifikasi setelah beberapa detik -> Terbayar.
    clearTimeout(verifTimer);
    verifTimer = setTimeout(function () {
      setStatus('terbayar');
      W.toast('Pembayaran terverifikasi oleh pengurus.');
    }, DELAY_VERIFIKASI);
  });

  // Salin nomor rekening
  $('#btn-copy').addEventListener('click', function () {
    var shown = $('#bank-no').textContent;
    var number = shown.replace(/\s/g, '');
    function done() { W.toast('Nomor rekening disalin: ' + shown); }
    function fallback() {
      var ta = h('textarea', { 'aria-hidden': 'true', style: 'position:fixed;opacity:0' });
      ta.value = number;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (err) { W.toast('Salin manual: ' + number); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(number).then(done, fallback);
    else fallback();
  });

  render();
})();