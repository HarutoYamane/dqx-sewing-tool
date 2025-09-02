import type { UserProfile, Topics } from '@/types/workspace';
import { RotateCcw, Send, TriangleAlert } from 'lucide-react';

// TODO: これらのデータは、実際にはデータベースから取得する

// サンプルユーザー情報
export const users: UserProfile[] = [
  {
    id: 1,
    name: 'ユーザー名',
    email: 'user@example.com',
    imageUrl: '/images/userIcons/ユーザーアイコン.jpeg',
    favoriteList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
  },
  {
    id: 2,
    name: 'ユーザー名2',
    email: 'user2@example.com',
    imageUrl: '/images/userIcons/ユーザーアイコン.jpeg',
    favoriteList: [2, 5, 8],
  },
  {
    id: 3,
    name: 'ユーザー名3',
    email: 'user3@example.com',
    imageUrl: '/images/userIcons/ユーザーアイコン.jpeg',
    favoriteList: [11, 7, 3],
  },
];

export const topics: Topics[] = [
  { id: 1, icon: RotateCcw, content: 'Lv120防具を追加しました。', createdAt: '2025-08-30' },
  { id: 2, icon: TriangleAlert, content: 'メンテナンスに伴うサービス停止のお知らせ', createdAt: '2025-08-29' },
  { id: 3, icon: Send, content: '裁縫職人ランクが公開されました。', createdAt: '2025-08-28' },
  { id: 4, icon: Send, content: 'これからよろしくお願いします。', createdAt: '2025-08-27' },
  { id: 5, icon: RotateCcw, content: 'Lv115防具を追加しました。', createdAt: '2025-08-25' },
  { id: 6, icon: RotateCcw, content: 'Lv110防具を追加しました。', createdAt: '2025-08-24' },
];

// ユーザーIDからユーザーを取得する関数
export function getUser(id: number) {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error('ユーザーが見つかりませんでした');
  }
  return user;
}
