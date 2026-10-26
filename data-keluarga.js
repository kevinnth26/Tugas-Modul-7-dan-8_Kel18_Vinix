// Database Lengkap Data Keluarga untuk 7 Warga
const databaseKeluarga = {
    andi: {
        inisial: "AP",
        nama: "Andi Pratama",
        alamat: "Jl. Garuda VI No. 31",
        telepon: "0821 3184 3044",
        anggota: [
            { nama: "Andi Pratama", nik: "3578••••••••0001", status: "Kepala keluarga", jk: "Laki-laki" },
            { nama: "Sari Wulandari", nik: "3578••••••••0002", status: "Istri", jk: "Perempuan" },
            { nama: "Rizky Pratama", nik: "3578••••••••0003", status: "Anak", jk: "Laki-laki" },
            { nama: "Nadia Putri Pratama", nik: "3578••••••••0004", status: "Anak", jk: "Perempuan" }
        ]
    },
    bambang: {
        inisial: "BS",
        nama: "Bambang Susanto",
        alamat: "Jl. Garuda VII No. 12",
        telepon: "0812 8841 2330",
        anggota: [
            { nama: "Bambang Susanto", nik: "3578••••••••0010", status: "Kepala keluarga", jk: "Laki-laki" },
            { nama: "Siti Aminah", nik: "3578••••••••0011", status: "Istri", jk: "Perempuan" },
            { nama: "Dimas Susanto", nik: "3578••••••••0012", status: "Anak", jk: "Laki-laki" }
        ]
    },
    dewi: {
        inisial: "DN",
        nama: "Dewi Ningsih",
        alamat: "Jl. Merdeka VI No. 21",
        telepon: "0812 7712 3401",
        anggota: [
            { nama: "Dewi Ningsih", nik: "3578••••••••0020", status: "Kepala keluarga", jk: "Perempuan" },
            { nama: "Budi Santoso", nik: "3578••••••••0021", status: "Suami", jk: "Laki-laki" }
        ]
    },
    fajar: {
        inisial: "FA",
        nama: "Fajar Aditya",
        alamat: "Jl. Garuda VI No. 16",
        telepon: "0813 4120 0892",
        anggota: [
            { nama: "Fajar Aditya", nik: "3578••••••••0030", status: "Kepala keluarga", jk: "Laki-laki" },
            { nama: "Rina Marlina", nik: "3578••••••••0031", status: "Istri", jk: "Perempuan" }
        ]
    },
    siti: {
        inisial: "SR",
        nama: "Siti Rahma",
        alamat: "Jl. Merdeka VII No. 16",
        telepon: "0888 0563 7589",
        anggota: [
            { nama: "Siti Rahma", nik: "3578••••••••0040", status: "Kepala keluarga", jk: "Perempuan" },
            { nama: "Ahmad Fauzi", nik: "3578••••••••0041", status: "Suami", jk: "Laki-laki" }
        ]
    },
    yani: {
        inisial: "YK",
        nama: "Yani Kurniawan",
        alamat: "Jl. Garuda VI No. 14",
        telepon: "0813 2245 6701",
        anggota: [
            { nama: "Yani Kurniawan", nik: "3578••••••••0050", status: "Kepala keluarga", jk: "Laki-laki" },
            { nama: "Fitri Handayani", nik: "3578••••••••0051", status: "Istri", jk: "Perempuan" },
            { nama: "Zidan Kurniawan", nik: "3578••••••••0052", status: "Anak", jk: "Laki-laki" },
            { nama: "Zahra Kurniawan", nik: "3578••••••••0053", status: "Anak", jk: "Perempuan" }
        ]
    },
    wawan: {
        inisial: "WW",
        nama: "Wawan Wirhayu",
        alamat: "Jl. Garuda V No. 08",
        telepon: "0812 9987 1122",
        anggota: [
            { nama: "Wawan Wirhayu", nik: "3578••••••••0060", status: "Kepala keluarga", jk: "Laki-laki" },
            { nama: "Ratna Sari", nik: "3578••••••••0061", status: "Istri", jk: "Perempuan" },
            { nama: "Gilang Wirhayu", nik: "3578••••••••0062", status: "Anak", jk: "Laki-laki" }
        ]
    }
};

// Ambil parameter ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const wargaId = urlParams.get('id') || 'andi';

// Muat data ke halaman HTML
const dataKeluarga = databaseKeluarga[wargaId];

if (dataKeluarga) {
    document.getElementById('profileAvatar').textContent = dataKeluarga.inisial;
    document.getElementById('profileName').textContent = dataKeluarga.nama;
    document.getElementById('profileAddress').textContent = `${dataKeluarga.alamat} • ${dataKeluarga.anggota.length} Anggota`;
    document.getElementById('profilePhone').textContent = dataKeluarga.telepon;

    let memberListContainer = document.getElementById('memberList');
    memberListContainer.innerHTML = '';

    dataKeluarga.anggota.forEach(member => {
        let card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <div class="member-row">
                <span class="label">Nama Lengkap</span>
                <span class="value bold">${member.nama}</span>
            </div>
            <div class="member-row">
                <span class="label">NIK</span>
                <span class="value nik">${member.nik}</span>
            </div>
            <div class="member-row">
                <span class="label">Status Hubungan Dalam Keluarga</span>
                <span class="value">${member.status}</span>
            </div>
            <div class="member-row">
                <span class="label">Jenis Kelamin</span>
                <span class="value">${member.jk}</span>
            </div>
        `;
        memberListContainer.appendChild(card);
    });
}

// Fungsi Tombol Aksi
function triggerAdminAction() {
    showToast(`${dataKeluarga.nama} berhasil dijadikan Admin!`);
}

function triggerKKAction() {
    showToast(`Membuka dokumen KK ${dataKeluarga.nama}...`);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}