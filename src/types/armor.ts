type ArmorParts = 'HEAD' | 'BODY_UPPER' | 'BODY_LOWER' | 'ARMS' | 'LEGS';
export interface Armor {
  id: number;
  name: string;
  parts: ArmorParts;
  armorSeriesId: number;
  imageUrl: string;
  lv: number;
}

export interface ArmorSeries {
  id: number; //シリーズのID
  name: string; //シリーズの名前
  lv: number; //シリーズのレベル
  imageUrl: string; //シリーズの画像URL（体上装備）
  armors?: Armor[]; // 関連する防具（オプショナル）
}

type ClothType = 'REBIRTH' | 'RAINBOW' | 'HEART' | 'NORMAL'; //初期装備では布特性の無い装備もある
type Strengths = 'WEAK' | 'NORMAL' | 'STRONGER' | 'STRONGEST' | 'UNKNOWN';
export interface Swing {
  id: number;
  armorId: number;
  clothType: ClothType; //布特性(再生・虹・会心・通常)
  strength: Strengths[]; //強さローテーション
  settingValue: number[]; //防具毎の設定値
}

export interface Favorite {
  id: number;
  userId: string;
  armorId: number;
  createdAt: Date;
  armor: {
    id: number;
    name: string;
    imageUrl: string;
  };
}

export interface Result {
  //裁縫結果（ユーザー・防具毎）
  id: number;
  userId: string;
  armorId: number;
  threeStar: number;
  twoStar: number;
  oneStar: number;
  zeroStar: number;
  mistake: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
