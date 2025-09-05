import type { Topics } from '@/types/workspace';
import { RotateCcw, Send, TriangleAlert } from 'lucide-react';

export const MaxLv: number = 130; //最新シリーズのレベル

export const topics: Topics[] = [
  { id: 1, icon: RotateCcw, content: 'Lv120防具を追加しました。', createdAt: '2025-08-30' },
  { id: 2, icon: TriangleAlert, content: 'メンテナンスに伴うサービス停止のお知らせ', createdAt: '2025-08-29' },
  { id: 3, icon: Send, content: '裁縫職人ランクが公開されました。', createdAt: '2025-08-28' },
  { id: 4, icon: Send, content: 'これからよろしくお願いします。', createdAt: '2025-08-27' },
  { id: 5, icon: RotateCcw, content: 'Lv115防具を追加しました。', createdAt: '2025-08-25' },
  { id: 6, icon: RotateCcw, content: 'Lv110防具を追加しました。', createdAt: '2025-08-24' },
];
