'use client';

// React
import { useState, useEffect } from 'react';
// shadcn/ui
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
// 自作コンポーネント
import Loading from '@/app/loading';
// アイコン
import { RotateCcw, Check, X } from 'lucide-react';
// データ型
import { Sewing } from '@/types/armor';

export default function SewingArea({ channelId }: { channelId: number }) {
  const [values, setValues] = useState<(number | null)[]>([...Array(9).fill(null)]);
  const [sewingValue, setSewingValue] = useState<Sewing | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArmor = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/Armor/Channel/Sewing?channelId=${channelId}`);
        const data = await response.json();
        setSewingValue(data);
      } catch (error) {
        console.error('防具毎の裁縫データ取得エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArmor();
  }, [channelId]);

  if (isLoading || !sewingValue) return <Loading />;

  let Tolerance = 0; //許容誤差
  if (sewingValue.armor.parts === 'HEAD') Tolerance = 4;
  else if (sewingValue.armor.parts === 'BODY_UPPER') Tolerance = 8;
  else if (sewingValue.armor.parts === 'BODY_LOWER') Tolerance = 6;
  else if (sewingValue.armor.parts === 'ARMS') Tolerance = 6;
  else if (sewingValue.armor.parts === 'LEGS') Tolerance = 4;
  else Tolerance = 0;

  const strengthConfig = {
    STRONGEST: { color: 'bg-red-500', text: '最強' },
    STRONGER: { color: 'bg-yellow-500', text: '強い' },
    NORMAL: { color: 'bg-green-500', text: '普通' },
    WEAK: { color: 'bg-blue-500', text: '弱い' },
    UNKNOWN: { color: 'bg-gray-500 pl-3 pr-3', text: '？' },
  };

  const getStrengthConfig = (strength: string) => {
    return strengthConfig[strength as keyof typeof strengthConfig] || strengthConfig.UNKNOWN;
  };

  const TotalDeviation = sewingValue.settingValue.reduce(
    (sum: number, value: number, index: number) => sum + Math.abs(value - (values[index] ?? 0)),
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
          {sewingValue.strength.map((strength: string, index: number) => {
            const config = getStrengthConfig(strength);
            return (
              <div key={index} className={`space-y-2`}>
                <div className={`${config.color} rounded-md p-2 text-xs text-white`}>{config.text}</div>
              </div>
            );
          })}
        </div>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          リセット
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {sewingValue.settingValue.map((value: number, index: number) => (
          <div key={index} className="space-y-2">
            <label htmlFor={`remaining-${index + 1}`} className="text-sm font-medium text-muted-foreground">
              残り値 {index + 1}
            </label>
            <Input
              id={`remaining-${index + 1}`}
              aria-label={`残り値 ${index + 1}`}
              type="number"
              min="0"
              max="9999"
              readOnly //残り値は編集不可
              value={values[index] === null ? value : value - (values[index] ?? 0)}
              className="text-center"
              placeholder="0"
              disabled={value === 0} //使わないマスは無効化（readOnlyだけでも良いがデザイン的に見やすい）
            />
          </div>
        ))}
      </div>
      <Separator orientation="horizontal" />
      <div className="grid grid-cols-3 gap-4">
        {values.map((value, index) => (
          <div key={index} className="space-y-2">
            <label htmlFor={`current-${index + 1}`} className="text-sm font-medium text-muted-foreground">
              現在値 {index + 1}
            </label>
            <Input
              id={`current-${index + 1}`}
              aria-label={`現在値 ${index + 1}`}
              type="number"
              min="0"
              max="9999"
              value={value ?? ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="text-center"
              placeholder="0"
              disabled={sewingValue?.settingValue[index] === 0} //使わないマスは無効化
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
