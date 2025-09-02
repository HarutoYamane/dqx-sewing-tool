export interface Armor {
  id: number;
  name: string;
  parts: ArmorParts;
  lv: number;
  series: ArmorSeries['name'];
  Type: ClothType;
  strength: Strengths[]; //強さのローテーション数はランダムなので要素数は指定しない
  settingValue: [number, number, number, number, number, number, number, number, number]; // 設定値1から9まで
  imageUrl: string;
}

type ArmorParts = 'head' | 'bodyUpper' | 'bodyLower' | 'arms' | 'legs';
type ClothType = '再生布' | '虹布' | '会心布' | '倍半布' | '通常'; //初期装備では布特性の無い装備もある
type Strengths = '弱い' | '普通' | '強い' | '最強' | '？';

export interface ArmorSeries {
  id: number; //シリーズのID
  name: string; //シリーズの名前
  lv: number; //シリーズのレベル
  imageUrl: string; //シリーズの画像URL（体上装備）
  latest: boolean; //最新装備かどうか
}
