// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// TODO: ご自身の Supabase のユーザー ID をコピペしてください
const FIRST_USER_ID = 'cmf534vvd00068omnw053bbmx';
const SECOND_USER_ID = 'cmf535ic500078omnhaws3o9l';

async function main() {
  /**
   * ユーザーデータの追加
   *
   * @note authId は適当。ユニーク制約に引っかからないようにしている
   */
  //   const users = await Promise.all([
  //     prisma.user.create({
  //       data: {
  //         name: '田中 一郎',
  //         email: 'tanaka@example.com',
  //         authId: 'auth0|2',
  //       },
  //     }),
  //   ]);
  //   console.log(`${users.length} 人のユーザーを追加しました`);

  /**
   * 防具シリーズの追加
   */
  const armorSerieses = await Promise.all([
    prisma.armorSeries.create({
      data: {
        name: '叡聖シリーズ',
        lv: 130,
        imageUrl: 'eisei_upper.png',
      },
    }),
    prisma.armorSeries.create({
      data: {
        name: '月影シリーズ',
        lv: 130,
        imageUrl: 'tukikage_upper.png',
      },
    }),
    prisma.armorSeries.create({
      data: {
        name: 'ノクトルシリーズ',
        lv: 130,
        imageUrl: 'nokutoru_upper.png',
      },
    }),
    prisma.armorSeries.create({
      data: {
        name: 'アンテイクシリーズ',
        lv: 128,
        imageUrl: 'annteiku_upper.png',
      },
    }),
    prisma.armorSeries.create({
      data: {
        name: '烈風シリーズ',
        lv: 128,
        imageUrl: 'repppu_upper.png',
      },
    }),
    prisma.armorSeries.create({
      data: {
        name: '妖精郷シリーズ',
        lv: 128,
        imageUrl: 'youseikyou_upper.png',
      },
    }),
  ]);
  console.log(`${armorSerieses.length} 個の防具シリーズを追加しました`);

  /**
   * 防具の追加（ArmorSeriesId付き）
   */
  const armors = await Promise.all([
    // 叡聖シリーズの防具
    prisma.armor.create({
      data: {
        name: '叡聖のサークレット',
        parts: 'HEAD',
        lv: 130,
        imageUrl: 'eisei_head.png',
        armorSeriesId: armorSerieses[0].id, // 叡聖シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '叡聖の博士服',
        parts: 'BODY_UPPER',
        lv: 130,
        imageUrl: 'eisei_upper.png',
        armorSeriesId: armorSerieses[0].id, // 叡聖シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '叡聖のグローブ',
        parts: 'ARMS',
        lv: 130,
        imageUrl: 'eisei_arms.png',
        armorSeriesId: armorSerieses[0].id, // 叡聖シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '叡聖のブーツ',
        parts: 'LEGS',
        lv: 130,
        imageUrl: 'eisei_legs.png',
        armorSeriesId: armorSerieses[0].id, // 叡聖シリーズ
      },
    }),
    // 月影シリーズの防具
    prisma.armor.create({
      data: {
        name: '月影の額当て',
        parts: 'HEAD',
        lv: 130,
        imageUrl: 'tukikage_head.png',
        armorSeriesId: armorSerieses[1].id, // 月影シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '月影の装束上',
        parts: 'BODY_UPPER',
        lv: 130,
        imageUrl: 'tukikage_upper.png',
        armorSeriesId: armorSerieses[1].id, // 月影シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '月影の装束下',
        parts: 'BODY_LOWER',
        lv: 130,
        imageUrl: 'tukikage_under.png',
        armorSeriesId: armorSerieses[1].id, // 月影シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '月影のこて',
        parts: 'ARMS',
        lv: 130,
        imageUrl: 'tukikage_arms.png',
        armorSeriesId: armorSerieses[1].id, // 月影シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '月影の深沓',
        parts: 'LEGS',
        lv: 130,
        imageUrl: 'tukikage_legs.png',
        armorSeriesId: armorSerieses[1].id, // 月影シリーズ
      },
    }),
    // ノクトルシリーズの防具
    prisma.armor.create({
      data: {
        name: 'ノクトルクラウン',
        parts: 'HEAD',
        lv: 130,
        imageUrl: 'nokutoru_head.png',
        armorSeriesId: armorSerieses[2].id, // ノクトルシリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: 'ノクトルケープ上',
        parts: 'BODY_UPPER',
        lv: 130,
        imageUrl: 'nokutoru_upper.png',
        armorSeriesId: armorSerieses[2].id, // ノクトルシリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: 'ノクトルケープ下',
        parts: 'BODY_LOWER',
        lv: 130,
        imageUrl: 'nokutoru_under.png',
        armorSeriesId: armorSerieses[2].id, // ノクトルシリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: 'ノクトルグローブ',
        parts: 'ARMS',
        lv: 130,
        imageUrl: 'nokutoru_arms.png',
        armorSeriesId: armorSerieses[2].id, // ノクトルシリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: 'ノクトルブーツ',
        parts: 'LEGS',
        lv: 130,
        imageUrl: 'nokutoru_legs.png',
        armorSeriesId: armorSerieses[2].id, // ノクトルシリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: 'アンテイクトーク',
        parts: 'HEAD',
        lv: 128,
        imageUrl: 'annteiku_head.png',
        armorSeriesId: armorSerieses[3].id, // アンテイクシリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: 'アンテイクドレス上',
        parts: 'BODY_UPPER',
        lv: 128,
        imageUrl: 'annteiku_upper.png',
        armorSeriesId: armorSerieses[3].id, // アンテイクシリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: 'アンテイクドレス下',
        parts: 'BODY_LOWER',
        lv: 128,
        imageUrl: 'annteiku_under.png',
        armorSeriesId: armorSerieses[3].id, // アンテイクシリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: 'アンテイクグローブ',
        parts: 'ARMS',
        lv: 128,
        imageUrl: 'annteiku_arms.png',
        armorSeriesId: armorSerieses[3].id, // アンテイクシリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: 'アンテイクシューズ',
        parts: 'LEGS',
        lv: 128,
        imageUrl: 'annteiku_legs.png',
        armorSeriesId: armorSerieses[3].id, // アンテイクシリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '烈風のキャップ',
        parts: 'HEAD',
        lv: 128,
        imageUrl: 'repppu_head.png',
        armorSeriesId: armorSerieses[4].id, // 烈風シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '烈風のころも上',
        parts: 'BODY_UPPER',
        lv: 128,
        imageUrl: 'repppu_upper.png',
        armorSeriesId: armorSerieses[4].id, // 烈風シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '烈風のころも下',
        parts: 'BODY_LOWER',
        lv: 128,
        imageUrl: 'repppu_under.png',
        armorSeriesId: armorSerieses[4].id, // 烈風シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '烈風のグローブ',
        parts: 'ARMS',
        lv: 128,
        imageUrl: 'repppu_arms.png',
        armorSeriesId: armorSerieses[4].id, // 烈風シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '烈風のブーツ',
        parts: 'LEGS',
        lv: 128,
        imageUrl: 'repppu_legs.png',
        armorSeriesId: armorSerieses[4].id, // 烈風シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '妖精郷の花髪',
        parts: 'HEAD',
        lv: 128,
        imageUrl: 'youseikyou_head.png',
        armorSeriesId: armorSerieses[5].id, // 妖精郷シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '妖精郷の舞踏服上',
        parts: 'BODY_UPPER',
        lv: 128,
        imageUrl: 'youseikyou_upper.png',
        armorSeriesId: armorSerieses[5].id, // 妖精郷シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '妖精郷の舞踏服下',
        parts: 'BODY_LOWER',
        lv: 128,
        imageUrl: 'youseikyou_under.png',
        armorSeriesId: armorSerieses[5].id, // 妖精郷シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '妖精郷のうでわ',
        parts: 'ARMS',
        lv: 128,
        imageUrl: 'youseikyou_arms.png',
        armorSeriesId: armorSerieses[5].id, // 妖精郷シリーズ
      },
    }),
    prisma.armor.create({
      data: {
        name: '妖精郷のブーツ',
        parts: 'LEGS',
        lv: 128,
        imageUrl: 'youseikyou_legs.png',
        armorSeriesId: armorSerieses[5].id, // 妖精郷シリーズ
      },
    }),
  ]);
  console.log(`${armors.length} 個の防具を追加しました`);

  /**
   * 裁縫設定の追加
   */
  const sewings = await prisma.sewing.createMany({
    data: [
      {
        armorId: armors[0].id, // 叡聖のサークレット
        clothType: 'RAINBOW',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [0, 450, 0, 140, 300, 400, 0, 0, 0],
      },
      {
        armorId: armors[1].id, // 叡聖の博士服
        clothType: 'RAINBOW',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [240, 150, 170, 130, 110, 90, 80, 130, 110],
      },
      {
        armorId: armors[2].id, // 叡聖のグローブ
        clothType: 'RAINBOW',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [180, 130, 350, 230, 100, 120, 0, 0, 0],
      },
      {
        armorId: armors[3].id, // 叡聖のブーツ
        clothType: 'RAINBOW',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [450, 240, 0, 130, 410, 0, 0, 0, 0],
      },
      {
        armorId: armors[4].id, // 月影の額当て
        clothType: 'HEART',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [0, 500, 0, 380, 130, 440, 0, 0, 0],
      },
      {
        armorId: armors[5].id, // 月影の装束上
        clothType: 'HEART',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [130, 85, 110, 80, 110, 160, 150, 100, 180],
      },
      {
        armorId: armors[6].id, // 月影の装束下
        clothType: 'HEART',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [150, 270, 0, 320, 90, 0, 120, 280, 0],
      },
      {
        armorId: armors[7].id, // 月影のこて
        clothType: 'HEART',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [340, 100, 320, 180, 150, 170, 0, 0, 0],
      },
      {
        armorId: armors[8].id, // 月影の深沓
        clothType: 'HEART',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [410, 120, 0, 250, 520, 0, 0, 0, 0],
      },
      {
        armorId: armors[9].id, // ノクトルクラウン
        clothType: 'REBIRTH',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [0, 340, 0, 480, 150, 230, 0, 0, 0],
      },
      {
        armorId: armors[10].id, // ノクトルケープ上
        clothType: 'RAINBOW',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [90, 120, 150, 140, 110, 100, 220, 90, 190],
      },
      {
        armorId: armors[11].id, // ノクトルケープ下
        clothType: 'REBIRTH',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [160, 170, 0, 90, 210, 0, 270, 160, 0],
      },
      {
        armorId: armors[12].id, // ノクトルグローブ
        clothType: 'HEART',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [360, 90, 160, 110, 250, 330, 0, 0, 0],
      },
      {
        armorId: armors[13].id, // ノクトルブーツ
        clothType: 'REBIRTH',
        strength: ['WEAK', 'UNKNOWN', 'STRONGEST', 'UNKNOWN', 'UNKNOWN', 'NORMAL', 'NORMAL', 'STRONGER', 'UNKNOWN'],
        settingValue: [100, 500, 0, 390, 190, 0, 0, 0, 0],
      },
      {
        armorId: armors[14].id, // アンテイクトーク
        clothType: 'HEART',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [0, 460, 0, 410, 180, 310, 0, 0, 0],
      },
      {
        armorId: armors[15].id, // アンテイクドレス上
        clothType: 'REBIRTH',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [180, 100, 190, 120, 90, 130, 110, 160, 80],
      },
      {
        armorId: armors[16].id, // アンテイクドレス下
        clothType: 'HEART',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [290, 100, 0, 140, 260, 0, 340, 90, 0],
      },
      {
        armorId: armors[17].id, // アンテイクグローブ
        clothType: 'RAINBOW',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [140, 350, 130, 190, 90, 230, 0, 0, 0],
      },
      {
        armorId: armors[18].id, // アンテイクシューズ
        clothType: 'RAINBOW',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [120, 250, 0, 470, 360, 0, 0, 0, 0],
      },
      {
        armorId: armors[19].id, // 烈風のキャップ
        clothType: 'REBIRTH',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [0, 420, 0, 290, 140, 320, 0, 0, 0],
      },
      {
        armorId: armors[20].id, // 烈風のころも上
        clothType: 'REBIRTH',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [100, 150, 100, 140, 120, 90, 170, 90, 150],
      },
      {
        armorId: armors[21].id, // 烈風のころも下
        clothType: 'REBIRTH',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [180, 200, 0, 270, 110, 0, 90, 240, 0],
      },
      {
        armorId: armors[22].id, // 烈風のうでわ
        clothType: 'REBIRTH',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [210, 120, 320, 290, 90, 140, 0, 0, 0],
      },
      {
        armorId: armors[23].id, // 烈風のブーツ
        clothType: 'REBIRTH',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [200, 380, 0, 110, 450, 0, 0, 0, 0],
      },
      {
        armorId: armors[24].id, // 妖精郷の花髪
        clothType: 'RAINBOW',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [0, 290, 0, 150, 450, 490, 0, 0, 0],
      },
      {
        armorId: armors[25].id, // 妖精郷の舞踏服上
        clothType: 'HEART',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [120, 160, 110, 130, 90, 190, 100, 130, 90],
      },
      {
        armorId: armors[26].id, // 妖精郷の舞踏服下
        clothType: 'RAINBOW',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [80, 270, 0, 260, 100, 0, 140, 290, 0],
      },
      {
        armorId: armors[27].id, // 妖精郷のうでわ
        clothType: 'HEART',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [220, 90, 190, 380, 130, 290, 0, 0, 0],
      },
      {
        armorId: armors[28].id, // 妖精郷のブーツ
        clothType: 'HEART',
        strength: [
          'NORMAL',
          'STRONGEST',
          'UNKNOWN',
          'STRONGER',
          'UNKNOWN',
          'WEAK',
          'UNKNOWN',
          'UNKNOWN',
          'NORMAL',
          'UNKNOWN',
        ],
        settingValue: [510, 140, 0, 210, 490, 0, 0, 0, 0],
      },
    ],
    skipDuplicates: true,
  });
  console.log(`${sewings.count} 個の裁縫設定を追加しました`);

  /**
   * お気に入りの追加
   */
  const favorites = await prisma.favorite.createMany({
    data: [
      {
        userId: FIRST_USER_ID,
        armorId: armors[0].id,
      },
      {
        userId: FIRST_USER_ID,
        armorId: armors[1].id,
      },
      {
        userId: FIRST_USER_ID,
        armorId: armors[2].id,
      },
      {
        userId: SECOND_USER_ID,
        armorId: armors[12].id,
      },
      {
        userId: SECOND_USER_ID,
        armorId: armors[13].id,
      },
      {
        userId: SECOND_USER_ID,
        armorId: armors[14].id,
      },
    ],
    skipDuplicates: true,
  });
  console.log(`${favorites.count} 個のお気に入りを追加しました`);

  console.log('シードデータの追加が完了しました');
}

main()
  .catch((e) => {
    console.error('シードの実行中にエラーが発生しました:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
