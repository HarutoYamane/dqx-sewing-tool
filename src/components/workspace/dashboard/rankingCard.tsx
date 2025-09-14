import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getArmorImageUrl } from '@/utils/supabase/storage';
import { LoadingSpinner } from '@/app/loading';

// 人気商材ランキングのアイコンの色を返す
const RankingColor = (index: number) => {
  if (index > 2) return 'bg-primary/10';
  else if (index === 2) return 'bg-amber-500'; // 銅色
  else if (index === 1) return 'bg-gray-300'; // 銀色
  else if (index === 0) return 'bg-yellow-300'; // 金色
};

interface RankingItem {
  armorId: number;
  count: number;
  armorName: string;
  imageUrl: string;
}

export default function RankingCard({ isGuest }: { isGuest: boolean }) {
  const [rankingData, setRankingData] = useState<RankingItem[]>([]); // 人気商材ランキングのAPIから取得するデータ
  const [isRankingLoading, setIsRankingLoading] = useState(false); // 人気商材ランキングのローディングフラグ
  const [isInitialized, setIsInitialized] = useState(false); // 初期化フラグ

  // 初回マウント時に人気商材ランキング上位10件を取得
  useEffect(() => {
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
    if (!isGuest) fetchRanking(); //ゲストユーザーは人気商材ランキングを取得する必要がない
    setIsInitialized(true);
  }, [isGuest]);

  return (
    <Card className="col-span-1 flex flex-col max-h-[450px]">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <CardTitle>人気商材</CardTitle>
            <CardDescription>最近多く作成されている防具ランキング</CardDescription>
          </div>
          <Trophy className="h-6 w-6  text-yellow-500" />
        </div>
      </CardHeader>
      {isGuest ? (
        <CardContent className="flex-1 flex items-center justify-center bg-gray-500">
          <p className="text-white font-medium">ログインが必要です</p>
        </CardContent>
      ) : isRankingLoading || !isInitialized ? (
        <CardContent className="flex-1 overflow-auto">
          <LoadingSpinner />
        </CardContent>
      ) : (
        <CardContent className="flex-1 overflow-auto">
          {rankingData.length === 0 ? (
            <p className="pl-6">ランキングデータが存在しません</p>
          ) : (
            <div className="space-y-4">
              {rankingData.map((armor, index) => (
                <div key={armor.armorId} className="flex items-center">
                  <div className={`mr-4 flex h-9 w-9 items-center justify-center rounded-full ${RankingColor(index)}`}>
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
  );
}
