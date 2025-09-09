import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * [GET] /api/topics/list: トピックス一覧をページネーション付きで取得
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const skipTotal = request.nextUrl.searchParams.get('skipTotal') === 'true';
    const limit = 15;

    // トピックスを取得
    const topics = await prisma.topics.findMany({
      where: {
        published: true, // 公開済みのもののみ
      },
      orderBy: {
        createdAt: 'desc', // 新しい順
      },
      skip: (pageNumber - 1) * limit,
      take: limit,
      select: {
        id: true,
        icon: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // skipTotalがtrueの場合はtotalを取得しない
    if (skipTotal) {
      return NextResponse.json({
        data: topics,
      });
    }

    // 初回のみtotalを取得
    const total = await prisma.armorSeries.count();

    return NextResponse.json({
      data: topics,
      total,
    });
  } catch (error) {
    console.error('トピックス一覧の取得に失敗しました:', error);
    return NextResponse.json({ error: 'トピックス一覧の取得に失敗しました' }, { status: 500 });
  }
}
