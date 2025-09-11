'use client';

// Next.js
import Link from 'next/link';
// アイコン
import { MessageSquare, Search, Sword } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';
// 自作コンポーネント
import StatsCard from '@/components/workspace/dashboard/statsCard';
import RankingCard from '@/components/workspace/dashboard/rankingCard';
import TopicsCard from '@/components/workspace/dashboard/topicsCard';
// Zustandストア
import { useUserStore } from '@/store/useUserStore';

export default function WorkSpacePage() {
  const { user } = useUserStore();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">ダッシュボード</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {user?.role === 'ADMIN' && (
            <Link href="/workspace/addArmor">
              <Button variant="default" size="sm" className="bg-green-500 hover:bg-green-600">
                <Sword className=" h-4 w-4 fill-white" />
                <p className="text-lg">防具を追加する</p>
              </Button>
            </Link>
          )}
          <Link href="/workspace/search">
            <Button variant="outline" size="default" className="shadow-md border-2 border-yellow-400 animate-heartbeat">
              <Search className="mr-2 h-4 w-4" />
              <p className="text-lg">商材を選ぶ</p>
            </Button>
          </Link>
          <Link href="/workspace/contact">
            <Button size="sm" className="shadow-md">
              <MessageSquare className="mr-2 h-4 w-4" />
              <p>不具合報告・改善要望</p>
            </Button>
          </Link>
        </div>
      </div>

      {user && <StatsCard user={user} />}

      <div className="grid gap-4 md:grid-cols-2">
        {user && <TopicsCard user={user} />}
        <RankingCard />
      </div>
    </div>
  );
}
