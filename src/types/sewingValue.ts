// 数値表の型（データベースとは連携していない）
export interface SewingValue {
  id: number;
  name: string;
  normalValue: {
    // 通常モード
    [key: string]: number[];
  };
  bastingValue: {
    // しつけ縫いモード
    [key: string]: number[];
  };
}
