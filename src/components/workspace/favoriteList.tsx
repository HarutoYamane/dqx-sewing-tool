// Next.js
import Link from 'next/link';
import Image from 'next/image';
// アイコン
import { PlusCircle } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';
// データ型
import { Armor } from '@/types/armor';
// Zustandストア
import { useFavoriteStore } from '@/store/favoriteStore';

export default function FavoriteList({ armors, pathname }: { armors: Armor[]; pathname: string }) {
  const { favorites } = useFavoriteStore();

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
        {armors
          .filter((armor) => favorites.includes(armor.id))
          .map((armor) => (
            <Button
              key={armor.id}
              variant={pathname === `/workspace/channel/${armor.id}` ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href={`/workspace/channel/${armor.id}`}>
                <Image src={armor.imageUrl} alt={armor.name} width={20} height={20} />
                {armor.name}
              </Link>
            </Button>
          ))}
      </div>
    </div>
  );
}
