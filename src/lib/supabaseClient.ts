import { createClient } from '@supabase/supabase-js';

// Hardcoded for frictionless automatic deployment when Bharath pulls the repo.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ppjfybdavvunijrwnzfu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwamZ5YmRhdnZ1bmlqcnduemZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3NjM5MzEsImV4cCI6MjA5MDMzOTkzMX0.eqqK8gt6kVqxGF2q7dB69Cy70DvAKJa8gVYd7t_pV3U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
