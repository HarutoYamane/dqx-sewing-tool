// Next.js
import Link from 'next/link';
import Image from 'next/image';
// アイコン
import { Hash, MessageSquare, Users, Search } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// データ
import { topics } from '@/data/workspace';
import { armors } from '@/data/armor';

//人気商材ランキングのアイコンの色を返す
const RankingColor = (index: number) => {
  if (index > 2) return 'bg-primary/10';
  else if (index === 2) return 'bg-amber-500'; // 銅色
  else if (index === 1) return 'bg-gray-300'; // 銀色
  else if (index === 0) return 'bg-yellow-300'; // 金色
};

export default function WorkSpacePage() {
  // TODO: これらのデータは、実際にはデータベースから取得する
  // 裁縫回数
  const Count = 100;
  // 自分の大成功率
  const mySuccessRate = '75%';
  // 裁縫職人ランク
  const Rank = 'A+';

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">ダッシュボード</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="default">
            <Search className="mr-2 h-4 w-4" />
            <p className="text-lg">商材を選ぶ</p>
          </Button>
          <Button size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            <p>不具合報告・改善要望</p>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">裁縫回数</CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Count}</div>
            <p className="text-xs text-muted-foreground">今までの裁縫回数の合計</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">大成功率</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mySuccessRate}</div>
            <p className="text-xs text-muted-foreground">今までの全商材の大成功率</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">職人ランク</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Rank}</div>
            <p className="text-xs text-muted-foreground">裁縫職人ランク</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>トピックス</CardTitle>
            <CardDescription>更新・変更情報の一覧</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topics.map((topic) => (
                <div key={topic.id} className="flex items-center">
                  <div className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <topic.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <div className="space-y-1">{topic.content}</div>
                    <div className="text-sm text-muted-foreground">{topic.createdAt}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>人気商材</CardTitle>
            <CardDescription>最近多く作成されている防具ランキング</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {armors.map((armor, index) => (
                <div key={armor.id} className="flex items-center">
                  <div className={`mr-4 flex h-9 w-9 items-center justify-center rounded-full ${RankingColor(index)}`}>
                    <span className="font-medium text-primary">{index + 1}</span>
                  </div>
                  <div className="space-y-1 flex-1">
                    <Link
                      href={`/workspace/channel/${armor.id}`}
                      className="flex flex-row gap-3 items-center font-medium hover:underline"
                    >
                      <Image src={armor.imageUrl} alt={armor.name} width={32} height={32} />
                      {armor.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
