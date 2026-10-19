(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <symbol id="i-chevron" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
    <symbol id="i-back" viewBox="0 0 24 24"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></symbol>
    <symbol id="i-user" viewBox="0 0 24 24"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>
    <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-6h6v6"/></symbol>
    <symbol id="i-box" viewBox="0 0 24 24"><path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5"/><path d="M12 13v8"/></symbol>
    <symbol id="i-trash" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></symbol>
    <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></symbol>
    <symbol id="i-eye-off" viewBox="0 0 24 24"><path d="M3 3l18 18"/><path d="M6.6 6.6A17 17 0 0 0 2 12s3.5 7 10 7a10 10 0 0 0 4-.8"/><path d="M10.6 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></symbol>
    <symbol id="i-upload" viewBox="0 0 24 24"><path d="M20 16.5A4.5 4.5 0 0 0 17.5 8h-1.3A7 7 0 1 0 4 14.9"/><path d="M12 12v9"/><path d="m8 16 4-4 4 4"/></symbol>
    <symbol id="i-help" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7"/><path d="M12 17h.01"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></symbol>
    <symbol id="i-copy" viewBox="0 0 24 24"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></symbol>
    <symbol id="i-send" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></symbol>
    <symbol id="i-bank" viewBox="0 0 24 24"><path d="M3 10 12 4l9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8"/><path d="M3 21h18"/></symbol>
    <symbol id="i-clipboard" viewBox="0 0 24 24"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9z"/><path d="m9 14 2 2 4-4"/></symbol>
    <symbol id="i-receipt" viewBox="0 0 24 24"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/></symbol>
    <symbol id="i-arrow-in" viewBox="0 0 24 24"><path d="M17 7 7 17"/><path d="M17 17H7V7"/></symbol>
    <symbol id="i-arrow-out" viewBox="0 0 24 24"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></symbol>
    <symbol id="i-wallet" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18"/><path d="M7 3h10"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></symbol>
    <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
    <symbol id="i-image" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m21 16-5-5-8 8"/></symbol>
  </defs>
</svg>`;
  var SHELL = `<!-- Modal -->
<div class="layer layer--modal" id="modal-layer" aria-hidden="true">
  <div class="layer__bg" data-close></div>
  <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1"></div>
</div>

<!-- Toast -->
<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>`;

  /* ---------- Utilitas DOM ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function h(tag, attrs) {
    var el = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v == null) return;
      if (k === 'class') el.className = v;
      else if (k.indexOf('on') === 0) el.addEventListener(k.slice(2), v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function append(el, kid) {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) { kid.forEach(function (k) { append(el, k); }); return; }
    el.appendChild(kid.nodeType ? kid : document.createTextNode(String(kid)));
  }
  function icon(name) {
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'i');
    svg.setAttribute('aria-hidden', 'true');
    var use = document.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', '#i-' + name);
    svg.appendChild(use);
    return svg;
  }

  /* ---------- Format & penyimpanan ---------- */
  function rupiah(n) {
    return 'Rp ' + String(Math.abs(Math.round(n))).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  var store = {
    get: function (key, fallback) {
      try {
        var raw = window.localStorage.getItem('RuangWarga:' + key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem('RuangWarga:' + key, JSON.stringify(value)); } catch (e) { /* abaikan */ }
    },
    clear: function () {
      try {
        Object.keys(window.localStorage).forEach(function (k) {
          if (k.indexOf('RuangWarga:') === 0) window.localStorage.removeItem(k);
        });
      } catch (e) { /* abaikan */ }
    }
  };

  var DEFAULT_USER = { name: 'Budi Santoso', email: 'budi.santoso@surat.id' };
  function getUser() { return store.get('user', DEFAULT_USER); }
  function setUser(user) { store.set('user', user); }

  /* ---------- Error field ---------- */
  function setError(fieldEl, errEl, message) {
    if (fieldEl) fieldEl.classList.toggle('has-error', !!message);
    if (errEl) errEl.textContent = message || '';
  }
  function fieldOf(input) { return input.closest('.field'); }

  /* ---------- Sisipkan sprite ikon & komponen global ---------- */
  document.body.insertAdjacentHTML('afterbegin', SPRITE);
  document.body.insertAdjacentHTML('beforeend', SHELL);

  var modalLayer = $('#modal-layer');
  var modalEl = $('#modal');
  var toastEl = $('#toast');
  var lastFocus = null;
  var modalTimer = null;
  var modalOnClose = null;
  var toastTimer = null;

  /* ---------- Modal ---------- */
  function openModal(opts) {
    clearTimeout(modalTimer);
    lastFocus = document.activeElement;
    modalOnClose = opts.onClose || null;
    modalEl.textContent = '';

    var badgeCls = 'modal__badge' + (opts.tone === 'warn' ? ' modal__badge--warn' : '');
    modalEl.appendChild(h('div', { class: badgeCls }, icon(opts.icon || 'check')));
    modalEl.appendChild(h('p', { class: 'modal__title', id: 'modal-title' }, opts.title));
    if (opts.text) modalEl.appendChild(h('p', { class: 'modal__text' }, opts.text));
    if (opts.content) modalEl.appendChild(opts.content);
    if (opts.actions && opts.actions.length) {
      modalEl.appendChild(h('div', { class: 'modal__actions' }, opts.actions.map(function (a) {
        return h('button', {
          type: 'button',
          class: 'btn btn--sm ' + (a.cls || 'btn--ghost'),
          onclick: function () { if (a.onClick) a.onClick(); if (a.close !== false) closeModal(); }
        }, a.label);
      })));
    }
    modalLayer.classList.add('is-open');
    modalLayer.setAttribute('aria-hidden', 'false');
    modalEl.focus();
    if (opts.autoClose) modalTimer = setTimeout(closeModal, opts.autoClose);
  }

  function closeModal() {
    if (!modalLayer.classList.contains('is-open')) return;
    clearTimeout(modalTimer);
    modalLayer.classList.remove('is-open');
    modalLayer.setAttribute('aria-hidden', 'true');
    var cb = modalOnClose;
    modalOnClose = null;
    if (lastFocus && typeof lastFocus.focus === 'function') {
      try { lastFocus.focus({ preventScroll: true }); } catch (e) { /* abaikan */ }
    }
    if (cb) cb();
  }

  /* ---------- Toast ---------- */
  function toast(message) {
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.hidden = false;
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2400);
  }

  /* ---------- Upload file ---------- */
  function validateFile(file, types, maxBytes, typeMsg) {
    if (!file) return '';
    if (types.indexOf(file.type) === -1) return typeMsg;
    if (file.size > maxBytes) return 'Ukuran file melebihi 2 MB (' + (file.size / 1048576).toFixed(1) + ' MB).';
    return '';
  }
  function bindDropzone(zone, input, onFile) {
    zone.addEventListener('click', function () { if (!zone.disabled) input.click(); });
    input.addEventListener('change', function () { onFile(input.files && input.files[0]); });
    ['dragenter', 'dragover'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) { e.preventDefault(); if (!zone.disabled) zone.classList.add('is-drag'); });
    });
    ['dragleave', 'drop'].forEach(function (ev) {
      zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.remove('is-drag'); });
    });
    zone.addEventListener('drop', function (e) {
      if (zone.disabled) return;
      var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) onFile(f);
    });
  }

  /* ---------- Binding global ---------- */
  $$('[data-close]', modalLayer).forEach(function (el) { el.addEventListener('click', closeModal); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeModal();
  });

  window.Warga = {
    $: $, $$: $$, h: h, icon: icon, rupiah: rupiah, store: store,
    DEFAULT_USER: DEFAULT_USER, getUser: getUser, setUser: setUser,
    setError: setError, fieldOf: fieldOf,
    openModal: openModal, closeModal: closeModal, toast: toast,
    validateFile: validateFile, bindDropzone: bindDropzone
  };
})();