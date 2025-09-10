'use client';

import { useState } from 'react';
import Link from 'next/link';
// shadcn/ui
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
// 自作コンポーネント
import { LoadingSpinner } from '@/app/loading';
import { ArrowLeft, Send, Check } from 'lucide-react';
// Zod と React Hook Form
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// フォームデータの型
export interface FormData {
  type: string;
  title: string;
  description: string;
  contact?: string;
}

// バリデーションスキーマ
const formSchema = z.object({
  type: z.string().min(1, { message: '報告タイプは必須です' }),
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  description: z.string().min(1, { message: '詳細説明は必須です' }),
  contact: z.string().optional(),
});

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false); //ローディングフラグ（送信中）
  const [Sent, setSent] = useState<boolean>(false); //送信完了フラグ（送信完了時にtrueになる）

  // フォームの設定
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: '',
      title: '',
      description: '',
      contact: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }
      setSent(true); //送信完了フラグを立てる
      form.reset();
    } catch (error) {
      console.error('送信中にエラーが発生しました', error);
    } finally {
      setIsLoading(false);
    }
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* 報告タイプ */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-base font-medium">報告タイプ *</Label>
                    <FormControl>
                      <RadioGroup
                        className="flex flex-col space-y-1"
                        value={field.value}
                        onValueChange={field.onChange}
                        name="type"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bug" />
                          <span>不具合報告</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="feature" />
                          <span>改善要望</span>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* タイトル */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">タイトル *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="簡潔なタイトルを入力してください" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 詳細説明 */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">詳細説明 *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="不具合の詳細や改善要望の内容を具体的に記述してください"
                        className="min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 連絡先 */}
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">連絡先（任意）</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="メールアドレスやユーザー名など" className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 送信ボタン */}
              <div className="flex justify-end">
                {Sent ? (
                  <Button type="submit" className="w-full sm:w-auto bg-green-500 hover:bg-green-500" disabled>
                    <Check className="h-4 w-4 mr-1" />
                    送信完了
                  </Button>
                ) : (
                  <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                    {isLoading && <LoadingSpinner />}
                    <Send className="h-4 w-4 mr-1" />
                    送信する
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
