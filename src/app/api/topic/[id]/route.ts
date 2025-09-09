import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * [GET] /api/topics/[id]: 特定のトピックスを取得
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const topicId = parseInt(params.id, 10);

    if (isNaN(topicId)) {
      return NextResponse.json({ error: '無効なトピックスIDです' }, { status: 400 });
    }

    const topic = await prisma.topics.findUnique({
      where: {
        id: topicId,
        published: true, // 公開済みのもののみ
      },
      select: {
        id: true,
        icon: true,
        title: true,
        content: true,
        body: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!topic) {
      return NextResponse.json({ error: 'トピックスが見つかりません' }, { status: 404 });
    }

    return NextResponse.json(topic);
  } catch (error) {
    console.error('トピックスの取得に失敗しました:', error);
    return NextResponse.json({ error: 'トピックスの取得に失敗しました' }, { status: 500 });
  }
}
