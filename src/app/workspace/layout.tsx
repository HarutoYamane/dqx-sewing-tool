'use client';

// React
import { useState, useEffect } from 'react';
// Next.js
import { notFound } from 'next/navigation';
// アイコン
import { Menu } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
// 自作コンポーネント
import AppLogo from '@/components/workspace/rootLayout/appLogo';
import LatestList from '@/components/workspace/rootLayout/latestList';
import FavoriteList from '@/components/workspace/rootLayout/favoriteList';
import UserProfileBar from '@/components/workspace/rootLayout/userProfileBar';
import Loading from '@/app/loading';
import Error from '@/app/error';
// ストア
import { useUserStore } from '@/store/useUserStore';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

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
  }, [fetchCurrentUser]); //fetchCurrentUserが変更されることはないが、eslintの警告を回避するために追加

  if (!isInitialized || isLoading) return <Loading />;
  if (error) return <Error />;
  if (!user) return notFound();

  return (
    <div className="flex min-h-screen flex-col">
      {/* モバイルナビゲーション */}
      <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-background px-4 lg:hidden">
        <Sheet
          open={open}
          onOpenChange={(newOpen) => {
            if (!newOpen && isAnimating) {
              // アニメーション中は状態変更を無視
              return;
            }
            setOpen(newOpen);
            if (newOpen) {
              setIsAnimating(true);
              // アニメーション完了後にフラグをリセット
              setTimeout(() => setIsAnimating(false), 500);
            } else {
              setIsAnimating(true);
              setTimeout(() => setIsAnimating(false), 300);
            }
          }}
        >
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0">
            <SheetTitle className="sr-only">ナビゲーションメニュー</SheetTitle>
            <SheetDescription className="sr-only">
              アプリのロゴ、最新のトピック、お気に入り、ユーザープロフィールにアクセスできます
            </SheetDescription>
            <div className="px-6 py-4">
              <AppLogo SheetOpenChange={setOpen} />
            </div>
            <Separator />
            <div className="flex-1">
              <div className="px-2 py-2">
                <LatestList SheetOpenChange={setOpen} />
                <Separator className="my-2" />
                <FavoriteList SheetOpenChange={setOpen} />
              </div>
            </div>
            <Separator />
            <div className="p-4">
              <UserProfileBar userProfile={user} />
            </div>
          </SheetContent>
        </Sheet>
        <AppLogo />
      </header>

      {/* デスクトップレイアウト */}
      <div className="flex-1 lg:flex">
        {/* サイドバー (デスクトップのみ表示) */}
        <aside className="hidden border-r bg-background lg:flex lg:flex-col lg:w-[290px] lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:z-40">
          <div className="flex h-14 items-center border-b px-6">
            <AppLogo />
          </div>
          <div className="px-2 flex-1 overflow-y-auto">
            <LatestList />
            <Separator className="my-2" />
            <FavoriteList />
          </div>
          <div className="border-t bg-background p-4">
            <UserProfileBar userProfile={user} />
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex flex-col flex-1 lg:ml-[290px]">{children}</main>
      </div>
    </div>
  );
}
