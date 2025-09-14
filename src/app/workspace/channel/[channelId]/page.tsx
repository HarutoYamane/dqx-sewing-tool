'use client';
// 防具のID(armorId)をチャンネルIDとして利用する

// Next.js
import { useParams, notFound } from 'next/navigation';
// shadcn/ui
import { Separator } from '@/components/ui/separator';
// 自作コンポーネント
import ChannelHeader from '@/components/channel/channelHeader';
import SewingArea from '@/components/channel/sewingArea';
import SewingValueArea from '@/components/channel/sewingValueArea';
import ChannelFooter from '@/components/channel/channelFooter';
// Zustandストア
import { useUserStore } from '@/store/useUserStore';
import { UserProfile } from '@/types/workspace';

export default function ArmorPage() {
  const { user, isGuest } = useUserStore();
  // URL のパスからチャンネル ID を取得
  const { channelId } = useParams<{ channelId: string }>(); //動的なchannelIdを文字列で取得
  const channelIdNumber = parseInt(channelId, 10); //channelIdを数値に変換
  if (isNaN(channelIdNumber)) return notFound();

  return (
    <div className="flex flex-col h-full lg:h-screen">
      <div className="sticky top-0 bg-background z-50 border-b pl-3 pr-3 lg:pl-0 lg:pr-0">
        <ChannelHeader channelId={channelIdNumber} isGuest={isGuest} user={user as UserProfile} />
      </div>
      <div className="flex flex-col lg:flex-row gap-4 flex-1 overflow-hidden p-2">
        <div className="flex-1 overflow-auto min-h-0 lg:pl-3">
          <SewingArea channelId={channelIdNumber} isGuest={isGuest} />
        </div>
        <Separator orientation="horizontal" className="lg:hidden w-full" />
        <Separator orientation="vertical" className="hidden lg:block h-full" />
        <div className="flex-1 overflow-auto min-h-0">
          <SewingValueArea />
        </div>
      </div>
      <div className="h-14 border-t bg-background">
        <ChannelFooter channelId={channelIdNumber} isGuest={isGuest} />
      </div>
    </div>
  );
}
