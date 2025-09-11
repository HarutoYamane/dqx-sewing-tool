import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/utils/auth';
import { UserProfile } from '@/types/workspace';
import { userOperations } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

/**
 * [GET] /api/users/me: 現在認証されているユーザーの情報を取得
 */
export const GET = withAuth(async (request: NextRequest, _, user: UserProfile) => {
  // 認証済みユーザーの情報をそのまま返す
  return NextResponse.json(user);
});

// ユーザープロフィール更新のバリデーションスキーマ(サーバー側でのチェック)
const updateProfileSchema = z.object({
  name: z
    .string({
      message: 'ユーザー名は文字列である必要があります',
    })
    .min(1, 'ユーザー名は 1 文字以上である必要があります')
    .max(20, 'ユーザー名は 20 文字以下である必要があります'),
});

/**
 * [PATCH] /api/users/me: 現在認証されているユーザーの情報を更新
 */
export const PATCH = withAuth(async (request: NextRequest, _, user: UserProfile) => {
  try {
    const body = await request.json();

    // リクエストボディのバリデーション
    const result = updateProfileSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues, message: 'バリデーションエラー' }, { status: 400 });
    }

    // バリデーション済みのデータを使用
    const { name } = result.data;

    // ユーザー名を更新
    const updatedUser = await userOperations.updateUserName(user.id, name);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('ユーザー更新エラー:', error);
    return NextResponse.json({ error: 'ユーザー情報の更新中にエラーが発生しました' }, { status: 500 });
  }
});
