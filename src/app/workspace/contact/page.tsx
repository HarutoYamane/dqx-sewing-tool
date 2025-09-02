'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    contact: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    if (!formData.type || !formData.title || !formData.description) {
      toast({
        title: 'エラー',
        description: '必須項目を入力してください。',
        variant: 'destructive',
      });
      return;
    }

    // ここで実際の送信処理を行う（例：API呼び出し）
    console.log('送信データ:', formData);

    toast({
      title: '送信完了',
      description: 'ご報告ありがとうございます。内容を確認次第、対応いたします。',
    });

    // フォームをリセット
    setFormData({
      type: '',
      title: '',
      description: '',
      contact: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">不具合報告・改善要望</CardTitle>
            <Link href="/workspace">
              <Button variant="outline" size="default">
                <ArrowLeft className="h-4 w-4" />
                <p>戻る</p>
              </Button>
            </Link>
          </div>
          <CardDescription>
            アプリケーションの不具合や改善要望をお聞かせください。 <br />
            頂いたご意見は今後の改善に活用させていただきます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 報告タイプ */}
            <div className="space-y-2">
              <Label className="text-base font-medium">報告タイプ *</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) => handleInputChange('type', value)}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bug" id="bug" />
                  <Label htmlFor="bug">不具合報告</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="feature" id="feature" />
                  <Label htmlFor="feature">改善要望</Label>
                </div>
              </RadioGroup>
            </div>

            {/* タイトル */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-medium">
                タイトル *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="簡潔なタイトルを入力してください"
                className="w-full"
              />
            </div>

            {/* 詳細説明 */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-medium">
                詳細説明 *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="不具合の詳細や改善要望の内容を具体的に記述してください"
                className="min-h-[120px]"
              />
            </div>

            {/* 連絡先 */}
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-base font-medium">
                連絡先（任意）
              </Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
                placeholder="メールアドレスやユーザー名など"
                className="w-full"
              />
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-end">
              <Button type="submit" className="w-full sm:w-auto">
                送信する
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
