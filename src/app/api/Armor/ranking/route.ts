import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * [GET] /api/Armor/ranking: 人気商材ランキング上位10個を取得
 */
export async function GET() {
  try {
    const rankingData = await prisma.weeklyArmorStats.groupBy({
      by: ['armorId'],
      _count: {
        armorId: true,
      },
      orderBy: {
        _count: {
          armorId: 'desc',
        },
      },
      take: 10, // 上位10個まで
    });

    // 防具情報を取得
    const armorIds = rankingData.map((item) => item.armorId);
    const armors = await prisma.armor.findMany({
      where: { id: { in: armorIds } },
    });

    // ランキングと防具情報を結合
    const result = rankingData.map((item) => ({
      armorId: item.armorId, // 防具のID
      count: item._count.armorId, // 防具の作成数（プレイしたユーザー数）
      armorName: armors.find((armor) => armor.id === item.armorId)?.name || 'Unknown', //あり得ないが一応記述
      imageUrl: armors.find((armor) => armor.id === item.armorId)?.imageUrl || '', //あり得ないが一応記述
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error('ランキング取得エラー:', error);
    return NextResponse.json({ error: 'ランキングの取得に失敗しました' }, { status: 500 });
  }
}
