'use client';
// 防具のID(armorId)をチャンネルIDとして利用する

// Next.js
import { useParams, notFound } from 'next/navigation';
// React
import { useEffect, useState, useCallback } from 'react';
// shadcn/ui
import { Separator } from '@/components/ui/separator';
// 自作コンポーネント
import ChannelHeader from '@/components/channel/channelHeader';
import SewingArea from '@/components/channel/sewingArea';
import SewingValueArea from '@/components/channel/sewingValueArea';
import ChannelFooter from '@/components/channel/channelFooter';
import Loading from '@/app/loading';
// Zustandストア
import { useUserStore } from '@/store/useUserStore';
import { useFavoriteStore } from '@/store/favoriteStore';
// 型
import { Armor, Sewing } from '@/types/armor';

export default function ArmorPage() {
  const { isGuest } = useUserStore();
  const { fetchFavorites } = useFavoriteStore();
  const [isLoading, setIsLoading] = useState(false);
  const [armorData, setArmorData] = useState<Armor | null>(null);
  const [sewingData, setSewingData] = useState<Sewing | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // URL のパスからチャンネル ID を取得
  const { channelId } = useParams<{ channelId: string }>(); //動的なchannelIdを文字列で取得
  const channelIdNumber = parseInt(channelId, 10); //channelIdを数値に変換

  const initFavorites = useCallback(async () => {
    await fetchFavorites();
  }, [fetchFavorites]);

  useEffect(() => {
    if (isNaN(channelIdNumber)) {
      notFound();
    }
    const fetchArmor = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/Armor/Channel/Armor?channelId=${channelId}`);
        const data = await response.json();
        setArmorData(data);
        setSewingData(data.sewing);
      } catch (error) {
        console.error('防具取得エラー:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArmor();
    if (!isGuest) initFavorites(); //ゲストユーザーはお気に入りを取得する必要がない
    setIsInitialized(true);
  }, [channelId, initFavorites, isGuest]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || !armorData || !sewingData || !isInitialized) return <Loading />;

  return (
    <div className="flex flex-col h-full xl:h-screen">
      <div className="sticky top-0 bg-background border-b z-40 px-2">
        <ChannelHeader armorData={armorData} isGuest={isGuest} />
      </div>
      <div className="flex flex-col xl:flex-row gap-4 flex-1 xl:overflow-hidden py-4">
        <div className="flex-1 xl:overflow-auto xl:min-h-0 px-2 md:px-4">
          <SewingArea sewingData={sewingData} parts={armorData.parts} channelId={channelIdNumber} isGuest={isGuest} />
        </div>
        <Separator orientation="horizontal" className="xl:hidden w-full" />
        <Separator orientation="vertical" className="hidden xl:block h-full" />
        <div className="flex-1 xl:overflow-auto xl:min-h-0 px-3 md:px-4 xl:px-0">
          <SewingValueArea />
        </div>
      </div>
      <div>
        <ChannelFooter channelId={channelIdNumber} isGuest={isGuest} />
      </div>
    </div>
  );
}
