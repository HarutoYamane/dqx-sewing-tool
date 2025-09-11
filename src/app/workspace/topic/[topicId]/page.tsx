'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loading from '@/app/loading';
import { getIcon } from '@/utils/TopicIconMapper';
import { useUserStore } from '@/store/useUserStore';

interface Topic {
  id: number;
  icon: string;
  title: string;
  content: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export default function TopicPage() {
  const { user } = useUserStore();
  const { topicId } = useParams<{ topicId: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setIsLoading(true);
        const res =
          user?.role === 'ADMIN'
            ? await fetch(`/api/topic/${topicId}?admin=true`)
            : await fetch(`/api/topic/${topicId}`);

        if (!res.ok) {
          if (res.status === 404) {
            setError('トピックスが見つかりません');
            return;
          }
          throw new Error('トピックスの取得に失敗しました');
        }

        const topicData = await res.json();
        setTopic(topicData);
      } catch (err) {
        console.error('トピックスの取得に失敗しました:', err);
        setError('トピックスの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    if (topicId) {
      fetchTopic();
    }
  }, [topicId, user?.role]);

  if (isLoading) return <Loading />;

  if (error || !topic) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">エラー</h1>
          <p className="text-muted-foreground mb-6">{error || 'トピックスが見つかりません'}</p>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Link href="/workspace">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                ダッシュボードに戻る
              </Button>
            </Link>
            <Link href="/workspace/topic/topics">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                トピックス一覧に戻る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const IconComponent = getIcon(topic.icon);
  const isUpdated = topic.createdAt !== topic.updatedAt;

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        {/* 戻るボタン */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <Link href="/workspace">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                ダッシュボードに戻る
              </Button>
            </Link>
            <Link href="/workspace/topic/topics">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                トピックス一覧に戻る
              </Button>
            </Link>
          </div>
        </div>

        {/* トピックス詳細 */}
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                <IconComponent className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{topic.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
            {/* 短い説明 */}
            <div className="mb-6">
              <p className="text-lg text-muted-foreground">{topic.content}</p>
            </div>

            {/* 詳細内容 */}
            <div className="prose max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: topic.body }}
                className="prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
