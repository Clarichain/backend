import { supabase } from '../config/supabase';

export const createUser = async (data: { email: string; name: string }) => {
  const { data: user, error } = await supabase
    .from('users')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return user;
};
