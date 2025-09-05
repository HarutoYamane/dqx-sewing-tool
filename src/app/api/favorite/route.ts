import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/utils/auth';
import { UserProfile } from '@/types/workspace';
import { prisma } from '@/lib/prisma';

/**
 * [GET] /api/favorite: ログイン中のユーザーのお気に入りリストを取得
 */
export const GET = withAuth(async (request: NextRequest, _, user: UserProfile) => {
  try {
    // ユーザーのお気に入りリストを取得
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: user.id,
      },
      include: {
        armor: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // 最新のお気に入りから順番に並べる
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('お気に入り取得エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
});
