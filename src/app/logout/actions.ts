'use server';

import { revalidatePath } from 'next/cache';

import { createClient } from '@/utils/supabase/server';

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    throw new Error('ログアウトに失敗しました');
  }

  revalidatePath('/', 'layout');
  return { success: true };
}
