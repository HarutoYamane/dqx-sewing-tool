import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * [GET] /api/topics/workspace: 公開トピックスを作成日順で10件取得
 */
export async function GET() {
  try {
    const topics = await prisma.topics.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
      select: {
        id: true,
        icon: true,
        title: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json(topics);
  } catch (error) {
    console.error('トピックスの取得に失敗しました:', error);
    return NextResponse.json({ error: 'トピックスの取得に失敗しました' }, { status: 500 });
  }
}
