'use client';
// React
import { useState, useEffect } from 'react';
// shadcn/ui
import { Button } from '@/components/ui/button';
// 自作コンポーネント
import Loading from '@/app/loading';
// アイコン
import { RotateCcw } from 'lucide-react';
// データ型
import { Result } from '@/types/armor';

export default function ChannelFooter({ channelId }: { channelId: number }) {
  const [result, setResult] = useState<Result | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/Armor/Channel/Result?channelId=${channelId}`);

        if (!response.ok) {
          // 404エラー（リザルトレコードが存在しない）の場合は正常な状態として扱う
          if (response.status === 404) {
            setResult(null);
            return;
          }
          // その他のHTTPエラーはコンソールに出力
          console.error(`HTTP error! status: ${response.status}`);
          setResult(null);
          return;
        }

        const data = await response.json();
        setResult(data);
      } catch (error) {
        // ネットワークエラーやJSONパースエラーなど
        console.error('防具毎の裁縫結果取得エラー:', error);
        setResult(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [channelId]);

  if (isLoading) return <Loading />;

  return (
    <footer className="border-b bg-background z-10">
      <div className="h-14 flex items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <p>トータル裁縫回数：{result !== null ? result.total : 0}回</p>
          <p>大成功回数：{result !== null ? result.threeStar : 0}回</p>
          <p className="text-sm text-muted-foreground">
            大成功確率：{result !== null ? result.threeStar / result.total : '-'}%
          </p>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4" />
            裁縫回数をリセット
          </Button>
        </div>
      </div>
    </footer>
  );
}
