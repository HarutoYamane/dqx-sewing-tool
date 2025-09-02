'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { RotateCcw, Check, X } from 'lucide-react';
import { Armor } from '@/types/armor';

export default function SewingArea({ armor }: { armor: Armor }) {
  let Tolerance = 0; //許容誤差
  if (armor.parts === 'head') Tolerance = 4;
  else if (armor.parts === 'bodyUpper') Tolerance = 8;
  else if (armor.parts === 'bodyLower') Tolerance = 6;
  else if (armor.parts === 'arms') Tolerance = 6;
  else if (armor.parts === 'legs') Tolerance = 4;
  else Tolerance = 0;

  const StrengthColor = (strength: string) => {
    //強さ表示のカラーリング関数
    if (strength === '最強') return 'bg-red-500';
    else if (strength === '強い') return 'bg-yellow-500';
    else if (strength === '普通') return 'bg-green-500';
    else if (strength === '弱い') return 'bg-blue-500';
    else return 'bg-gray-500 pl-3 pr-3'; //？用（文字数的にボタンの長さが合わないので、パディングを増やしてる）
  };

  const [values, setValues] = useState<(number | null)[]>([...Array(9).fill(null)]);

  const TotalDeviation = armor.settingValue.reduce(
    (sum, value, index) => sum + Math.abs(value - (values[index] ?? 0)),
    0
  ); //合計誤差

  const isComplete = TotalDeviation <= Tolerance;
  const completeButtonConfig = {
    colorAnime: isComplete
      ? 'bg-green-500 hover:bg-green-600 animate-[heartbeat_1.5s_ease-in-out_infinite]'
      : 'bg-red-500 hover:bg-red-600',
    color: isComplete ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600',
    text: isComplete ? '完了' : '再調整',
    icon: isComplete ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />,
  };

  const handleInputChange = (index: number, value: string) => {
    const numValue = parseInt(value) || null;
    const newValues = [...values];
    newValues[index] = numValue;
    setValues(newValues);
  };

  const handleReset = () => {
    setValues([...Array(9).fill(null)]);
  };

  const handleComplete = () => {
    //後々データベースに移行したら、裁縫回数などに反映する処理を追加(今はリセットと同じ)
    setValues([...Array(9).fill(null)]);
  };

  return (
    <div className="space-y-4 pt-3 pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {armor.strength.map((strength, index) => (
            <div key={index} className={`space-y-2`}>
              <label className={`${StrengthColor(strength)} rounded-md p-2 text-xs text-white`}>{strength}</label>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          リセット
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {armor.settingValue.map((value, index) => (
          <div key={index} className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">残り値 {index + 1}</label>
            <Input
              type="number"
              min="0"
              max="999"
              value={values[index] === null ? value : value - (values[index] ?? 0)}
              className="text-center"
              placeholder="0"
              disabled={value === 0} //使わないマスは無効化
            />
          </div>
        ))}
      </div>
      <Separator orientation="horizontal" />
      <div className="grid grid-cols-3 gap-4">
        {values.map((value, index) => (
          <div key={index} className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">現在値 {index + 1}</label>
            <Input
              type="number"
              min="0"
              max="999"
              value={value ?? ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="text-center"
              placeholder="0"
              disabled={armor.settingValue[index] === 0} //使わないマスは無効化
            />
          </div>
        ))}
      </div>

      <div className="pt-4">
        <div className="flex items-center justify-start gap-5">
          <div className="text-sm text-muted-foreground">
            <p className="w-[14ch]">合計誤差: {TotalDeviation}</p>{' '}
            {/* レイアウトズレの防止で、固定幅を設けている(桁数変動時に動いちゃう) */}
            <p className="w-[14ch]">許容誤差: {Tolerance}</p>
          </div>
          <Button variant="default" size="lg" onClick={handleComplete} className={completeButtonConfig.colorAnime}>
            {completeButtonConfig.icon}
            {completeButtonConfig.text}
          </Button>
        </div>
      </div>
    </div>
  );
}
