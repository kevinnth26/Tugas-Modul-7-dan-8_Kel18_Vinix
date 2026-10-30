# 🚀 RuangWarga - Modul 8: Data Dinamis & Logika Aplikasi

Selamat datang di repositori proyek **RuangWarga** untuk Modul 8. Pada tahap ini, kami telah menyulap prototipe UI statis dari Modul 7 menjadi aplikasi web fungsional dengan aliran data dinamis (Two-Way), sistem autentikasi, dan form interaktif.

## 🌿 Informasi Repositori & Git Workflow
Pengerjaan Modul 8 ini **masih menggunakan repositori yang sama** dengan tugas Modul 7 sebelumnya. Namun, untuk menjaga integritas dan keamanan kode versi sebelumnya:
* **Tugas Modul 7 (UI Statis):** Tersimpan aman di branch `main`.
* **Tugas Modul 8 (Data Dinamis):** Seluruh pengerjaan fitur, integrasi database, dan riwayat *commit* terbaru dilakukan secara terisolasi pada branch `feat/-dynamic-data`.
* **Keamanan Kredensial:** Seluruh API Key dan URL layanan pihak ketiga telah diamankan di dalam file `.env.local` dan dimasukkan ke `.gitignore`, sehingga tidak ikut terunggah (terekspos) ke GitHub publik.

## 🛠️ Stack Teknologi & Sumber Data
Dalam membangun fungsionalitas dan logika web ini, kami menggunakan beberapa teknologi utama:
* **Framework Frontend:** Next.js (React)
* **Sumber Data (Database) & Layanan Form (Auth):** **Supabase** (PostgreSQL). Kami menggunakan Supabase untuk menyimpan seluruh data relasional tabel aplikasi dan Supabase Authentication untuk menangani form *Sign Up* (Registrasi) serta *Sign In* (Login).
* **AI Assistant:** Google Gemini (Digunakan untuk membantu *troubleshooting* error, merancang skema relasi *Foreign Key* Supabase, dan menyuntikkan logika React Hooks tanpa merusak CSS statis).

## 👥 Pembagian Tugas (Database & Integrasi)
Sistem *database* telah dibagi dan dirancang ke dalam 7 tabel utama yang saling berelasi. Berikut adalah pembagian tugas pembuatan tabel dan fungsionalitasnya:
1. **`warga`** & **`anggota_keluarga`** — Dikerjakan oleh **Kevin**
2. **`inventaris`** & **`peminjaman`** — Dikerjakan oleh **Cinta**
3. **`keuangan_iuran`**, **`agenda_kegiatan`**, & **`pengaduan`** — Dikerjakan oleh **Aurora**

## 🧪 Panduan Pengujian (Untuk Mentor/Penguji)
Untuk melihat fungsionalitas Modul 8 yang telah berjalan 100%, mentor dapat mengikuti alur pengujian berikut pada Live Web kami:

1. **Autentikasi (Register & Login):**
   * Mulai dari halaman **Sign Up** untuk mencoba mendaftarkan akun baru (dilengkapi form validasi).
   * Lanjut ke halaman **Sign In** untuk masuk menggunakan akun yang baru saja dibuat. (Data profil akan otomatis masuk ke tabel `warga`).
2. **Navigasi Dinamis:**
   * Jelajahi halaman-halaman utama yang telah terhubung: *Panel Admin, Bayar Iuran, Katalog Inventaris, Jadwal Kegiatan, Arus Kas, dan Profile.*
3. **Uji Fitur Interaktif (Form & Data Read):**
   * Buka halaman **Data Warga**. Uji coba fitur **Pencarian (Search)** nama/alamat warga. Klik salah satu kartu warga untuk melihat *Dynamic Routing* ke halaman **Detail Keluarga**. Di halaman ini, *Loading Skeleton/State* dan data relasional antar tabel sudah berfungsi penuh.
   * Uji coba form **Pembayaran Iuran** dan **Peminjaman Inventaris** untuk melihat validasi input kosong, serta munculnya *Toast Notification* saat aksi berhasil.

## 🤖 Log Prompt AI (Rangkuman Penggunaan Gemini)
Selama pengerjaan Modul 8, kami menggunakan AI secara iteratif. Berikut adalah rangkuman esensi prompt yang kami gunakan:
1. *"Apakah tahapan pembuatan database warga dan anggota_keluarga di Supabase sudah sesuai dengan ketentuan modul 8?"* (Memvalidasi arsitektur database).
2. *"Bagaimana cara menyesuaikan tabel anggota keluarga dengan prototipe UI yang tidak ada kolom usia, melainkan NIK dan relasi foreign key ke tabel warga?"* (Menyempurnakan desain ERD).
3. *"Saya sudah membuat form Sign Up, tolong buatkan kode Next.js agar terhubung ke Supabase Auth sekaligus menyimpan data profil ke tabel warga, tapi tolong pertahankan struktur class HTML dan CSS lama saya agar desain tidak hancur."* (Prompt krusial untuk menjaga integrasi UI dan Logika).
4. *"Muncul error 'Failed to fetch' di tab Network dan status 429 'Email rate limit exceeded', bagaimana cara memperbaikinya?"* (Troubleshooting koneksi environment dan sistem rate-limiting Supabase).
5. *"Bantu saya menghubungkan halaman Data Warga agar stat-card kiri menghitung total data di tabel 'anggota_keluarga' dan stat-card kanan menghitung total 'warga' menggunakan state dan count exact Supabase."* (Mengoptimalkan efisiensi penarikan agregat data).

---
*Siap untuk tahap Usability Testing di Modul 9!*