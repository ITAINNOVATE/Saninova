import { createClient } from "@supabase/supabase-js";

// Provide robust hardcoded fallbacks using the project's public/anon keys
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eqqdjqdbbwmshllqesdt.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_WWWI-B3hA2eo3lBLGlizyg_4w0Me1Fw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
