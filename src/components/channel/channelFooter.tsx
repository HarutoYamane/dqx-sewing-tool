'use client';
// React
import { useEffect } from 'react';
// shadcn/ui
import { Button } from '@/components/ui/button';
// 自作コンポーネント
import Error from '@/app/error';
// アイコン
import { RotateCcw } from 'lucide-react';
// Zustandストア
import { useResultStore } from '@/store/ResultStore';

export default function ChannelFooter({ channelId }: { channelId: number }) {
  const { result, isLoading, isUpdateLoading, isResetLoading, error, fetchResult, resetResult } = useResultStore();

  useEffect(() => {
    fetchResult(channelId);
  }, [channelId, fetchResult]);

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
    resetResult(channelId);
  };

  return (
    <footer className="border-b bg-background z-10">
      <div className="h-14 flex items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <p className="text-sm">裁縫回数：{result !== null ? result.total : 0}回</p>
          <p className="text-sm">大成功回数：{result !== null ? result.threeStar : 0}回</p>
          <p className="text-sm text-muted-foreground">
            大成功確率：
            {result !== null && result.total > 0 ? ((result.threeStar / result.total) * 100).toFixed(1) : '-'}%
          </p>
          <Button
            disabled={isUpdateLoading || isResetLoading}
            variant="outline"
            size="sm"
            onClick={() => handleReset(channelId)}
          >
            <RotateCcw className="h-4 w-4" />
            裁縫回数をリセット
          </Button>
        </div>
      </div>
    </footer>
  );
}
