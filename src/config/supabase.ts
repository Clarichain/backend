import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_ROLE_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // For backend use

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)
if (supabaseAdmin){
    console.log("backend supabase connected")
}

export const createSupabaseClientWithToken = (token: string): SupabaseClient => {
    if(!supabaseUrl || !supabaseServiceKey){
        throw new Error("Environment variables not defined")
    }

    const config = {
        global: {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    return createClient(
        supabaseUrl,
        supabaseAnonKey,
        config
    )
}