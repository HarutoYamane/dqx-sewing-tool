import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ArmorSeriesData, ArmorData } from '@/app/workspace/systemAdmin/types';

export async function POST(request: NextRequest) {
  try {
    const { armorSeriesData, armorData }: { armorSeriesData: ArmorSeriesData; armorData: ArmorData[] } =
      await request.json();

    // トランザクションでデータを作成
    const result = await prisma.$transaction(async (tx) => {
      // 1. ArmorSeriesを作成
      const armorSeries = await tx.armorSeries.create({
        data: {
          name: armorSeriesData.name,
          lv: armorSeriesData.lv,
          imageUrl: armorSeriesData.imageUrl,
        },
      });

      // 2. Armorを作成
      const armors = await Promise.all(
        armorData.map(async (armor) => {
          return await tx.armor.create({
            data: {
              name: armor.name,
              parts: armor.parts,
              armorSeriesId: armorSeries.id,
              imageUrl: armor.imageUrl,
              lv: armorSeriesData.lv, // シリーズのレベルを使用
            },
          });
        })
      );

      // 3. Sewingを作成
      await Promise.all(
        armors.map(async (armor, index) => {
          const armorDataItem = armorData[index];
          return await tx.sewing.create({
            data: {
              armorId: armor.id,
              clothType: armorDataItem.clothType,
              strength: armorDataItem.strength,
              settingValue: armorDataItem.settingValue,
            },
          });
        })
      );

      return { armorSeries, armors };
    });

    return NextResponse.json({
      success: true,
      message: 'データが正常に作成されました',
      data: result,
    });
  } catch (error) {
    console.error('Error creating armor data:', error);

    // ユニーク制約エラーの場合
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        {
          success: false,
          message: 'この名前の防具シリーズまたは防具は既に存在します',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'データの作成中にエラーが発生しました',
      },
      { status: 500 }
    );
  }
}
