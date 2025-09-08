'use client';

// Next.js
import Link from 'next/link';
import Image from 'next/image';
// React
import { useEffect, useState } from 'react';
// アイコン
import { Hash, MessageSquare, Users, Search, Sword } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// 自作コンポーネント
import Loading from '@/app/loading';
// データ
import { topics } from '@/data/workspace';
// Zustandストア
import { useUserStore } from '@/store/useUserStore';
// ストレージ
import { getArmorImageUrl } from '@/utils/supabase/storage';

// 人気商材ランキングのアイコンの色を返す
const RankingColor = (index: number) => {
  if (index > 2) return 'bg-primary/10';
  else if (index === 2) return 'bg-amber-500'; // 銅色
  else if (index === 1) return 'bg-gray-300'; // 銀色
  else if (index === 0) return 'bg-yellow-300'; // 金色
};

interface TotalSewingCount {
  _sum: {
    totalCount: number;
  };
}

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

interface RankingItem {
  armorId: number;
  count: number;
  armorName: string;
  imageUrl: string;
}

export default function WorkSpacePage() {
  const [totalSewingCount, setTotalSewingCount] = useState<TotalSewingCount | null>(null); // ユーザーの裁縫合計回数データ
  const [maxSuccessRate, setMaxSuccessRate] = useState<MaxSuccessRate | null>(null); // ユーザーの最も大成功確率が高い商材
  const [latestPlayed, setLatestPlayed] = useState<LatestPlayed | null>(null); // ユーザーの最も最近プレイした商材
  const [rankingData, setRankingData] = useState<RankingItem[]>([]); // 人気商材ランキングのAPIから取得するデータ
  const [isSewingStatsLoading, setIsSewingStatsLoading] = useState(false); // ユーザーの裁縫統計データのローディングフラグ
  const [isRankingLoading, setIsRankingLoading] = useState(false); // 人気商材ランキングのローディングフラグ
  const [isInitialized, setIsInitialized] = useState(false); // 初期化フラグ

  const { user } = useUserStore();

  // 初回マウント時にユーザーの裁縫統計データと人気商材ランキングを取得
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
    const fetchRanking = async () => {
      try {
        setIsRankingLoading(true);
        const res = await fetch('/api/Armor/ranking');
        if (!res.ok) {
          throw new Error('人気商材ランキングの取得に失敗しました');
        }
        const data = await res.json();
        setRankingData(data);
      } catch (error) {
        console.error('人気商材ランキングの取得に失敗しました:', error);
      } finally {
        setIsRankingLoading(false);
      }
    };
    Promise.all([fetchSewingStats(), fetchRanking()]);
    setIsInitialized(true);
  }, [user]);

  if (isSewingStatsLoading || isRankingLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">ダッシュボード</h2>
        <div className="flex items-center gap-4">
          {user?.role === 'ADMIN' && (
            <Link href="/workspace/systemAdmin/addArmor">
              <Button variant="default" size="default" className="bg-green-500 hover:bg-green-600">
                <Sword className=" h-4 w-4 fill-white" />
                <p className="text-lg">防具を追加する</p>
              </Button>
            </Link>
          )}
          <Link href="/workspace/search">
            <Button variant="outline" size="default">
              <Search className="mr-2 h-4 w-4" />
              <p className="text-lg">商材を選ぶ</p>
            </Button>
          </Link>
          <Link href="/workspace/contact">
            <Button size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              <p>不具合報告・改善要望</p>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">裁縫回数</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSewingCount === null ? 0 : totalSewingCount._sum.totalCount}</div>
            <p className="text-xs text-muted-foreground">今までの裁縫回数の合計</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">最も大成功率が高い</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
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
                    <div className="text-lg font-bold hover:underline">{maxSuccessRate.armor.name}</div>
                  </div>
                </Link>
                <p className="text-xs text-muted-foreground">
                  大成功率：{(maxSuccessRate.successRate * 100).toFixed(1)} %
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold text-muted-foreground">データなし</div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">最も最近プレイ</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
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
                    <div className="text-lg font-bold hover:underline">{latestPlayed.armor.name}</div>
                  </div>
                </Link>
                <p className="text-xs text-muted-foreground">
                  プレイ日時：
                  {new Date(latestPlayed.updatedAt).toLocaleDateString()}
                </p>
              </>
            ) : (
              <div className="text-2xl font-bold text-muted-foreground">データなし</div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 flex flex-col max-h-[450px]">
          <CardHeader>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-col gap-1">
                <CardTitle>トピックス</CardTitle>
                <CardDescription>更新・変更情報の一覧</CardDescription>
              </div>
              {user?.role === 'ADMIN' && (
                <Link href="/workspace/systemAdmin/topicsManager">
                  <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600">
                    <Sword className=" h-4 w-4 fill-white" />
                    管理画面へ
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center">
                  <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <topic.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <div className="space-y-1">{topic.content}</div>
                    <div className="text-sm text-muted-foreground">{topic.createdAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 flex flex-col max-h-[450px]">
          <CardHeader>
            <CardTitle>人気商材</CardTitle>
            <CardDescription>最近多く作成されている防具ランキング</CardDescription>
          </CardHeader>
          {isRankingLoading || !isInitialized ? (
            <CardContent className="flex-1 overflow-auto">
              <Loading text="hidden" />
            </CardContent>
          ) : (
            <CardContent className="flex-1 overflow-auto">
              {rankingData.length === 0 ? (
                <p>ランキングデータが存在しません</p>
              ) : (
                <div className="space-y-4">
                  {rankingData.map((armor, index) => (
                    <div key={armor.armorId} className="flex items-center">
                      <div
                        className={`mr-4 flex h-9 w-9 items-center justify-center rounded-full ${RankingColor(index)}`}
                      >
                        <span className="font-medium text-primary">{index + 1}</span>
                      </div>
                      <div className="space-y-1 flex-1">
                        <Link
                          href={`/workspace/channel/${armor.armorId}`}
                          className="flex flex-row gap-3 items-center font-medium hover:underline"
                        >
                          <Image src={getArmorImageUrl(armor.imageUrl)} alt={armor.armorName} width={32} height={32} />
                          {armor.armorName}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
