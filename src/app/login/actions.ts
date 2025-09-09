'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { data: authData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error('メールアドレスまたはパスワードが正しくありません');
  }

  // ユーザーのロールを取得
  const user = await prisma.user.findUnique({
    where: { authId: authData.user.id },
    select: { role: true },
  });

  // 管理者ユーザーの場合、管理者パスワードを確認
  if (user?.role === 'ADMIN') {
    const adminPassword = formData.get('adminPassword') as string;

    if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
      // 管理者パスワードが正しくない場合、ログアウトしてエラーを投げる
      await supabase.auth.signOut();
      throw new Error('管理者パスワードが正しくありません');
    }
  }

  revalidatePath('/', 'layout');
  redirect('/workspace');
}
