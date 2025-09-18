'use client';

import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArmorSeries } from '@/types/armor';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
// 自作コンポーネント
import Loading from '@/app/loading';
import Image from 'next/image';
import Link from 'next/link';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react';
// ストレージ
import { getArmorImageUrl } from '@/utils/supabase/storage';
// 型
import { ClothType } from '@/types/armor';

export default function SearchPage() {
  const [armorSeries, setArmorSeries] = useState<ArmorSeries[]>([]);
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [totalLoaded, setTotalLoaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchArmorSeries = async () => {
      try {
        setIsLoading(true);
        // 初回のみtotalを取得
        const url = totalLoaded ? `/api/ArmorSeries?page=${page}&skipTotal=true` : `/api/ArmorSeries?page=${page}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('データの取得に失敗しました');
        }

        const data = await response.json();

        setArmorSeries(data.data);

        // 初回のみtotalを設定
        if (!totalLoaded && data.total) {
          setTotal(data.total);
          setTotalLoaded(true);
        }
      } catch (error) {
        console.error('検索ページで防具シリーズの取得エラー:', error);
        // エラー時は空配列を設定
        setArmorSeries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArmorSeries();
  }, [page, totalLoaded]);

  if (!totalLoaded || isLoading) return <Loading />;

  const clothConfig: Record<ClothType, { name: string; color: string }> = {
    REBIRTH: { name: '再生布', color: 'text-green-600' },
    RAINBOW: { name: '虹布', color: 'text-pink-500' },
    HEART: { name: '会心布', color: 'text-orange-500' },
    NORMAL: { name: '通常', color: 'text-gray-500' },
  };

  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 border-b bg-background z-50">
        <div className="flex items-center justify-between p-4 md:p-8 pt-6">
          <h2 className=" text-2xl font-bold">防具検索</h2>
          <Link href="/workspace">
            <Button variant="outline" size="default" className="shadow-md">
              <Home className="h-4 w-4" />
              <p className="text-base md:text-lg">ダッシュボードに戻る</p>
            </Button>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 gap-2">
          <div className="flex flex-row items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="shadow-md"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <p className="text-base md:text-lg">前のページ</p>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="shadow-md"
              onClick={() => setPage(page + 1)}
              disabled={page === Math.ceil(total / 15)}
            >
              <ChevronRight className="h-4 w-4" />
              <p className="text-base md:text-lg">次のページ</p>
            </Button>
          </div>
          <div className="flex flex-col md:items-end gap-2 pl-3">
            <p>
              {page} / {Math.ceil(total / 15)}ページ目
            </p>
            <p>表示件数: {armorSeries.length}件</p>
          </div>
        </div>
      </header>

      <Separator />
      {armorSeries.map((armorSeries) => (
        <Accordion key={armorSeries.id} type="multiple">
          <AccordionItem value={armorSeries.name}>
            <AccordionTrigger className="justify-start pl-4 pr-4">
              <div className="flex items-center gap-2 flex-1">
                <Image src={getArmorImageUrl(armorSeries.imageUrl)} alt={armorSeries.name} width={24} height={24} />
                <div>{armorSeries.name}</div>
              </div>
              <div className="text-sm pr-3">Lv: {armorSeries.lv}</div>
            </AccordionTrigger>
            <AccordionContent>
              {armorSeries.armors?.map((armor) => {
                return (
                  <div
                    key={armor.id}
                    className="flex flex-row items-center ml-7 space-y-1 border-l-2 border-gray-200 gap-2 p-2 pl-4"
                  >
                    <Image src={getArmorImageUrl(armor.imageUrl)} alt={armor.name} width={20} height={20} />
                    <Link href={`/workspace/channel/${armor.id}`} className="hover:underline">
                      <span className="text-sm">{armor.name}</span>
                      <span className={`text-xs ${clothConfig[armor.sewing.clothType].color}`}>
                        （{clothConfig[armor.sewing.clothType].name}）
                      </span>
                    </Link>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
