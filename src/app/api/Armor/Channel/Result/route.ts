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
