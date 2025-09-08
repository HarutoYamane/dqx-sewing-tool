import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { user } = await req.json();
  const totalSewingCount = await prisma.result.aggregate({
    where: { userId: user.id },
    _sum: { totalCount: true },
  });

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
    orderBy: { createdAt: 'desc' },
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
}
