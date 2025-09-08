import { ArmorParts, Strengths } from '@/types/armor';

// Prismaスキーマと一致する型定義
export type ClothTypes = 'REBIRTH' | 'RAINBOW' | 'HEART' | 'NORMAL';

export interface ArmorSeriesData {
  name: string;
  lv: number; // null不可
  imageUrl: string;
}

export interface ArmorData {
  name: string;
  parts: ArmorParts;
  clothType: ClothTypes;
  strength: Strengths[];
  settingValue: number[]; // null不可
  imageUrl: string;
}
