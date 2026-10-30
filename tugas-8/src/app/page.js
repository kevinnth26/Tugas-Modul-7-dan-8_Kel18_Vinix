import { redirect } from 'next/navigation';

export default function Home() {
  // Otomatis mengarahkan pengunjung dari root "/" ke halaman "/signin"
  redirect('/signin');
}