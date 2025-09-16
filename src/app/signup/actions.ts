'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

import { userOperations } from '@/lib/db';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: { data: { name: formData.get('name') as string } },
  };

  const { data: signUpData, error } = await supabase.auth.signUp(data);

  if (error) {
    console.log('Supabase認証エラー:', error);
    redirect('/error');
  }

  console.log('signUpData:', signUpData); // デバッグ用

  // signUpDataからユーザー情報を取得
  if (!signUpData.user || !signUpData.user.id) {
    console.error('ユーザー情報が取得できませんでした');
    redirect('/error');
  }

  // Prismaでユーザーを作成
  try {
    await userOperations.createUser(signUpData.user.id, data.email, data.options.data.name);
  } catch (dbError) {
    console.error('データベースエラー:', dbError);
    redirect('/error');
  }

  revalidatePath('/', 'layout');
}
