import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * [GET] /api/Armor/Channel/Sewing: ページ毎の防具の裁縫データを取得
 */
export async function GET(request: NextRequest) {
  const ChannelId = request.nextUrl.searchParams.get('channelId');

  if (!ChannelId) {
    return NextResponse.json({ error: 'channelIdが指定されていません' }, { status: 400 });
  }

  const sewing = await prisma.sewing.findUnique({
    where: {
      armorId: parseInt(ChannelId),
    },
    include: {
      armor: {
        select: {
          parts: true,
        },
      },
    },
  });
  return NextResponse.json(sewing);
}
