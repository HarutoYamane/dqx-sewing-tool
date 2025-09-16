'use client';

// Next.js
import { useRouter } from 'next/navigation';
// アイコン
import { MessageSquare, Search, Sword } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// 自作コンポーネント
import StatsCard from '@/components/workspace/dashboard/statsCard';
import RankingCard from '@/components/workspace/dashboard/rankingCard';
import TopicsCard from '@/components/workspace/dashboard/topicsCard';
// Zustandストア
import { useUserStore } from '@/store/useUserStore';

export default function WorkSpacePage() {
  const { user, isGuest } = useUserStore();
  const router = useRouter();

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* ヘッダー */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">ダッシュボード</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {user?.role === 'ADMIN' && (
            <Button
              variant="default"
              size="sm"
              className="bg-green-500 hover:bg-green-600 onclick"
              onClick={() => router.push('/workspace/addArmor')}
            >
              <Sword className=" h-4 w-4 fill-white" />
              <p className="text-lg">防具を追加する</p>
            </Button>
          )}
          <Button
            variant="outline"
            size="default"
            className="shadow-md border-2 border-yellow-400 animate-heartbeat onclick"
            onClick={() => router.push('/workspace/search')}
          >
            <Search className="mr-2 h-4 w-4 text-orange-500" />
            <p className="text-lg">商材を選ぶ</p>
          </Button>
          {isGuest ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" className="shadow-md" disabled={isGuest}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <p>不具合報告・改善要望</p>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>ログインが必要です</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button size="sm" className="shadow-md" onClick={() => router.push('/workspace/contact')}>
              <MessageSquare className="mr-2 h-4 w-4" />
              <p>不具合報告・改善要望</p>
            </Button>
          )}
        </div>
      </div>

      <StatsCard user={user || undefined} isGuest={isGuest} />

      <div className="grid gap-4 md:grid-cols-2">
        <TopicsCard user={user || undefined} />
        <RankingCard isGuest={isGuest} />
      </div>
    </div>
  );
}
