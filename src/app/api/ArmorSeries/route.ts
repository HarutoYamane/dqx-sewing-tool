import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MaxLv } from '@/data/maxLv';

export async function GET(request: NextRequest) {
  const latest = request.nextUrl.searchParams.get('latest');
  const page = request.nextUrl.searchParams.get('page');
  const skipTotal = request.nextUrl.searchParams.get('skipTotal');

  if (latest) {
    //最新シリーズのみ取得(latest=trueが渡される)
    const latestSeries = await prisma.armorSeries.findMany({
      where: { lv: MaxLv },
      include: {
        armors: {
          orderBy: [
            { parts: 'asc' }, // 頭・体上・体下・腕・足の順番
          ],
        },
      }, //シリーズの防具を取得
    });
    return NextResponse.json(latestSeries);
  }
  if (page) {
    // ページネーション(1ページ15件分まで取得)
    const pageNumber = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = 15;

    const armorSerieses = await prisma.armorSeries.findMany({
      orderBy: { lv: 'desc' },
      include: {
        armors: {
          orderBy: [
            { parts: 'asc' }, // 頭・体上・体下・腕・足の順番
          ],
          include: {
            sewing: {
              select: {
                clothType: true,
              },
            },
          },
        },
      },
      take: limit,
      skip: (pageNumber - 1) * limit,
    });

    // skipTotalがtrueの場合はtotalを取得しない
    if (skipTotal === 'true') {
      return NextResponse.json({
        data: armorSerieses,
      });
    }

    // 初回のみtotalを取得
    const total = await prisma.armorSeries.count();

    return NextResponse.json({
      data: armorSerieses,
      total,
    });
  }
}
