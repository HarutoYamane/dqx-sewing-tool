'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Loading from '@/app/loading';
import { getIcon } from '@/utils/TopicIconMapper';

interface Topic {
  id: number;
  icon: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface TopicsResponse {
  data: Topic[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [totalLoaded, setTotalLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        // 初回のみtotalを取得
        const url = totalLoaded ? `/api/topic/topics?page=${page}&skipTotal=true` : `/api/topic/topics?page=${page}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }

        const data: TopicsResponse = await response.json();

        setTopics(data.data);

        // 初回のみtotalを設定
        if (!totalLoaded && data.total) {
          setTotal(data.total);
          setTotalLoaded(true);
        }
      } catch (error) {
        console.error('トピックス一覧の取得エラー:', error);
        // エラー時は空配列を設定
        setTopics([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, [page, totalLoaded]);

  if (!totalLoaded || isLoading) return <Loading />;

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 border-b bg-background z-50">
        <div className="flex items-center justify-between p-4 md:p-8 pt-6">
          <h2 className="text-2xl font-bold">トピックス一覧</h2>
          <Link href="/workspace">
            <Button variant="outline" size="default">
              <Home className="mr-2 h-4 w-4" />
              <p className="text-lg">ダッシュボードに戻る</p>
            </Button>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-between p-4 gap-2">
          <div className="flex flex-row items-center gap-2">
            <Button variant="outline" size="default" onClick={() => setPage(page - 1)} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
              <p className="text-lg">前のページ</p>
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => setPage(page + 1)}
              disabled={page === Math.ceil(total / 15)}
            >
              <ChevronRight className="h-4 w-4" />
              <p className="text-lg">次のページ</p>
            </Button>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p>
              {page} / {Math.ceil(total / 15)}ページ目
            </p>
            <p>表示件数: {topics.length}件</p>
          </div>
        </div>
      </header>

      <Separator />

      <div className="flex-1 overflow-auto">
        {topics.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">トピックスがありません</p>
          </div>
        ) : (
          <div className="space-y-4 p-4">
            {topics.map((topic) => {
              const IconComponent = getIcon(topic.icon);
              const isUpdated = topic.createdAt !== topic.updatedAt;

              return (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <Link href={`/workspace/topic/${topic.id}`}>
                          <CardTitle className="text-xl hover:underline cursor-pointer">{topic.title}</CardTitle>
                        </Link>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>作成: {new Date(topic.createdAt).toLocaleDateString()}</span>
                          </div>
                          {isUpdated && (
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>更新: {new Date(topic.updatedAt).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-2">{topic.content}</p>
                    <div className="mt-4">
                      <Link href={`/workspace/topic/${topic.id}`}>
                        <Button variant="outline" size="sm">
                          詳細を見る
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
