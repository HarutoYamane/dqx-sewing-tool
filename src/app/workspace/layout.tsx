'use client';

// React
import { useState, useEffect } from 'react';
// Next.js
import { usePathname, notFound } from 'next/navigation';
// アイコン
import { Menu } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
// 自作コンポーネント
import AppLogo from '@/components/workspace/appLogo';
import LatestList from '@/components/workspace/latestList';
import FavoriteList from '@/components/workspace/favoriteList';
import UserProfileBar from '@/components/workspace/userProfileBar';
import Loading from '@/app/loading';
import Error from '@/app/error';
// データ
import { users } from '@/data/workspace';
import { armors, armorSeries } from '@/data/armor';
// ストア
import { useUserStore } from '@/store/useUserStore';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  // ユーザーストアから状態とアクションを取得
  const { user, isLoading, error, fetchCurrentUser } = useUserStore();
  const [isInitialized, setIsInitialized] = useState(false);

  // コンポーネントマウント時にユーザー情報を取得
  useEffect(() => {
    const initUser = async () => {
      await fetchCurrentUser();
      setIsInitialized(true);
    };

    initUser();
  }, [fetchCurrentUser]);

  if (!isInitialized || isLoading) return <Loading />;
  if (error) return <Error />;
  if (!user) return notFound();

  return (
    <div className="flex min-h-screen flex-col">
      {/* モバイルナビゲーション */}
      <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="px-6 py-4">
              <AppLogo />
            </div>
            <Separator />
            <div className="flex-1">
              <div className="px-2 py-2">
                <LatestList armorSeries={armorSeries} armors={armors} pathname={pathname} />
                <Separator className="my-2" />
                <FavoriteList armors={armors} pathname={pathname} />
              </div>
            </div>
            <Separator />
            <div className="p-4">
              <UserProfileBar userProfile={users[0]} />
            </div>
          </SheetContent>
        </Sheet>
        <AppLogo />
      </header>

      {/* デスクトップレイアウト */}
      <div className="flex-1 items-start lg:grid lg:grid-cols-[280px_1fr]">
        {/* サイドバー (デスクトップのみ表示) */}
        <aside className="hidden border-r bg-background lg:flex lg:flex-col lg:justify-between lg:h-full">
          <div className="flex h-14 items-center border-b px-6">
            <AppLogo />
          </div>
          <div className="px-2 flex-1">
            <LatestList armorSeries={armorSeries} armors={armors} pathname={pathname} />
            <Separator className="my-2" />
            <FavoriteList armors={armors} pathname={pathname} />
          </div>
          <div className="sticky bottom-0 border-t bg-background p-4">
            <UserProfileBar userProfile={users[0]} />
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex flex-col h-screen">{children}</main>
      </div>
    </div>
  );
}
