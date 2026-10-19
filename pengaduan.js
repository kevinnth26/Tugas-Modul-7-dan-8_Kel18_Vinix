(function () {
  'use strict';
  var W = window.Warga;
  var $ = W.$;

  var form = $('#form-pengaduan');
  var desc = $('#p-deskripsi'), foto = $('#p-foto'), drop = $('#p-drop');
  var previewUrl = '';

  function setFile(file) {
    var errEl = $('#err-foto'), field = W.fieldOf(foto);
    var msg = W.validateFile(file, ['image/jpeg', 'image/png'], 2 * 1024 * 1024, 'Format foto harus JPG atau PNG.');
    if (previewUrl) { URL.revokeObjectURL(previewUrl); previewUrl = ''; }
    if (msg || !file) {
      foto.value = '';
      $('#p-drop-empty').hidden = false;
      $('#p-drop-preview').hidden = true;
      W.setError(field, errEl, msg);
      return;
    }
    previewUrl = URL.createObjectURL(file);
    $('#p-preview-img').src = previewUrl;
    $('#p-preview-name').textContent = file.name;
    $('#p-drop-empty').hidden = true;
    $('#p-drop-preview').hidden = false;
    W.setError(field, errEl, '');
  }

  function reset() {
    desc.value = '';
    setFile(null);
    W.setError(W.fieldOf(desc), $('#err-deskripsi'), '');
  }

  W.bindDropzone(drop, foto, setFile);

  // Hapus foto yang sudah dipilih
  var rm = $('#p-remove');
  function remove(e) { e.stopPropagation(); e.preventDefault(); setFile(null); }
  rm.addEventListener('click', remove);
  rm.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') remove(e); });

  desc.addEventListener('input', function () { W.setError(W.fieldOf(desc), $('#err-deskripsi'), ''); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = desc.value.trim();
    var msg = !text ? 'Deskripsi kejadian wajib diisi.'
      : text.length < 10 ? 'Jelaskan minimal 10 karakter agar pengurus paham.' : '';
    W.setError(W.fieldOf(desc), $('#err-deskripsi'), msg);
    if (msg) { desc.focus(); return; }
    if ($('#err-foto').textContent) return;

    W.openModal({
      icon: 'check',
      title: 'Laporan Berhasil Dikirim',
      text: 'Pengurus akan menindaklanjuti laporan Anda.',
      autoClose: 2400,
      actions: [{ label: 'Tutup', cls: 'btn--primary' }],
      onClose: function () { reset(); location.href = 'profil.html'; }
    });
  });
})();