import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Hash, ThumbsUp, Activity } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { LoadingSpinner } from '@/app/loading';
import { getArmorImageUrl } from '@/utils/supabase/storage';
import { UserProfile } from '@/types/workspace';

type TotalSewingCount = number;

interface MaxSuccessRate {
  id: number;
  userId: string;
  armorId: number;
  threeStar: number;
  mistake: number;
  total: number;
  totalCount: number;
  successRate: number;
  createdAt: string;
  updatedAt: string;
  armor: {
    name: string;
    imageUrl: string;
  };
}

interface LatestPlayed {
  id: number;
  userId: string;
  armorId: number;
  threeStar: number;
  mistake: number;
  total: number;
  totalCount: number;
  successRate: number;
  createdAt: string;
  updatedAt: string;
  armor: {
    name: string;
    imageUrl: string;
  };
}

export default function StatsCard({ user }: { user: UserProfile }) {
  const [totalSewingCount, setTotalSewingCount] = useState<TotalSewingCount>(0); // ユーザーの裁縫合計回数データ
  const [maxSuccessRate, setMaxSuccessRate] = useState<MaxSuccessRate | null>(null); // ユーザーの最も大成功確率が高い商材
  const [latestPlayed, setLatestPlayed] = useState<LatestPlayed | null>(null); // ユーザーの最も最近プレイした商材
  const [isSewingStatsLoading, setIsSewingStatsLoading] = useState(false); // ユーザーの裁縫統計データのローディングフラグ
  const [isInitialized, setIsInitialized] = useState(false); // 初期化フラグ

  // 初回マウント時にユーザーの裁縫統計データを取得
  useEffect(() => {
    const fetchSewingStats = async () => {
      try {
        setIsSewingStatsLoading(true);
        const res = await fetch('/api/user/sewingStats', {
          method: 'POST',
          body: JSON.stringify({
            user: user,
          }),
        });
        if (!res.ok) {
          throw new Error('ユーザーの裁縫統計データの取得に失敗しました');
        }
        const { totalSewingCount, maxSuccessRate, latestPlayed } = await res.json();
        setTotalSewingCount(totalSewingCount);
        setMaxSuccessRate(maxSuccessRate);
        setLatestPlayed(latestPlayed);
      } catch (error) {
        console.error('ユーザーの裁縫統計データの取得に失敗しました:', error);
      } finally {
        setIsSewingStatsLoading(false);
      }
    };
    fetchSewingStats();
    setIsInitialized(true);
  }, [user]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">裁縫回数</CardTitle>
          <Hash className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        {isSewingStatsLoading || !isInitialized ? (
          <CardContent className="flex-1 overflow-auto">
            <LoadingSpinner />
          </CardContent>
        ) : (
          <CardContent>
            <div className="text-2xl font-bold">{totalSewingCount}</div>
            <p className="text-xs text-muted-foreground">今までの裁縫回数の合計</p>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">最も大成功率が高い</CardTitle>
          <ThumbsUp className="h-4 w-4  text-green-500" />
        </CardHeader>
        {isSewingStatsLoading || !isInitialized ? (
          <CardContent className="flex-1 overflow-auto">
            <LoadingSpinner />
          </CardContent>
        ) : (
          <CardContent>
            {maxSuccessRate !== null ? (
              <>
                <Link href={`/workspace/channel/${maxSuccessRate.armorId}`}>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={getArmorImageUrl(maxSuccessRate.armor.imageUrl)}
                      alt={maxSuccessRate.armor.name}
                      width={32}
                      height={32}
                    />
                    <div className="text-base font-bold hover:underline">{maxSuccessRate.armor.name}</div>
                  </div>
                </Link>
                <p className="text-xs text-muted-foreground">
                  大成功率：{(maxSuccessRate.successRate * 100).toFixed(1)} %（{maxSuccessRate.threeStar}回/
                  {maxSuccessRate.total}回）
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold text-muted-foreground pl-6">データなし</div>
            )}
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">最も最近プレイ</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        {isSewingStatsLoading || !isInitialized ? (
          <CardContent className="flex-1 overflow-auto">
            <LoadingSpinner />
          </CardContent>
        ) : (
          <CardContent>
            {latestPlayed !== null ? (
              <>
                <Link href={`/workspace/channel/${latestPlayed.armorId}`}>
                  <div className="flex flex-row items-center gap-2">
                    <Image
                      src={getArmorImageUrl(latestPlayed.armor.imageUrl)}
                      alt={latestPlayed.armor.name}
                      width={32}
                      height={32}
                    />
                    <div className="text-base font-bold hover:underline">{latestPlayed.armor.name}</div>
                  </div>
                </Link>
                <p className="text-xs text-muted-foreground">
                  プレイ日時：
                  {new Date(latestPlayed.updatedAt).toLocaleDateString()}
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold text-muted-foreground pl-6">データなし</div>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  );
}
