import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoadingSpinner } from '@/app/loading';
import { getIcon } from '@/utils/TopicIconMapper';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface Topic {
  id: number;
  icon: string;
  title: string;
  content: string;
  body: string;
  published: boolean;
}

interface TopicFormData {
  icon: string;
  title: string;
  content: string;
  body: string;
  published: boolean;
}

// バリデーションスキーマ
const formSchema = z.object({
  icon: z.string().min(1, { message: 'アイコンは必須です' }),
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  content: z.string().min(1, { message: '短い説明は必須です' }),
  body: z.string().min(1, { message: '詳細説明は必須です' }),
  published: z.boolean(),
});

interface TopicFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  onSubmit: (data: TopicFormData) => Promise<void>;
  topic?: Topic;
}

export default function TopicFormDialog({ isOpen, onClose, mode, onSubmit, topic }: TopicFormDialogProps) {
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false); // アクション中かどうか

  // フォームの設定
  const form = useForm<TopicFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      icon: 'Send',
      title: '',
      content: '',
      body: '',
      published: false,
    },
  });

  const resetForm = useCallback(
    (topicData?: Topic) => {
      if (topicData) {
        form.reset({
          icon: topicData.icon,
          title: topicData.title,
          content: topicData.content,
          body: topicData.body,
          published: topicData.published,
        });
      } else {
        form.reset({
          icon: 'Send',
          title: '',
          content: '',
          body: '',
          published: false,
        });
      }
    },
    [form]
  );
  // topicが変更された時にフォームの値を更新
  useEffect(() => {
    resetForm(topic);
  }, [topic, resetForm]);

  // バリデーションを通してフォームデータを取得
  const handleSubmit = async (data: TopicFormData) => {
    try {
      setIsActionLoading(true);
      await onSubmit(data);
      // 作成モードの場合のみフォームをリセット
      if (mode === 'create') {
        form.reset();
      }
      // ダイアログを閉じる
      onClose();
    } catch (error) {
      console.error({ mode: mode === 'create' ? 'トピック作成エラー' : 'トピック更新エラー', error });
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'トピックを作成' : 'トピックを更新'}</DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'トピックの作成画面です。作成したい場合は作成ボタンを押してください。'
              : 'このトピックの編集画面です。更新したい場合は更新ボタンを押してください。'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* アイコン選択 */}
            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">アイコン</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                        {(() => {
                          const IconComponent = getIcon(field.value);
                          return <IconComponent className="h-5 w-5 text-primary" />;
                        })()}
                      </div>
                      <select
                        {...field}
                        id="topic-icon"
                        name="icon"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      >
                        <option value="Send">Send</option>
                        <option value="TriangleAlert">TriangleAlert</option>
                        <option value="Info">Info</option>
                        <option value="Star">Star</option>
                        <option value="Bell">Bell</option>
                        <option value="Shield">Shield</option>
                      </select>
                    </div>
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
                  <FormLabel className="text-sm font-medium">タイトル</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="topic-title"
                      name="title"
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      placeholder="トピックのタイトルを入力"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 短い説明 */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">短い説明</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="topic-content"
                      name="content"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      placeholder="トピックの短い説明を入力"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 詳細内容 */}
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">詳細内容</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      id="topic-body"
                      name="body"
                      className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                      placeholder="トピックの詳細内容を入力（HTMLタグも使用可能）"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 公開/非公開 */}
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">公開状態</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value ? 'true' : 'false'}
                      onChange={(e) => field.onChange(e.target.value === 'true')}
                      id="topic-published"
                      name="published"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="true">公開</option>
                      <option value="false">非公開</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button variant="outline" onClick={() => onClose()}>
                キャンセル
              </Button>
              <Button type="submit" variant="default" className="bg-green-500 hover:bg-green-600">
                {isActionLoading && <LoadingSpinner />}
                {mode === 'create' ? '作成' : '更新'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
