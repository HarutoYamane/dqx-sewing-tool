'use client';
// 防具のID(armorId)をチャンネルIDとして利用する

// Next.js
import { useParams, notFound } from 'next/navigation';
// コンポーネント
import ChannelHeader from '@/components/channel/channelHeader';
import SewingArea from '@/components/channel/sewingArea';
import SewingValueArea from '@/components/channel/sewingValueArea';
import ChannelFooter from '@/components/channel/channelFooter';
// データ
import { getChannel } from '@/data/armor';
import { Separator } from '@/components/ui/separator';

export default function ArmorPage() {
  // URL のパスからチャンネル ID を取得
  const { channelId } = useParams<{ channelId: string }>(); //動的なchannelIdを文字列で取得
  const channelIdNumber = parseInt(channelId, 10); //channelIdを数値に変換
  if (isNaN(channelIdNumber)) return notFound(); //channelIdが数値でない場合は404エラー

  const armor = getChannel(channelIdNumber); //channelId(armorId)に対応する防具情報を取得
  if (!armor) return notFound(); //channelId(armorId)に対応するチャンネルがない場合は404エラー

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-background z-50 border-b">
        <ChannelHeader armor={armor} />
      </div>
      <div className="flex flex-row gap-4 flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <SewingArea armor={armor} />
        </div>
        <Separator orientation="vertical" className="h-full" />
        <div className="flex-1 overflow-auto">
          <SewingValueArea />
        </div>
      </div>
      <div className="h-14 border-t bg-background">
        <ChannelFooter />
      </div>
    </div>
  );
}
