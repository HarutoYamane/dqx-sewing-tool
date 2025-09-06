import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/utils/auth';
import { UserProfile } from '@/types/workspace';
import { prisma } from '@/lib/prisma';

/**
 * [GET] /api/Armor/Result: ログイン中のユーザーの防具毎の裁縫結果を取得
 */
export const GET = withAuth(async (request: NextRequest, _, user: UserProfile) => {
  const ChannelId = request.nextUrl.searchParams.get('channelId');
  if (!ChannelId) {
    return NextResponse.json({ error: 'channelIdが指定されていません' }, { status: 400 });
  }
  try {
    // ユーザーの防具毎の裁縫結果を取得
    const result = await prisma.result.findUnique({
      where: {
        userId_armorId: {
          userId: user.id,
          armorId: parseInt(ChannelId),
        },
      },
    });

    // リザルトレコードが存在しない(初回時など）場合は404を返す
    if (!result) {
      return NextResponse.json({ error: 'リザルトレコードが見つかりません' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('防具毎の裁縫結果取得エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
});

/**
 * [PATCH] /api/Armor/Result: ログイン中のユーザーの防具毎の裁縫結果を更新またはリセット
 */
export const PATCH = withAuth(async (request: NextRequest, _, user: UserProfile) => {
  const ChannelId = request.nextUrl.searchParams.get('channelId');
  if (!ChannelId) {
    return NextResponse.json({ error: 'channelIdが指定されていません' }, { status: 400 });
  }

  try {
    const body = await request.text();

    // リクエストボディがない場合はリセット
    if (!body) {
      const resetResult = await prisma.result.update({
        where: {
          userId_armorId: {
            userId: user.id,
            armorId: parseInt(ChannelId),
          },
        },
        data: {
          total: 0,
          threeStar: 0,
          mistake: 0,
        },
      });
      return NextResponse.json(resetResult);
    }

    // リクエストボディがある場合は更新
    const { isComplete } = JSON.parse(body);

    // upsertで新規作成または更新
    const updatedResult = await prisma.result.upsert({
      where: {
        userId_armorId: {
          userId: user.id,
          armorId: parseInt(ChannelId),
        },
      },
      update: {
        total: { increment: 1 },
        threeStar: isComplete ? { increment: 1 } : undefined,
        mistake: !isComplete ? { increment: 1 } : undefined,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        armorId: parseInt(ChannelId),
        total: 1,
        threeStar: isComplete ? 1 : 0,
        twoStar: 0,
        oneStar: 0,
        zeroStar: 0,
        mistake: isComplete ? 0 : 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedResult);
  } catch (error) {
    console.error('防具毎の裁縫結果更新エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
});
