import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://bkwspibjypklsrbvyfrn.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_Tdk6wZWQ6S5HrDVeho3boQ_vmtwP6LZ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
