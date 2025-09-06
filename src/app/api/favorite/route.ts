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

/**
 * [POST] /api/favorite: ログイン中のユーザーのお気に入りリストに追加
 */
export const POST = withAuth(async (request: NextRequest, _, user: UserProfile) => {
  try {
    const { armorId, createdAt } = await request.json();

    // お気に入りを追加
    const createdFavorite = await prisma.favorite.create({
      data: { armorId, userId: user.id, createdAt },
    });

    // 追加されたお気に入りをarmor情報と一緒に取得
    const addFavorite = await prisma.favorite.findUnique({
      where: { id: createdFavorite.id },
      include: {
        armor: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json(addFavorite);
  } catch (error) {
    console.error('お気に入り追加エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
});

/**
 * [DELETE] /api/favorite: ログイン中のユーザーのお気に入りリストから削除
 */
export const DELETE = withAuth(async (request: NextRequest, _, user: UserProfile) => {
  try {
    const { favoriteId } = await request.json();

    // 削除前に削除対象のオブジェクトを取得
    const favoriteToDelete = await prisma.favorite.findUnique({
      where: { id: favoriteId, userId: user.id },
      include: {
        armor: {
          select: { id: true, name: true, imageUrl: true },
        },
      },
    });
    if (!favoriteToDelete) {
      return NextResponse.json({ error: 'お気に入りが見つかりません' }, { status: 404 });
    }

    await prisma.favorite.delete({
      where: {
        id: favoriteId,
        userId: user.id, // ユーザーが自分のお気に入りのみ削除できるようにする
      },
    });
    // 削除されたオブジェクトを返す
    return NextResponse.json(favoriteToDelete);
  } catch (error) {
    console.error('お気に入り削除エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
});
