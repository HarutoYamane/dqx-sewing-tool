import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Vercel Cron Job の認証確認
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        {
          success: false,
          error: '認証に失敗しました',
          message: 'Cron Job の認証キーが正しくありません',
        },
        { status: 401 }
      );
    }

    // 1週間前の日付を計算
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // 1週間以上古いWeeklyArmorStatsを削除
    const deletedStats = await prisma.weeklyArmorStats.deleteMany({
      where: {
        createdAt: {
          lt: oneWeekAgo,
        },
      },
    });

    console.log(`削除された週次統計データ: ${deletedStats.count}件`);

    return NextResponse.json({
      success: true,
      message: '週次統計データの削除が完了しました',
      deletedCount: deletedStats.count,
      deletedBefore: oneWeekAgo.toISOString(),
      summary: `${deletedStats.count}件の1週間以上古いデータを削除しました`,
    });
  } catch (error) {
    console.error('週次統計データの削除中にエラーが発生しました:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'サーバー内部エラーが発生しました',
        message: '週次統計データの削除中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}
