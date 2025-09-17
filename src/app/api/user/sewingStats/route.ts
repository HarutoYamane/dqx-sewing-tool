import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { user } = body;

    // ユーザーが存在しない場合はエラーを返す
    if (!user || !user.id) {
      return NextResponse.json({ error: 'ユーザー情報が不正です' }, { status: 400 });
    }

    const totalSewingCountResult = await prisma.result.aggregate({
      where: { userId: user.id },
      _sum: { totalCount: true },
    });
    const totalSewingCount = totalSewingCountResult._sum.totalCount || 0;

    const maxSuccessRate = await prisma.result.findFirst({
      where: { userId: user.id },
      orderBy: { successRate: 'desc' },
      include: {
        armor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    const latestPlayed = await prisma.result.findFirst({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      include: {
        armor: {
          select: {
            name: true,
            imageUrl: true,
          },
        },
      },
    });

    return NextResponse.json({ totalSewingCount, maxSuccessRate, latestPlayed });
  } catch (error) {
    console.error('sewingStats API エラー:', error);
    return NextResponse.json({ error: 'サーバーエラーが発生しました' }, { status: 500 });
  }
}
