'use client';

import { useState } from 'react';
import { ArmorSeriesData, ArmorData, ClothTypes } from './types';
import { ArmorParts } from '@/types/armor';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Strengths } from '@/types/armor';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const needFieldsIndex: { parts: ArmorParts; index: number[] }[] = [
  {
    parts: 'HEAD',
    index: [1, 3, 4, 5],
  },
  {
    parts: 'BODY_UPPER',
    index: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    parts: 'BODY_LOWER',
    index: [0, 1, 3, 4, 6, 7],
  },
  {
    parts: 'ARMS',
    index: [0, 1, 2, 3, 4, 5],
  },
  {
    parts: 'LEGS',
    index: [0, 1, 3, 4],
  },
];

export default function SystemAdminPage() {
  const [armorSeriesData, setArmorSeriesData] = useState<ArmorSeriesData>({ name: '', lv: 0, imageUrl: '' });
  const [armorData, setArmorData] = useState<ArmorData[]>([
    {
      name: '',
      parts: 'HEAD',
      clothType: 'NORMAL',
      strength: [],
      settingValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      imageUrl: '',
    },
    {
      name: '',
      parts: 'BODY_UPPER',
      clothType: 'NORMAL',
      strength: [],
      settingValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      imageUrl: '',
    },
    {
      name: '',
      parts: 'BODY_LOWER',
      clothType: 'NORMAL',
      strength: [],
      settingValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      imageUrl: '',
    },
    {
      name: '',
      parts: 'ARMS',
      clothType: 'NORMAL',
      strength: [],
      settingValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      imageUrl: '',
    },
    {
      name: '',
      parts: 'LEGS',
      clothType: 'NORMAL',
      strength: [],
      settingValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      imageUrl: '',
    },
  ]);

  const handleStrengthChange = (value: string) => {
    setArmorData((prev) => prev.map((a) => ({ ...a, strength: value.split(',') as Strengths[] })));
  };

  const handleSettingValueChange = (parts: ArmorParts, index: number, value: number) => {
    setArmorData((prev) =>
      prev.map((a) =>
        a.parts === parts ? { ...a, settingValue: a.settingValue.map((v, i) => (i === index ? value : v)) } : a
      )
    );
  };

  const [armorActive, setArmorActive] = useState<Record<string, boolean>>({
    HEAD: true,
    BODY_UPPER: true,
    BODY_LOWER: true,
    ARMS: true,
    LEGS: true,
  });

  // バリデーション関数
  const validateData = () => {
    const errors: string[] = [];

    // シリーズデータのバリデーション
    if (!armorSeriesData.name.trim()) {
      errors.push('シリーズ名を入力してください');
    }
    if (armorSeriesData.lv <= 0) {
      errors.push('シリーズレベルは1以上を入力してください');
    }
    if (!armorSeriesData.imageUrl.trim()) {
      errors.push('シリーズ画像URLを入力してください');
    }

    // 防具データのバリデーション
    const activeArmors = armorData.filter((armor) => armorActive[armor.parts]);
    for (const armor of activeArmors) {
      if (!armor.name.trim()) {
        errors.push(`${armor.parts}の防具名を入力してください`);
      }
      if (!armor.imageUrl.trim()) {
        errors.push(`${armor.parts}の防具画像URLを入力してください`);
      }
      if (armor.strength.length === 0) {
        errors.push('強さローテーションを入力してください');
      }
    }

    return errors;
  };

  // データ送信関数
  const handleSubmit = async () => {
    const errors = validateData();
    if (errors.length > 0) {
      alert('入力エラー:\n' + errors.join('\n'));
      return;
    }

    try {
      const response = await fetch('/api/systemAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          armorSeriesData,
          armorData: armorData.filter((armor) => armorActive[armor.parts]), //active（必要）な部位のみ送信
        }),
      });

      if (!response.ok) {
        throw new Error('データの送信に失敗しました');
      }

      alert('データが正常に送信されました');
      // フォームをリセット
      setArmorSeriesData({ name: '', lv: 0, imageUrl: '' });
      setArmorData([
        {
          name: '',
          parts: 'HEAD',
          clothType: 'NORMAL',
          strength: [],
          settingValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          imageUrl: '',
        },
        {
          name: '',
          parts: 'BODY_UPPER',
          clothType: 'NORMAL',
          strength: [],
          settingValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          imageUrl: '',
        },
        {
          name: '',
          parts: 'BODY_LOWER',
          clothType: 'NORMAL',
          strength: [],
          settingValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          imageUrl: '',
        },
        {
          name: '',
          parts: 'ARMS',
          clothType: 'NORMAL',
          strength: [],
          settingValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          imageUrl: '',
        },
        {
          name: '',
          parts: 'LEGS',
          clothType: 'NORMAL',
          strength: [],
          settingValue: [0, 0, 0, 0, 0, 0, 0, 0, 0],
          imageUrl: '',
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      alert('データの送信中にエラーが発生しました');
    }
  };

  return (
    <div className="space-y-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>防具シリーズ情報</CardTitle>
          <CardDescription>新しい防具シリーズの情報を入力してください</CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="seriesName">シリーズ名</Label>
          <Input
            id="seriesName"
            type="text"
            value={armorSeriesData.name}
            onChange={(e) => setArmorSeriesData((prev) => ({ ...prev, name: e.target.value }))}
          />
          <Label htmlFor="seriesLv">シリーズレベル</Label>
          <Input
            id="seriesLv"
            type="number"
            value={armorSeriesData.lv ?? ''}
            onChange={(e) => setArmorSeriesData((prev) => ({ ...prev, lv: parseInt(e.target.value) || 0 }))}
          />
          <Label htmlFor="seriesImageUrl">シリーズ画像URL</Label>
          <Input
            id="seriesImageUrl"
            type="text"
            value={armorSeriesData.imageUrl}
            onChange={(e) => setArmorSeriesData((prev) => ({ ...prev, imageUrl: e.target.value }))}
          />
          <Label htmlFor="seriesStrength">強さローテーション</Label>
          <p>コピー用: WEAK,NORMAL,STRONGER,STRONGEST,UNKNOWN</p>
          <Input
            id="seriesStrength"
            type="text"
            value={armorData[0]?.strength?.join(',') || ''}
            onChange={(e) => handleStrengthChange(e.target.value)}
            placeholder="例: STRONGEST,STRONGER,NORMAL"
          />
          <Label>防具部位選択</Label>
          <div className="flex flex-row gap-2">
            {Object.entries(armorActive).map(([part, active]) => (
              <div key={part} className="flex flex-col items-center gap-1">
                <Label htmlFor={part}>
                  {part === 'HEAD'
                    ? '頭'
                    : part === 'BODY_UPPER'
                    ? '体上'
                    : part === 'BODY_LOWER'
                    ? '体下'
                    : part === 'ARMS'
                    ? '腕'
                    : '足'}
                </Label>
                <Checkbox
                  checked={active}
                  id={part}
                  onCheckedChange={(checked) => setArmorActive((prev) => ({ ...prev, [part]: !!checked }))}
                />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button onClick={handleSubmit} className="w-full">
              データを送信
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        {armorData.map(
          (armor) =>
            armorActive[armor.parts] && (
              <Card key={armor.parts}>
                <CardHeader>
                  <CardTitle>
                    {armor.parts === 'HEAD'
                      ? '頭'
                      : armor.parts === 'BODY_UPPER'
                      ? '体上'
                      : armor.parts === 'BODY_LOWER'
                      ? '体下'
                      : armor.parts === 'ARMS'
                      ? '腕'
                      : '足'}
                    の防具情報
                  </CardTitle>
                  <CardDescription>新しい防具の情報を入力してください</CardDescription>
                </CardHeader>
                <CardContent>
                  <Label htmlFor={`armorName-${armor.parts}`}>防具名</Label>
                  <Input
                    id={`armorName-${armor.parts}`}
                    type="text"
                    value={armor.name}
                    onChange={(e) =>
                      setArmorData((prev) =>
                        prev.map((a) => (a.parts === armor.parts ? { ...a, name: e.target.value } : a))
                      )
                    }
                  />
                  <Select
                    value={armor.clothType}
                    onValueChange={(value) =>
                      setArmorData((prev) =>
                        prev.map((a) => (a.parts === armor.parts ? { ...a, clothType: value as ClothTypes } : a))
                      )
                    }
                  >
                    <Label id={`armorClothType-label-${armor.parts}`}>布特性</Label>
                    <SelectTrigger
                      id={`armorClothType-${armor.parts}`}
                      aria-labelledby={`armorClothType-label-${armor.parts}`}
                    >
                      <SelectValue placeholder="布特性を選択" /> {/* 空にできないので基本機能しない */}
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NORMAL">通常</SelectItem>
                      <SelectItem value="REBIRTH">再生布</SelectItem>
                      <SelectItem value="RAINBOW">虹布</SelectItem>
                      <SelectItem value="HEART">会心布</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label htmlFor={`armorImageUrl-${armor.parts}`}>防具画像URL</Label>
                  <Input
                    id={`armorImageUrl-${armor.parts}`}
                    type="text"
                    value={armor.imageUrl}
                    onChange={(e) =>
                      setArmorData((prev) =>
                        prev.map((a) => (a.parts === armor.parts ? { ...a, imageUrl: e.target.value } : a))
                      )
                    }
                  />
                  <Label>裁縫設定値</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {armor.settingValue.map((value, index) => (
                      <div key={index}>
                        <Label htmlFor={`armorSettingValue-${armor.parts}-${index}`} className="sr-only">
                          設定値 {index + 1}
                        </Label>
                        <Input
                          id={`armorSettingValue-${armor.parts}-${index}`}
                          type="number"
                          value={value ?? ''}
                          onChange={(e) => handleSettingValueChange(armor.parts, index, parseInt(e.target.value) || 0)} //部位毎にそれぞれの設定値を変更
                          disabled={!needFieldsIndex.find((item) => item.parts === armor.parts)?.index.includes(index)} //部位毎に使わないマスは無効化
                          placeholder="0"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
        )}
      </div>
    </div>
  );
}
