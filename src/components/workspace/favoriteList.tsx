// Next.js
import Link from 'next/link';
import Image from 'next/image';
// react
import { useEffect, useState, useCallback } from 'react';
// アイコン
import { PlusCircle } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';
// 自作コンポーネント
import Loading from '@/app/loading';
import Error from '@/app/error';
// Zustandストア
import { useFavoriteStore } from '@/store/favoriteStore';
// ストレージ
import { getArmorImageUrl } from '@/utils/supabase/storage';

export default function FavoriteList() {
  const { favorites, isLoading, error, fetchFavorites } = useFavoriteStore();
  const [isInitialized, setIsInitialized] = useState(false);

  const initFavorites = useCallback(async () => {
    await fetchFavorites();
    setIsInitialized(true);
  }, [fetchFavorites]);

  useEffect(() => {
    // 初回読み込み時のみ実行
    initFavorites();
  }, [initFavorites]);

  // ローディング状態
  if (!isInitialized || isLoading) {
    return <Loading />;
  }

  // エラー状態
  if (error) {
    return <Error />;
  }

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">お気に入り</h2>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-4 w-4" />
          <span className="sr-only">お気に入り 追加</span>
        </Button>
      </div>

      <div className="space-y-1 mt-2">
        {favorites?.length === 0 && <p className="text-sm text-gray-500">お気に入り無し</p>}
        {favorites?.map((favorite, index) => (
          <Button variant="ghost" size="sm" key={index} className="w-full justify-start gap-2" asChild>
            <Link href={`/workspace/channel/${favorite.armorId}`}>
              <Image src={getArmorImageUrl(favorite.armor.imageUrl)} alt={favorite.armor.name} width={24} height={24} />
              {favorite.armor.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
