import { createClient } from '@supabase/supabase-js';

// Mengambil URL dan Key dari file .env.local yang sudah Anda buat
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Membuat instance / jembatan koneksi ke database Supabase Anda
export const supabase = createClient(supabaseUrl, supabaseAnonKey);