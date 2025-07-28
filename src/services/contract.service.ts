import { supabase } from '../config/supabase';

export const createContract = async ({ dummy }: {
    dummy: string
 }) => {
    const { data: contract, error } = await supabase.from("documents").insert([{dummy}])
    if (error) throw error;
    return contract

}