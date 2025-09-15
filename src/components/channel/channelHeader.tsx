// 画像
import Image from 'next/image';
import Link from 'next/link';
// shadcn/ui
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
// 自作コンポーネント
import Error from '@/app/error';
// アイコン
import { Heart, Search } from 'lucide-react';
// 型
import { Armor } from '@/types/armor';
// Zustandストア
import { useFavoriteStore } from '@/store/favoriteStore';
// ストレージ
import { getArmorImageUrl } from '@/utils/supabase/storage';

export default function ChannelHeader({ armorData, isGuest }: { armorData: Armor; isGuest: boolean }) {
  const { favorites, isLoading, isUpdateLoading, error, addFavorite, deleteFavorite } = useFavoriteStore();

  // エラー状態
  if (error) {
    return <Error />;
  }

  let ClothDescription: string = '';
  if (armorData?.sewing.clothType === 'REBIRTH') ClothDescription = '再生布（4回毎に、1マスが12~16戻る）';
  else if (armorData?.sewing.clothType === 'RAINBOW')
    ClothDescription = '虹布（2回毎に、集中力1.5倍・会心率上昇・集中力半減効果が交互に発生）';
  else if (armorData?.sewing.clothType === 'HEART')
    ClothDescription = '会心布（4回毎に、1マスが会心率大幅上昇・縫い数値2倍になる）';
  else if (armorData?.sewing.clothType === 'NORMAL') ClothDescription = '通常（特性効果無し）';
  else ClothDescription = '説明文の取得に失敗しました。';

  return (
    <header className="sticky top-0 border-b bg-background z-40">
      <div className="h-14 flex items-center gap-4 px-1 md:px-4">
        <div className="flex items-center gap-2">
          <Image src={getArmorImageUrl(armorData.imageUrl)} alt={armorData.name} width={32} height={32} />
          <h1 className="text-xs sm:text-base font-semibold">{armorData.name}</h1>
        </div>
        <Separator orientation="vertical" className="h-6 hidden sm:block" />
        <p className="text-sm text-muted-foreground hidden sm:block">
          布特性：{ClothDescription.split('（')[0]}
          <span className="hidden xl:inline">（{ClothDescription.split('（')[1]}</span>
        </p>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/workspace/search">
            <Button variant="outline" size="sm" className="shadow-md">
              <Search className="h-4 w-4" />
              <span className="text-sm">防具検索</span>
            </Button>
          </Link>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  disabled={isLoading || isUpdateLoading || isGuest} // 読込み中または更新中は押せない
                  size="sm"
                  className="shadow-md"
                  onClick={() => {
                    if (favorites && favorites.some((favorite) => favorite.armorId === armorData.id)) {
                      //someの戻り値（boolean）
                      const favorite = favorites.find((f) => f.armorId === armorData.id);
                      //該当するオブジェクト(Favorite型)を取得
                      if (favorite) {
                        deleteFavorite(favorite.id); // //そのオブジェクトのIdを削除
                      }
                    } else {
                      addFavorite(armorData.id, new Date());
                    }
                  }}
                >
                  {isUpdateLoading && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
                  )}
                  {!isUpdateLoading && (
                    <Heart
                      className={`h-4 w-4 ${
                        isGuest || !favorites || !favorites.some((favorite) => favorite.armorId === armorData.id) //ゲストユーザーお気に入りに追加されていない場合はグレー
                          ? 'text-gray-500'
                          : 'text-red-500 fill-red-500'
                      }`}
                    />
                  )}
                  <span className="text-sm hidden md:block">お気に入り</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isGuest ? 'ログインが必要です' : 'お気に入りの追加・削除ができます'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
