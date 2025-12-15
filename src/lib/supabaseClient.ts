import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // It's okay for dev if env vars aren't set yet — runtime will fail when used.
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Supabase client will be created with undefined keys.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export default supabase;
