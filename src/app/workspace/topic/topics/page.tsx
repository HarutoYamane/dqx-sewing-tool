'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// lucide-reactアイコン
import { Home, ChevronLeft, ChevronRight, Calendar, Clock, Slice, Trash, Sword } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { Separator } from '@/components/ui/separator';
// 自作コンポーネント
import TopicFormDialog from '@/components/topic/topicFormDialog';
import Loading, { LoadingSpinner } from '@/app/loading';
// ユーティリティ関数
import { getIcon } from '@/utils/TopicIconMapper';
// Zustandストア
import { useUserStore } from '@/store/useUserStore';

interface Topic {
  id: number;
  icon: string;
  title: string;
  content: string;
  body: string;
  published: boolean;
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

interface TopicFormData {
  icon: string;
  title: string;
  content: string;
  body: string;
}

export default function TopicsPage() {
  const { user } = useUserStore();
  const [topics, setTopics] = useState<Topic[]>([]); // トピックの一覧
  const [page, setPage] = useState<number>(1); // 現在のページ
  const [total, setTotal] = useState<number>(0); // トピックの総件数
  const [totalLoaded, setTotalLoaded] = useState<boolean>(false); // トピックの総件数の読み込み中かどうか
  const [isLoading, setIsLoading] = useState<boolean>(false); // トピックの読み込み中かどうか（ページ読み込み時）
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false); // トピックの削除ダイアログの開閉
  const [updateOpen, setUpdateOpen] = useState<boolean>(false); // トピックの更新ダイアログの開閉
  const [createOpen, setCreateOpen] = useState<boolean>(false); // トピックの作成ダイアログの開閉
  const [isActionLoading, setIsActionLoading] = useState<boolean>(false); // トピックの削除中かどうか
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0); // 再取得のトリガー
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null); // 対象のトピックID（削除、更新用）
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setIsLoading(true);
        // 初回のみtotalを取得（Adminは非公開も取得）
        let url: string;
        if (user?.role === 'ADMIN') {
          url = totalLoaded
            ? `/api/topic/topics?page=${page}&skipTotal=true&admin=true`
            : `/api/topic/topics?page=${page}&admin=true`;
        } else {
          url = totalLoaded ? `/api/topic/topics?page=${page}&skipTotal=true` : `/api/topic/topics?page=${page}`;
        }

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
  }, [page, totalLoaded, refreshTrigger, user?.role]);

  if (!totalLoaded || isLoading) return <Loading />;

  const openDeleteDialog = (id: number) => {
    // 削除ダイアログを開くときに削除対象のトピックIDを設定
    setSelectedTopicId(id);
    setDeleteOpen(true);
  };

  const openUpdateDialog = (id: number) => {
    // 更新ダイアログを開くときに更新対象のトピックIDを設定
    setSelectedTopicId(id);
    setUpdateOpen(true);
  };

  const handleDeleteTopic = async (id: number) => {
    try {
      setIsActionLoading(true);
      const response = await fetch(`/api/topic/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('トピックの削除に失敗しました');
      }
      setDeleteOpen(false);
      setSelectedTopicId(null);
      // 削除成功後、データを再取得
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('トピックの削除エラー:', error);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleUpdateTopic = async (data: TopicFormData) => {
    // API呼び出し
    const response = await fetch(`/api/topic/${selectedTopicId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('トピックの更新に失敗しました');
    }

    // 成功処理
    setSelectedTopicId(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleCreateTopic = async (data: TopicFormData) => {
    // API呼び出し
    const response = await fetch('/api/topic/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('トピックの作成に失敗しました');
    }
    // 成功処理
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 border-b bg-background z-50">
        <div className="flex items-center justify-between p-4 md:p-8 pt-6">
          <h2 className="text-2xl font-bold">トピックス一覧</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="default"
              onClick={() => setCreateOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              <Sword className="mr-2 h-4 w-4 fill-white" />
              <p className="text-lg">トピックを作成</p>
            </Button>
            <Link href="/workspace">
              <Button variant="outline" size="default">
                <Home className="mr-2 h-4 w-4" />
                <p className="text-lg">ダッシュボードに戻る</p>
              </Button>
            </Link>
          </div>
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
                        {user?.role === 'ADMIN' && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {topic.published ? '🌐 公開' : '🔐 非公開'}
                          </p>
                        )}
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
                    <div className="mt-4 flex flex-row justify-between">
                      <Link href={`/workspace/topic/${topic.id}`}>
                        <Button variant="outline" size="sm">
                          詳細を見る
                        </Button>
                      </Link>
                      {user?.role === 'ADMIN' && (
                        <div className="flex flex-row gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-red-400 hover:text-white"
                            onClick={() => openDeleteDialog(topic.id)}
                          >
                            <Trash className="h-4 w-4" />
                            削除
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-green-400 hover:text-white"
                            onClick={() => openUpdateDialog(topic.id)}
                          >
                            <Slice className="h-4 w-4" />
                            更新
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* 削除確認用ダイアログ */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>トピックを削除</AlertDialogTitle>
            <AlertDialogDescription>このトピックを削除しますか？</AlertDialogDescription>
          </AlertDialogHeader>
          {selectedTopicId &&
            (() => {
              const targetTopic = topics.find((t) => t.id === selectedTopicId);
              if (!targetTopic) return null;

              const IconComponent = getIcon(targetTopic.icon);
              const isUpdated = targetTopic.createdAt !== targetTopic.updatedAt;

              return (
                <>
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-lg font-bold">{targetTopic.title}</p>
                  </div>
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>作成: {new Date(targetTopic.createdAt).toLocaleDateString()}</span>
                    </div>
                    {isUpdated && (
                      <div className="flex flex-row items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>更新: {new Date(targetTopic.updatedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground line-clamp-2">{targetTopic.content}</p>
                </>
              );
            })()}
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteTopic(selectedTopicId!)}
              className="hover:bg-red-400 hover:text-white"
            >
              {isActionLoading && <LoadingSpinner />}
              <Trash className="h-4 w-4" />
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 更新用ダイアログ */}
      <TopicFormDialog
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        mode="edit"
        onSubmit={handleUpdateTopic}
        topic={selectedTopicId ? topics.find((t) => t.id === selectedTopicId) : undefined}
      />

      {/* 作成用ダイアログ */}
      <TopicFormDialog
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        mode="create"
        onSubmit={handleCreateTopic}
        topic={undefined} // 作成時はtopicは不要
      />
    </div>
  );
}
