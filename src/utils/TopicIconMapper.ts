import { LucideIcon } from 'lucide-react';
import {
  Send,
  TriangleAlert,
  Info,
  Star,
  Bell,
  Shield,
  // 必要に応じて他のアイコンを追加（追加する際はデータベースのenum-TopicsIconに追加が必須）
} from 'lucide-react';

// アイコンマッピング
const iconMap: Record<string, LucideIcon> = {
  Send: Send,
  TriangleAlert: TriangleAlert,
  Info: Info,
  Star: Star,
  Bell: Bell,
  Shield: Shield,
};

/**
 * アイコン名からLucideアイコンコンポーネントを取得
 * @param iconName アイコン名
 * @returns LucideIconコンポーネント
 */
export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Info; // デフォルトはInfoアイコン
}

/**
 * 利用可能なアイコン名のリストを取得
 * @returns アイコン名の配列
 */
export function getAvailableIcons(): string[] {
  return Object.keys(iconMap);
}
