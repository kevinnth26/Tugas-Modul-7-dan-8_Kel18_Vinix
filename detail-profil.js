(function () {
  'use strict';
  var W = window.Warga;
  var $ = W.$;

  var form = $('#form-profil');
  var fNama = $('#f-nama'), fEmail = $('#f-email'), fLama = $('#f-sandi-lama'), fBaru = $('#f-sandi-baru');
  var inputs = [fNama, fEmail, fLama, fBaru];
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function errOf(input) { return $('#err-' + input.id.replace('f-', '')); }

  var user = W.getUser();
  fNama.placeholder = user.name;
  fEmail.placeholder = user.email;

  // Tampil / sembunyikan sandi
  function setPasswordVisible(btn, visible) {
    var input = document.getElementById(btn.getAttribute('data-toggle'));
    if (!input) return;
    input.type = visible ? 'text' : 'password';
    btn.setAttribute('aria-pressed', String(visible));
    btn.querySelector('use').setAttribute('href', visible ? '#i-eye-off' : '#i-eye');
  }
  W.$$('[data-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setPasswordVisible(btn, btn.getAttribute('aria-pressed') !== 'true');
    });
  });

  // Hapus pesan error saat pengguna mengetik
  inputs.forEach(function (inp) {
    inp.addEventListener('input', function () { W.setError(W.fieldOf(inp), errOf(inp), ''); });
  });

  function validate() {
    var ok = true;
    function check(input, msg) {
      W.setError(W.fieldOf(input), errOf(input), msg);
      if (msg) ok = false;
    }
    var nama = fNama.value.trim();
    var email = fEmail.value.trim();
    check(fNama, nama && nama.length < 3 ? 'Nama minimal 3 karakter.' : '');
    check(fEmail, email && !EMAIL_RE.test(email) ? 'Format email belum benar.' : '');
    check(fLama, !fLama.value ? 'Sandi lama wajib diisi.' : '');
    check(fBaru, !fBaru.value ? 'Sandi baru wajib diisi.'
      : fBaru.value.length < 8 ? 'Sandi baru minimal 8 karakter.'
      : fBaru.value === fLama.value ? 'Sandi baru tidak boleh sama dengan sandi lama.' : '');
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) {
      var firstBad = $('.has-error input', form);
      if (firstBad) firstBad.focus();
      return;
    }
    W.setUser({ name: fNama.value.trim() || user.name, email: fEmail.value.trim() || user.email });
    fLama.value = '';
    fBaru.value = '';

    // Pop-up hanya muncul setelah SEMUA field valid dan tombol "Simpan Perubahan" ditekan.
    W.openModal({
      icon: 'check',
      title: 'Perubahan Berhasil Disimpan',
      autoClose: 2200,
      actions: [{ label: 'Tutup', cls: 'btn--primary' }],
      onClose: function () { location.href = 'profil.html'; }
    });
  });
})();