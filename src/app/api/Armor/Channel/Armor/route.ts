import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * [GET] /api/Armor: ページ毎の防具の詳細情報を取得
 */
export async function GET(request: NextRequest) {
  const ChannelId = request.nextUrl.searchParams.get('channelId');

  if (!ChannelId) {
    return NextResponse.json({ error: 'channelIdが指定されていません' }, { status: 400 });
  }

  const armor = await prisma.armor.findUnique({
    where: {
      id: parseInt(ChannelId),
    },
    include: {
      sewing: true,
    },
  });
  return NextResponse.json(armor);
}
