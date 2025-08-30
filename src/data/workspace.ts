import type { Latest, Favorite, MyProfile } from '@/types/workspace';

// TODO: これらのデータは、実際にはデータベースから取得する

// サンプル最新防具一覧情報
export const latests: Latest[] = [
  { id: 1, name: 'トライドシリーズ', imageUrl: '/images/armors/トライドアーマー.png' },
  {
    id: 2,
    name: '叡智の博士シリーズ',
    imageUrl: '/images/armors/叡智の博士.png',
  },
  {
    id: 3,
    name: 'コスモスシリーズ',
    imageUrl: '/images/armors/コスモスアーマー.png',
  },
];

// サンプル お気に入り データ
export const favorites: Favorite[] = [
  { id: 1, name: 'トーテムクラウン', imageUrl: '/images/armors/トーテムクラウン.png' },
  { id: 2, name: 'ノクトルケープ', imageUrl: '/images/armors/ノクトルケープ.png' },
  { id: 3, name: '月影の装束', imageUrl: '/images/armors/月影の装束.png' },
];

// サンプルユーザー情報
export const myProfile: MyProfile = {
  name: 'ユーザー名',
  email: 'user@example.com',
  imageUrl: '/images/userIcons/ユーザーアイコン.jpeg',
};
