// Database Data Warga untuk Pop-up Detail
const databaseVerifikasi = {
    budi: { nama: "Budi Santoso", tgl: "22 September 2026", nominal: "Rp 20.000", sumber: "Tabungan BJB • 4417", ket: "Iuran 2 bulan", tagihan: "Agustus + September 2026" },
    natasya: { nama: "Natasya Cinta A.", tgl: "22 September 2026", nominal: "Rp 10.000", sumber: "BCA • 8821", ket: "Iuran 1 bulan", tagihan: "September 2026" },
    ali: { nama: "Muhammad Ali", tgl: "21 September 2026", nominal: "Rp 10.000", sumber: "Mandiri • 5510", ket: "Iuran 1 bulan", tagihan: "September 2026" },
    sri: { nama: "Sri Suaeni", tgl: "21 September 2026", nominal: "Rp 10.000", sumber: "BRI • 1129", ket: "Iuran 1 bulan", tagihan: "September 2026" },
    amadi: { nama: "Amadi", tgl: "20 September 2026", nominal: "Rp 10.000", sumber: "BSI • 3340", ket: "Iuran 1 bulan", tagihan: "September 2026" },
    lilik: { nama: "Lilik Iiati", tgl: "20 September 2026", nominal: "Rp 10.000", sumber: "BCA • 9012", ket: "Iuran 1 bulan", tagihan: "September 2026" },
    jackson: { nama: "Jackson", tgl: "19 September 2026", nominal: "Rp 30.000", sumber: "Permata • 4455", ket: "Iuran 3 bulan", tagihan: "Juli - September 2026" }
};

let selectedWargaKey = 'budi';

// Fungsi Membuka Modal Detail
function openModal(wargaKey) {
    selectedWargaKey = wargaKey;
    const data = databaseVerifikasi[wargaKey];
    if (data) {
        document.getElementById('modalSubHeader').textContent = `${data.nama} - ${data.tgl}`;
        document.getElementById('modalNominal').textContent = data.nominal;
        document.getElementById('valSumber').textContent = data.sumber;
        document.getElementById('valKeterangan').textContent = data.ket;
        document.getElementById('valNama').textContent = data.nama;
        document.getElementById('valTagihan').textContent = data.tagihan;
    }
    document.getElementById('detailModal').classList.add('active');
}

// Fungsi Klik Tombol Tolak
function actionTolak() {
    document.getElementById('detailModal').classList.remove('active');
    document.getElementById('rejectModal').classList.add('active');
}

// Fungsi Klik Tombol Verifikasi Sah
function actionSah() {
    document.getElementById('detailModal').classList.remove('active');
    document.getElementById('successModal').classList.add('active');
}

// Tutup Semua Modal
function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
}