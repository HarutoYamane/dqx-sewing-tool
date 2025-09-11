// 画像
import Image from 'next/image';
import Link from 'next/link';
// React
import { useState, useEffect, useCallback } from 'react';
// shadcn/ui
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
// 自作コンポーネント
import Loading from '@/app/loading';
import Error from '@/app/error';
// アイコン
import { Heart, Search } from 'lucide-react';
// 型
import { Armor } from '@/types/armor';
// Zustandストア
import { useFavoriteStore } from '@/store/favoriteStore';
import { useUserStore } from '@/store/useUserStore';
// ストレージ
import { getArmorImageUrl } from '@/utils/supabase/storage';

export default function ChannelHeader({ channelId }: { channelId: number }) {
  const { favorites, isLoading, isUpdateLoading, error, fetchFavorites, addFavorite, deleteFavorite } =
    useFavoriteStore();
  const { user } = useUserStore();
  const [isInitialized, setIsInitialized] = useState(false);

  const initFavorites = useCallback(async () => {
    await fetchFavorites();
    setIsInitialized(true);
  }, [fetchFavorites]);

  useEffect(() => {
    // 初回読み込み時のみ実行
    initFavorites();
  }, [initFavorites]);

  const [armor, setArmor] = useState<Armor | null>(null);
  const [isLoadingArmor, setIsLoadingArmor] = useState(false);

  useEffect(() => {
    const fetchArmor = async () => {
      try {
        setIsLoadingArmor(true);
        const response = await fetch(`/api/Armor/Channel/Armor?channelId=${channelId}`);
        const data = await response.json();
        setArmor(data);
      } catch (error) {
        console.error('防具取得エラー:', error);
      } finally {
        setIsLoadingArmor(false);
      }
    };
    fetchArmor();
  }, [channelId]);

  // ローディング状態
  if (!isInitialized || isLoading || isLoadingArmor || !armor || !favorites || !user) {
    return <Loading />;
  }

  // エラー状態
  if (error) {
    return <Error />;
  }

  let ClothDescription = '';
  if (armor?.sewing.clothType === 'REBIRTH') ClothDescription = '布特性：再生布（4回毎に、1マスが12~16戻る）';
  else if (armor?.sewing.clothType === 'RAINBOW')
    ClothDescription = '布特性：虹布（2回毎に、集中力1.5倍・会心率上昇・集中力半減効果が交互に発生）';
  else if (armor?.sewing.clothType === 'HEART')
    ClothDescription = '布特性：会心布（4回毎に、1マスが会心率大幅上昇・縫い数値2倍になる）';
  else if (armor?.sewing.clothType === 'NORMAL') ClothDescription = '布特性：通常（特性効果無し）';
  else ClothDescription = '説明文の取得に失敗しました。';

  return (
    <header className="sticky top-0 border-b bg-background z-50">
      <div className="h-14 flex items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <Image src={getArmorImageUrl(armor.imageUrl)} alt={armor.name} width={32} height={32} />
          <h1 className="font-semibold">{armor.name}</h1>
        </div>
        <Separator orientation="vertical" className="h-6 hidden md:block" />
        <p className="text-sm text-muted-foreground hidden md:block">{ClothDescription}</p>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/workspace/search">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4" />
              <span className="text-sm">防具検索</span>
            </Button>
          </Link>
          {/* お気に入りに追加する処理を実装予定 今は見た目のみ */}
          <Button
            variant="outline"
            disabled={isLoading || isUpdateLoading} // 読込み中または更新中は押せない
            size="sm"
            onClick={() => {
              if (favorites.some((favorite) => favorite.armorId === armor.id)) {
                //someの戻り値（boolean）
                const favorite = favorites.find((f) => f.armorId === armor.id);
                //該当するオブジェクト(Favorite型)を取得
                if (favorite) {
                  deleteFavorite(favorite.id); // //そのオブジェクトのIdを削除
                }
              } else {
                addFavorite(armor.id, new Date());
              }
            }}
          >
            {isUpdateLoading && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
            )}
            {!isUpdateLoading && (
              <Heart
                className={`h-4 w-4 ${
                  favorites.some((favorite) => favorite.armorId === armor.id)
                    ? 'text-red-500 fill-red-500'
                    : 'text-gray-500'
                }`}
              />
            )}
            <span className="text-sm hidden md:block">お気に入り</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
