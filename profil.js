(function () {
  'use strict';
  var W = window.Warga;
  var HALAMAN_SIGN_IN = 'signin.html';

  // Tampilkan nama & inisial dari data pengguna tersimpan
  var user = W.getUser();
  W.$$('[data-bind="name"]').forEach(function (el) { el.textContent = user.name; });
  W.$$('[data-bind="initial"]').forEach(function (el) {
    el.textContent = (user.name.trim().charAt(0) || '?').toUpperCase();
  });

  // Sign Out
  W.$('#btn-signout').addEventListener('click', function () {
    W.openModal({
      icon: 'trash', tone: 'warn',
      title: 'Keluar dari akun ini?',
      text: 'Anda perlu masuk kembali untuk mengakses layanan warga.',
      actions: [
        { label: 'Batal', cls: 'btn--ghost' },
        {
          label: 'Sign Out', cls: 'btn--danger',
          onClick: function () {
            W.store.clear();
            location.href = HALAMAN_SIGN_IN;
          }
        }
      ]
    });
  });
})();