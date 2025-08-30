// Next.js
import Link from 'next/link';
import Image from 'next/image';
// shadcn/ui
import { Button } from '@/components/ui/button';
// データ型
import type { Latest } from '@/types/workspace';

export default function LatestList({ latests, pathname }: { latests: Latest[]; pathname: string }) {
  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">最新防具一覧</h2>
      </div>

      <div className="space-y-1 mt-2">
        {latests.map((latest) => (
          <Button
            key={latest.id}
            variant={pathname === `/workspace/channel/${latest.id}` ? 'secondary' : 'ghost'}
            className="w-full justify-start gap-2"
            asChild
          >
            <Link href={`/workspace/channel/${latest.id}`}>
              <Image src={latest.imageUrl} alt={latest.name} width={20} height={20} />
              {latest.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
