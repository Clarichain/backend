import { supabase } from '../config/supabase';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';

export const registerUser = async ({ email, password, name }: {
  email:string,
  password:string,
  name:string,
}) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) throw error;

  await supabase.from('users').insert([{ email, name }]);

  return data;
};

export const loginUser = async ({ email, password }: {
  email:string,
  password:string
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error || !data.session) throw new Error('Invalid login');

  const payload = { id: data.user.id, email: data.user.email };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return { accessToken, refreshToken, user: data.user }
}

export const updateUser = async () => {

}

export const deleteUser = async () => {
  const { data: user, error } = await supabase
  .from('users')
  .select()
}