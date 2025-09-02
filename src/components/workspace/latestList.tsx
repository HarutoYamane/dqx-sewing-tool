'use client';

// Next.js
import Link from 'next/link';
import Image from 'next/image';
// react
import { useState } from 'react';
// shadcn/ui
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
// データ型
import type { ArmorSeries, Armor } from '@/types/armor';

export default function LatestList({
  armorSeries,
  armors,
  pathname,
}: {
  armorSeries: ArmorSeries[];
  armors: Armor[];
  pathname: string;
}) {
  const [openSeries, setOpenSeries] = useState<Set<number>>(new Set());

  const toggleSeries = (seriesId: number) => {
    const newOpenSeries = new Set(openSeries);
    if (newOpenSeries.has(seriesId)) {
      newOpenSeries.delete(seriesId);
    } else {
      newOpenSeries.add(seriesId);
    }
    setOpenSeries(newOpenSeries);
  };

  const getSeriesArmors = (seriesName: string) => {
    return armors.filter((armor) => armor.series === seriesName);
  };

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-tight">最新防具一覧</h2>
      </div>

      <div className="space-y-1 mt-2">
        {armorSeries
          .filter((armorSeries) => armorSeries.latest)
          .map((series) => {
            const isOpen = openSeries.has(series.id);
            const seriesArmors = getSeriesArmors(series.name);

            return (
              <div key={series.id} className="space-y-1">
                <Button
                  variant={pathname === `/workspace/channel/${series.id}` ? 'secondary' : 'ghost'}
                  onClick={() => toggleSeries(series.id)}
                  className="w-full justify-start gap-2"
                >
                  <Image src={series.imageUrl} alt={series.name} width={20} height={20} />
                  {series.name}
                  {isOpen ? <ChevronDown className="ml-auto h-4 w-4" /> : <ChevronRight className="ml-auto h-4 w-4" />}
                </Button>

                {/* ドロップダウンメニュー（アニメーション付き） */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {seriesArmors.length > 0 && (
                    <div className="ml-6 space-y-1 border-l-2 border-gray-200 pl-4 py-2">
                      {seriesArmors.map((armor) => (
                        <Link
                          key={armor.id}
                          href={`/workspace/channel/${armor.id}`}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200"
                        >
                          <Image src={armor.imageUrl} alt={armor.name} width={16} height={16} />
                          {armor.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
