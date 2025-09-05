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

export default function ArmorPage() {
  // URL のパスからチャンネル ID を取得
  const { channelId } = useParams<{ channelId: string }>(); //動的なchannelIdを文字列で取得
  const channelIdNumber = parseInt(channelId, 10); //channelIdを数値に変換
  if (isNaN(channelIdNumber)) return notFound();

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-background z-50 border-b">
        <ChannelHeader channelId={channelIdNumber} />
      </div>
      <div className="flex flex-row gap-4 flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <SewingArea channelId={channelIdNumber} />
        </div>
        <Separator orientation="vertical" className="h-full" />
        <div className="flex-1 overflow-auto">
          <SewingValueArea />
        </div>
      </div>
      <div className="h-14 border-t bg-background">
        <ChannelFooter channelId={channelIdNumber} />
      </div>
    </div>
  );
}
