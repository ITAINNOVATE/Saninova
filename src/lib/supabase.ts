import { createClient } from "@supabase/supabase-js";

const TARGET_URL = "https://bkwspibjypklsrbvyfrn.supabase.co";
const TARGET_KEY = "sb_publishable_Tdk6wZWQ6S5HrDVeho3boQ_vmtwP6LZ";

// Force la nouvelle base bkwspibjypklsrbvyfrn si la variable d'environnement Vercel/hébergeur a encore l'ancienne base
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseUrl = (!envUrl || envUrl.includes("eqqdjqdbbwmshllqesdt")) ? TARGET_URL : envUrl;

const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseAnonKey = (!envKey || supabaseUrl === TARGET_URL) ? TARGET_KEY : envKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

