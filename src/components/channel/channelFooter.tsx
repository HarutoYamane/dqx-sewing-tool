'use client';
// React
import { useEffect } from 'react';
// Next.js
import Link from 'next/link';
// shadcn/ui
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
// 自作コンポーネント
import Error from '@/app/error';
// アイコン
import { RotateCcw, CircleAlert } from 'lucide-react';
// Zustandストア
import { useResultStore } from '@/store/ResultStore';

export default function ChannelFooter({ channelId, isGuest }: { channelId: number; isGuest: boolean }) {
  const { result, isLoading, isUpdateLoading, isResetLoading, error, fetchResult, resetResult } = useResultStore();

  useEffect(() => {
    if (!isGuest) fetchResult(channelId); //ゲストユーザーではない場合は裁縫結果を取得
  }, [channelId, fetchResult, isGuest]);

  if (isLoading || isUpdateLoading || isResetLoading) {
    // 読み込み中または更新中またはリセット中
    return (
      <footer className="border-b bg-background z-10">
        <div className="h-14 flex items-center gap-4 px-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
            <p className="text-sm text-muted-foreground">読み込み中...</p>
          </div>
        </div>
      </footer>
    );
  }
  if (error) return <Error />;

  const handleReset = (channelId: number) => {
    if (isGuest) return;
    resetResult(channelId);
  };

  return (
    <footer className="border-b bg-background z-10">
      {isGuest ? (
        <div className="flex items-center justify-start px-4">
          <CircleAlert className="h-4 w-4 mr-2 text-red-500" />
          <p className="text-sm font-medium">
            裁縫結果を保存するには
            <Link href="/login" className="underline underline-offset-2 text-blue-500 hover:text-blue-800">
              ログイン
            </Link>
            が必要です
          </p>
        </div>
      ) : (
        <div className="h-20 md:h-14 flex items-center md:gap-4 px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <div className="flex items-center gap-2">
              <p className="text-sm">裁縫回数：{result !== null ? result.total : 0}回</p>
              <p className="text-sm">大成功回数：{result !== null ? result.threeStar : 0}回</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                大成功確率：
                {result !== null && result.total > 0 ? ((result.threeStar / result.total) * 100).toFixed(1) : '-'}%
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={isUpdateLoading || isResetLoading || isGuest}
                    variant="outline"
                    size="sm"
                    className="shadow-md"
                  >
                    <RotateCcw className="h-4 w-4" />
                    裁縫回数をリセット
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center">
                      <CircleAlert className="h-4 w-4 scale-150 mr-2 text-red-500" />
                      <span className="text-red-500">裁縫結果をリセット</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription>裁縫結果をリセットしますか？</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => handleReset(channelId)}
                    >
                      リセット
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
