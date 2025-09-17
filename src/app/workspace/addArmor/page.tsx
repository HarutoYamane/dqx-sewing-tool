'use client';

import { ArmorParts } from '@/types/armor';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Strengths } from '@/types/armor';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUserStore } from '@/store/useUserStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

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

// Zodスキーマの定義
const armorFormSchema = z.object({
  armorSeriesData: z.object({
    name: z.string().min(1, 'シリーズ名を入力してください'),
    lv: z.number().min(1, 'シリーズレベルは1以上を入力してください'),
    imageUrl: z.string().min(1, 'シリーズ画像URLを入力してください'),
  }),
  armorData: z.array(
    z.object({
      name: z.string().min(1, '防具名を入力してください'),
      parts: z.enum(['HEAD', 'BODY_UPPER', 'BODY_LOWER', 'ARMS', 'LEGS']),
      clothType: z.enum(['NORMAL', 'REBIRTH', 'RAINBOW', 'HEART']),
      strength: z
        .array(z.enum(['WEAK', 'NORMAL', 'STRONGER', 'STRONGEST', 'UNKNOWN']))
        .min(1, '強さローテーションを入力してください'),
      settingValue: z.array(z.number()).length(9),
      imageUrl: z.string().min(1, '防具画像URLを入力してください'),
    })
  ),
  armorActive: z.object({
    HEAD: z.boolean(),
    BODY_UPPER: z.boolean(),
    BODY_LOWER: z.boolean(),
    ARMS: z.boolean(),
    LEGS: z.boolean(),
  }),
});

type ArmorFormData = z.infer<typeof armorFormSchema>;

export default function SystemAdminPage() {
  const { user } = useUserStore();

  // react-hook-formの設定
  const form = useForm<ArmorFormData>({
    resolver: zodResolver(armorFormSchema),
    defaultValues: {
      armorSeriesData: { name: '', lv: 0, imageUrl: '' },
      armorData: [
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
      ],
      armorActive: {
        HEAD: true,
        BODY_UPPER: true,
        BODY_LOWER: true,
        ARMS: true,
        LEGS: true,
      },
    },
  });

  const handleStrengthButtonClick = (strength: Strengths) => {
    const currentStrength = form.getValues('armorData.0.strength') || [];
    const newStrength = [...currentStrength, strength];
    form.setValue('armorData.0.strength', newStrength);
    // 他の部位にも同じ強さを設定
    form.getValues('armorData').forEach((_, index) => {
      form.setValue(`armorData.${index}.strength`, newStrength);
    });
  };

  const handleStrengthResetButtonClick = () => {
    form.getValues('armorData').forEach((_, index) => {
      form.setValue(`armorData.${index}.strength`, []);
    });
  };

  // データ送信関数
  const onSubmit = async (data: ArmorFormData) => {
    if (user?.role !== 'ADMIN') {
      alert('管理者権限が必要です');
      return;
    }

    try {
      const response = await fetch('/api/systemAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          armorSeriesData: data.armorSeriesData,
          armorData: data.armorData.filter((armor) => data.armorActive[armor.parts]), //active（必要）な部位のみ送信
        }),
      });

      if (!response.ok) {
        throw new Error(`${data.armorSeriesData.name}のデータの送信に失敗しました`);
      }

      alert(`${data.armorSeriesData.name}のデータが正常に送信されました`);
      // フォームをリセット
      form.reset();
    } catch (error) {
      console.error('Error:', error);
      alert(`${data.armorSeriesData.name}のデータ送信中にエラーが発生しました`);
    }
  };

  return (
    <div className="space-y-4 p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>防具シリーズ情報</CardTitle>
              <CardDescription>新しい防具シリーズの情報を入力してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="armorSeriesData.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>シリーズ名</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="armorSeriesData.lv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>シリーズレベル</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value) || 0)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="armorSeriesData.imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>シリーズ画像URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label>強さローテーション</Label>
                <div className="flex flex-row gap-2">
                  <Button
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => handleStrengthButtonClick('WEAK')}
                    type="button"
                  >
                    弱い
                  </Button>
                  <Button
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => handleStrengthButtonClick('NORMAL')}
                    type="button"
                  >
                    普通
                  </Button>
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => handleStrengthButtonClick('STRONGER')}
                    type="button"
                  >
                    強い
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleStrengthButtonClick('STRONGEST')}
                    type="button"
                  >
                    最強
                  </Button>
                  <Button
                    className="bg-gray-500 hover:bg-gray-600"
                    onClick={() => handleStrengthButtonClick('UNKNOWN')}
                    type="button"
                  >
                    ？
                  </Button>
                  <Button
                    className="bg-gray-500 hover:bg-gray-600"
                    onClick={() => handleStrengthResetButtonClick()}
                    type="button"
                  >
                    リセット
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="armorData.0.strength"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          readOnly={true}
                          value={field.value?.join(',') || ''}
                          placeholder="例: STRONGEST,STRONGER,NORMAL"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label>防具部位選択</Label>
                <div className="flex flex-row gap-2">
                  {(['HEAD', 'BODY_UPPER', 'BODY_LOWER', 'ARMS', 'LEGS'] as const).map((part) => (
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
                      <FormField
                        control={form.control}
                        name={`armorActive.${part}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} id={part} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {form.watch('armorData').map(
              (armor, armorIndex) =>
                form.watch(`armorActive.${armor.parts}`) && (
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
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name={`armorData.${armorIndex}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>防具名</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`armorData.${armorIndex}.clothType`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>布特性</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="布特性を選択" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="NORMAL">通常</SelectItem>
                                <SelectItem value="REBIRTH">再生布</SelectItem>
                                <SelectItem value="RAINBOW">虹布</SelectItem>
                                <SelectItem value="HEART">会心布</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`armorData.${armorIndex}.imageUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>防具画像URL</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-y-2">
                        <Label>裁縫設定値</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {armor.settingValue.map((value, index) => (
                            <FormField
                              key={index}
                              control={form.control}
                              name={`armorData.${armorIndex}.settingValue.${index}`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      {...field}
                                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                      disabled={
                                        !needFieldsIndex
                                          .find((item) => item.parts === armor.parts)
                                          ?.index.includes(index)
                                      }
                                      placeholder="0"
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
            )}
          </div>
          <div className="mt-6">
            <Button type="submit" className="w-full">
              データを送信
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
