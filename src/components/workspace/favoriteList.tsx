// Next.js
import Link from 'next/link';
import Image from 'next/image';
// アイコン
import { PlusCircle } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';
// データ型
import type { Favorite } from '@/types/workspace';

export default function FavoriteList({ favorites, pathname }: { favorites: Favorite[]; pathname: string }) {
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
        {favorites.map((favorite) => (
          <Button
            key={favorite.id}
            variant={pathname === `/workspace/channel/${favorite.id}` ? 'secondary' : 'ghost'}
            className="w-full justify-start gap-2"
            asChild
          >
            <Link href={`/workspace/channel/${favorite.id}`}>
              <Image src={favorite.imageUrl} alt={favorite.name} width={20} height={20} />
              {favorite.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
