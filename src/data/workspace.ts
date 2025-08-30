import type { Latest, Favorite, MyProfile, Topics } from '@/types/workspace';
import { RotateCcw, Send, TriangleAlert } from 'lucide-react';

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

export const topics: Topics[] = [
  { id: 1, icon: RotateCcw, content: 'Lv120防具を追加しました。', createdAt: '2025-08-30' },
  { id: 2, icon: TriangleAlert, content: 'メンテナンスに伴うサービス停止のお知らせ', createdAt: '2025-08-29' },
  { id: 3, icon: Send, content: '裁縫職人ランクが公開されました。', createdAt: '2025-08-28' },
  { id: 4, icon: Send, content: 'これからよろしくお願いします。', createdAt: '2025-08-27' },
];
