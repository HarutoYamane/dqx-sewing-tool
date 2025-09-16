'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Sword } from 'lucide-react';
// アイコンは utils/iconMapper.ts から取得
import { LoadingSpinner } from '@/app/loading';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserProfile } from '@/types/workspace';
import { getIcon } from '@/utils/TopicIconMapper';

interface Topics {
  id: number;
  icon: string;
  title: string;
  createdAt: string; // APIからは文字列として返される
  updatedAt: string; // APIからは文字列として返される
}

// アイコンマッピングは utils/iconMapper.ts で管理

export default function TopicsCard({ user }: { user: UserProfile | undefined }) {
  const [topics, setTopics] = useState<Topics[]>([]); // トピックスデータ
  const [isTopicsLoading, setIsTopicsLoading] = useState(false); // トピックスデータのローディングフラグ
  const [isInitialized, setIsInitialized] = useState(false); // 初期化フラグ
  const router = useRouter();

  // 初回マウント時にユーザーのトピックスデータを取得
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsTopicsLoading(true);
        const res = await fetch('/api/topic/workspace');
        if (!res.ok) {
          throw new Error('トピックスデータの取得に失敗しました');
        }
        const topics = await res.json();
        setTopics(topics);
      } catch (error) {
        console.error('トピックスデータの取得に失敗しました:', error);
      } finally {
        setIsTopicsLoading(false);
      }
    };
    fetchTopics();
    setIsInitialized(true);
  }, []);
  return (
    <Card className="col-span-1 flex flex-col max-h-[450px]">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>トピックス</CardTitle>
            <CardDescription>更新・変更情報の一覧</CardDescription>
          </div>
          {user?.role === 'ADMIN' ? (
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600"
              onClick={() => router.push('/workspace/topic/topics')}
            >
              <Sword className=" h-4 w-4 fill-white" />
              管理画面へ
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="shadow-md"
              onClick={() => router.push('/workspace/topic/topics')}
            >
              すべて見る
            </Button>
          )}
        </div>
      </CardHeader>
      {isTopicsLoading || !isInitialized ? (
        <CardContent className="flex-1 overflow-auto">
          <LoadingSpinner />
        </CardContent>
      ) : topics.length === 0 ? (
        <p className="pl-6">トピックスデータが存在しません</p>
      ) : (
        <CardContent className="flex-1 overflow-auto">
          <div className="space-y-4">
            {topics.map((topic) => {
              const IconComponent = getIcon(topic.icon); // アイコンコンポーネントを取得

              return (
                <div key={topic.id} className="flex items-center">
                  <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/workspace/topic/${topic.id}`}>
                      <div className="space-y-1 hover:underline">{topic.title}</div>
                    </Link>
                    <div className="flex flex-row justify-start gap-2">
                      <div className="text-sm text-muted-foreground">
                        {new Date(topic.createdAt).toLocaleDateString()}
                      </div>
                      {topic.createdAt !== topic.updatedAt && (
                        <div className="text-sm text-muted-foreground">
                          更新: {new Date(topic.updatedAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
