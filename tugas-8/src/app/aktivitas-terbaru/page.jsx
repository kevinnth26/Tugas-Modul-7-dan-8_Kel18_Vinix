import { redirect } from "next/navigation";

// Link "Lihat semua" di Dashboard Admin mengarah ke /aktivitas-terbaru.
// Halaman aslinya ada di /aktivitas-baru, jadi dialihkan di sini (dashboard tidak perlu diubah).
export default function AktivitasTerbaru() {
  redirect("/aktivitas-baru");
}
