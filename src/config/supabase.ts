import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // For backend use

export const supabase = createClient(supabaseUrl, supabaseKey)
if (supabase){
    console.log("Supabase connected")
}