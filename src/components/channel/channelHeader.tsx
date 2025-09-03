// 画像
import Image from 'next/image';
import Link from 'next/link';
// shadcn/ui
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
// アイコン
import { Heart, Search } from 'lucide-react';
// 型
import { Armor } from '@/types/armor';
// Zustandストア
import { useFavoriteStore } from '@/store/favoriteStore';

export default function ChannelHeader({ armor }: { armor: Armor }) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  let ClothDescription = '';
  if (armor.Type === '再生布') ClothDescription = '布特性：再生布（4回毎に、1マスが12~16戻る）';
  else if (armor.Type === '虹布')
    ClothDescription = '布特性：虹布（2回毎に、集中力1.5倍・会心率上昇・集中力半減効果が交互に発生）';
  else if (armor.Type === '会心布')
    ClothDescription = '布特性：会心布（4回毎に、1マスが会心率大幅上昇・縫い数値2倍になる）';
  else if (armor.Type === '倍半布')
    ClothDescription = '布特性：倍半布（2回毎に、縫い数値2倍・縫い数値1/2効果が交互に発生）';
  else if (armor.Type === '通常') ClothDescription = '布特性：通常（特性効果無し）';
  else ClothDescription = '説明文の取得に失敗しました。';

  return (
    <header className="sticky top-0 border-b bg-background z-50">
      <div className="h-14 flex items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <Image src={armor.imageUrl} alt={armor.name} width={32} height={32} />
          <h1 className="font-semibold">{armor.name}</h1>
        </div>
        <Separator orientation="vertical" className="h-6" />
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
            size="sm"
            onClick={() => {
              if (favorites.includes(armor.id)) {
                removeFavorite(armor.id);
              } else {
                addFavorite(armor.id);
              }
            }}
          >
            <Heart
              className={`h-4 w-4 ${favorites.includes(armor.id) ? 'text-red-500 fill-red-500' : 'text-gray-500'}`}
            />
            <span className="text-sm">お気に入り</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
