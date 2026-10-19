[readme_file.md](https://github.com/user-attachments/files/33668366/readme_file.md)
# 🏛️ RuangWarga - Prototipe Web Manajemen RT (Vinix 7 / Kelompok 18)

RuangWarga adalah aplikasi manajemen lingkungan RT berbasis web interaktif yang dikembangkan untuk memfasilitasi pencatatan iuran digital, transparansi arus kas bulanan, dan automasi peminjaman inventaris warga secara mandiri. Prototipe ini ditransformasikan dari desain Figma Modul 5 menjadi aplikasi web dengan arsitektur terdekopel (decoupled) berstruktur HTML, CSS, dan JS terpisah untuk tiap halaman.

---

## 🔗 Tautan Resmi Proyek

* **Figma Design Prototype (Modul 5):** [Prototype RuangWarga Kelompok 18](https://www.figma.com/design/AcoVK6aUb7wdghGfbNy8Ij/Prototype-Ruang-Warga_Kel-18?node-id=0-1&t=RLDFQSvqDLuF3pkF-1)
* **Repositori Publik GitHub:** [Tugas-Modul-7_Kel-18_Vinix](https://github.com/kevinnth26/Tugas-Modul-7_Kel-18_Vinix.git)

---

## 👥 Pembagian Kontribusi Anggota Kelompok

Pengembangan 16 fitur utama Minimum Viable Product (MVP) RuangWarga dibagi secara terstruktur di antara 3 anggota kelompok:

| Anggota Kelompok | Fitur MVP & Halaman Web yang Dikerjakan | Detail File Codebase |
| :--- | :--- | :--- |
| **Kevin Nathanael Hashalom** | **1. Log In**<br>**2. Register**<br>**3. Dashboard**<br>**4. Detail Jadwal Kegiatan**<br>**5. Katalog Inventaris** (Semua, Tersedia, Dipinjam)<br>**6. Form Peminjaman** | `signin.html`, `signin.css`, `signin.js`<br>`signup.html`, `signup.css`, `signup.js`<br>`index.html`, `index.css`, `index.js`<br>`jadwal.html`, `jadwal.css`, `jadwal.js`<br>`katalog.html`, `katalog-tersedia.html`, `katalog-dipinjam.html`, `katalog.css`, `katalog.js`<br>`form-peminjaman.html`, `form-peminjaman.css`, `form-peminjaman.js` |
| **Aurora Pricilia Radianto Putri** | **7. Page Bayar Iuran**<br>**8. Riwayat Kas Warga**<br>**9. Profil**<br>**10. Detail Profil**<br>**11. Pengaduan**<br>**12. Dashboard Admin** | `bayar-iuran.html`, `bayar-iuran.css`, `bayar-iuran.js`<br>`riwayat-kas.html`, `riwayat-kas.css`, `riwayat-kas.js`<br>`profil.html`, `profil.css`, `profil.js`<br>`detail-profil.html`, `detail-profil.css`, `detail-profil.js`<br>`pengaduan.html`, `pengaduan.css`, `pengaduan.js`<br>`dashboard-admin.html`, `dashboard-admin.css`, `dashboard-admin.js` |
| **Natasya Cinta Aulia** | **13. Approval Peminjaman (Admin)**<br>**14. Manajemen Keuangan (Admin)**<br>**15. Verifikasi Iuran (Admin)**<br>**16. Data Warga & Keluarga (Admin)** | `approval-peminjaman.html`, `approval-peminjaman.css`, `approval-peminjaman.js`<br>`manajemen-keuangan.html`, `manajemen-keuangan.css`, `manajemen-keuangan.js`<br>`verifikasi-iuran.html`, `verifikasi-iuran.css`, `verifikasi-iuran.js`<br>`data-warga.html`, `data-keluarga.html`, `data-warga.css`, `data-warga.js` |

---

## 🛠️ Cara Menjalankan Proyek di Komputer Lokal

Aplikasi ini dibangun menggunakan arsitektur web modern tanpa dependensi *framework* berat, sehingga sangat ringan dan cepat dijalankan secara lokal.

### Prasyarat
* Teks editor **VS Code (Visual Studio Code)**.
* Ekstensi **Live Server** pada VS Code.

### Langkah-Langkah Pengoperasian
1. **Kloning Repositori GitHub**
   Buka terminal/command prompt dan jalankan perintah:
   ```bash
   git clone https://github.com/kevinnth26/Tugas-Modul-7_Kel-18_Vinix.git
   cd Tugas-Modul-7_Kel-18_Vinix
   ```

2. **Membuka Folder di VS Code**
   * Buka VS Code.
   * Pilih menu **File > Open Folder...** (atau tekan `Ctrl + K` `Ctrl + O`).
   * Pilih folder utama proyek (`Tugas-Modul-7_Kel-18_Vinix`).
   * *Penting:* Jangan membuka file secara terpisah satu per satu agar tidak mengalami masalah status *read-only*.

3. **Menjalankan Prototipe via Live Server**
   * Cari dan buka file `signin.html` atau `index.html`.
   * Klik kanan pada area editor kode, lalu pilih **Open with Live Server** (atau klik tombol *Go Live* di pojok kanan bawah VS Code).
   * Web browser akan otomatis terbuka di alamat lokal `http://127.0.0.1:5500/signin.html`.

---

## 📁 Arsitektur Codebase (Decoupled Structure)

Kode sumber dikembangkan dengan prinsip **Decoupled Architecture**, di mana setiap halaman HTML memiliki file CSS khusus untuk penataan gaya visual dan file JS terpisah untuk alur interaktivitas:

```text
Tugas-Modul-7_Kel-18_Vinix/
├── images/                   # Folder aset gambar & ikon inventaris
│   ├── kursi-lipat.jpg
│   ├── meja-panjang.jpg
│   └── ...
├── PRD.md                    # Product Requirements Document
├── README.md                 # Dokumentasi utama repositori
├── signin.html               # 1. Halaman Login
├── signin.css
├── signin.js
├── signup.html               # 2. Halaman Register
├── signup.css
├── signup.js
├── index.html                # 3. Dashboard Warga
├── index.css
├── index.js
├── jadwal.html               # 4. Detail Jadwal Kegiatan
├── jadwal.css
├── jadwal.js
├── katalog.html              # 5. Katalog Inventaris (Semua)
├── katalog-tersedia.html     # Katalog (Filter Tersedia)
├── katalog-dipinjam.html     # Katalog (Filter Dipinjam)
├── katalog.css
├── katalog.js
├── form-peminjaman.html      # 6. Form Peminjaman Aset
├── form-peminjaman.css
├── form-peminjaman.js
├── bayar-iuran.html          # 7. Page Bayar Iuran
├── bayar-iuran.css
├── bayar-iuran.js
├── riwayat-kas.html          # 8. Riwayat Kas Warga
├── riwayat-kas.css
├── riwayat-kas.js
├── profil.html               # 9. Profil Warga
├── profil.css
├── profil.js
├── detail-profil.html        # 10. Detail Profil & Ubah Sandi
├── detail-profil.css
├── detail-profil.js
├── pengaduan.html            # 11. Form Pengaduan Warga
├── pengaduan.css
├── pengaduan.js
├── dashboard-admin.html      # 12. Dashboard Admin
├── dashboard-admin.css
├── dashboard-admin.js
├── approval-peminjaman.html  # 13. Approval Peminjaman (Admin)
├── approval-peminjaman.css
├── approval-peminjaman.js
├── manajemen-keuangan.html   # 14. Manajemen Keuangan (Admin)
├── manajemen-keuangan.css
├── manajemen-keuangan.js
├── verifikasi-iuran.html     # 15. Verifikasi Iuran (Admin)
├── verifikasi-iuran.css
├── verifikasi-iuran.js
├── data-warga.html           # 16. Data Warga & Keluarga (Admin)
├── data-keluarga.html
├── data-warga.css
└── data-warga.js
```

---

## 🤖 Log Prompt AI & Perbaikan Iteratif (AI-Assisted Prototyping)

Proses pembuatan kode HTML, CSS, dan JS untuk 16 halaman ini dikembangkan menggunakan bantuan AI dengan metodologi *Prompt-to-Code* yang terkontrol dan terstruktur.

### Phase 1: Pengkodingan Struktur & Dekopel (HTML/CSS/JS)
* **Prompt 1 (Generasi Kode Terdekopel Halaman Login & Signup):**
  > *"Buatkan struktur terpisah (HTML, CSS, dan JS terpisah) untuk halaman Sign In (`signin.html`) dan Sign Up (`signup.html`) aplikasi RuangWarga. Ikuti persis mockup Figma Modul 5 dengan pembungkus mobile (centered wrapper) warna latar belakang `#1A365D`, tombol `#1A365D`, dan input bergaya rounded."*
* **Output AI:** Dihasilkan file HTML, CSS, dan JS terdekopel untuk modul otentikasi awal.
* **Prompt 2 (Generasi Dashboard & Jadwal):**
  > *"Buatkan file HTML, CSS, dan JS terpisah untuk Dashboard Warga (`index`) dan Detail Jadwal Kegiatan (`jadwal`). Tampilkan saldo kas RT, tombol akses cepat, ringkasan aktivitas, dan komponen calendar picker."*
* **Prompt 3 (Generasi Katalog 3 Tab & Form Peminjaman):**
  > *"Buatkan struktur terdekopel untuk Katalog Inventaris dengan 3 sub-halaman filter (`katalog.html`, `katalog-tersedia.html`, `katalog-dipinjam.html`) serta Form Peminjaman (`form-peminjaman.html`). Pastikan tab navigasi dapat berpindah antar file secara seamless."*
* **Prompt 4 (Generasi Modul Keuangan & Pengaduan Warga):**
  > *"Buatkan file terdekopel untuk Bayar Iuran (`bayar-iuran`), Riwayat Kas (`riwayat-kas`), Profil (`profil`), Detail Profil (`detail-profil`), dan Pengaduan (`pengaduan`). Tambahkan fitur komponen upload bukti transfer dan status tiket."*
* **Prompt 5 (Generasi Modul Admin & Approval):**
  > *"Buatkan file terdekopel untuk Dashboard Admin, Approval Peminjaman, Manajemen Keuangan Admin, Verifikasi Iuran, serta Data Warga & Keluarga. Desain disesuaikan untuk antarmuka pengurus RT."*

---

### Phase 2: Log Prompt Revisi & Troubleshooting

#### 1. Revisi Routing Prototipe & Validasi Form
* **Prompt Revisi:**
  > *"Pada form Sign In dan Sign Up, hapus atribut `required` pada elemen `<input>` agar pengguna/penguji dapat langsung menekan tombol 'Masuk' atau 'Daftar' untuk berpindah halaman tanpa terhambat validasi input kosong."*
* **Perbaikan Kode:** AI memperbarui file `signin.html` dan `signup.html` dengan menghapus atribut `required` dan memastikan event listener JavaScript menggunakan `window.location.href` untuk mengarahkan rute secara instan.

#### 2. Revisi Tampilan Gambar Inventaris (Asset Replacement)
* **Prompt Revisi:**
  > *"Di file `katalog.html` dan CSS-nya, ganti elemen placeholder `<div class="card-img" style="background-color: #D1D5DB;"></div>` dengan tag `<img>` asli agar foto inventaris (kursi, meja, speaker, tenda) tampil presisi."*
* **Perbaikan Kode:**
  * Tag HTML diubah menjadi `<img src="images/kursi-lipat.jpg" alt="Kursi Lipat" class="card-img">`.
  * CSS `.card-img` diperbarui menjadi:
    ```css
    .card-img {
      height: 100px;
      width: 100%;
      object-fit: cover;
      display: block;
    }
    ```

#### 3. Perbaikan Masalah Status Read-Only VS Code
* **Masalah:** Saat membuka file `.js` secara individual, muncul indikator gembok (*read-only*) yang membuat kode tidak dapat diedit.
* **Instruksi Solusi AI:** Menjelaskan bahwa file tidak boleh dibuka satu per satu (*single-file preview mode*). Pengguna diarahkan untuk membuka seluruh struktur folder proyek melalui **File > Open Folder...** di VS Code.

#### 4. Penyesuaian Centered Mobile Frame untuk Desktop Preview
* **Prompt Revisi:**
  > *"Pastikan tampilan mobile wrapper berada tepat di tengah layar pada viewport desktop, hapus komponen status bar mobile (baterai/jam/sinyal) agar tampilan konsisten dengan prototipe web."*
* **Perbaikan Kode:** Menyesuaikan CSS utama dengan wrapper penyeimbang:
  ```css
  .mobile-container {
    max-width: 414px;
    margin: 0 auto;
    min-height: 100vh;
    background-color: #F8FAFC;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  ```
