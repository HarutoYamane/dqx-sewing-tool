// Next.js
import Link from 'next/link';
import Image from 'next/image';
// アイコン
import { ArrowRight, ThumbsUp, Heart, Trophy } from 'lucide-react';
// shadcn/ui
import { Button } from '@/components/ui/button';

export default function TopPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold">
            <Image src="/images/Icons/AppLogo.png" alt="DQX - 裁縫職人ツール" width={32} height={32} />
            <span className="text-sm md:text-base whitespace-nowrap before:content-[''] before:md:content-['DQX_-_']">
              裁縫職人ツール
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link
                href="https://x.com/Hoppe_1559"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <svg
                  className="h-5 w-5 fill-current text-gray-600 hover:text-gray-800 transition-colors"
                  viewBox="0 0 24 24"
                  aria-label="X (旧Twitter)"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="text-sm text-gray-600 hover:text-gray-800 hover:underline">(管理人アカウント)</span>
              </Link>
            </div>
            <Link href="/login">
              <Button variant="outline" className="shadow-md">
                ログイン
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-green-500 hover:bg-green-600">新規登録</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-orange-600">
                    DQX - 裁縫職人ツール
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    DQX - 裁縫職人ツール は、MMORPGのドラゴンクエストX
                    オンラインの裁縫職人向けのアプリです。ゲーム内の裁縫作業を支援します。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1.5 bg-green-500 hover:bg-green-600 animate-heartbeat">
                      無料で始める
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  alt="DQX - 裁縫職人ツール Dashboard"
                  className="aspect-video overflow-hidden border-2 border-red-400 rounded-sm object-cover object-center"
                  src="/images/表紙.jpg"
                  width={550}
                  height={310}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">主な機能</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  DQX - 裁縫職人ツール が提供する主な機能をご紹介します
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
                <div className="rounded-full border-2 border-green-500 p-3 text-primary-foreground">
                  <ThumbsUp className="fill-green-500 text-green-500" />
                </div>
                <h3 className="text-xl font-bold">裁縫支援機能</h3>
                <p className="text-center text-muted-foreground">
                  裁縫商材の強さローテーションや設定値・現在値の確認、裁縫結果の保存が可能です。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
                <div className="rounded-full border-2 border-pink-500 p-3 text-primary-foreground">
                  <Heart className="fill-pink-500 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold">お気に入り機能</h3>
                <p className="text-center text-muted-foreground">
                  裁縫商材をお気に入りに登録して、簡単に裁縫作業を開始できます。
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-lg">
                <div className="rounded-full border-2 border-yellow-500 p-3 text-primary-foreground">
                  <Trophy className="fill-yellow-500 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold">ランキング機能</h3>
                <p className="text-center text-muted-foreground">
                  このアプリを利用するユーザー内で、最近人気な裁縫商材ランキングを確認できます。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t p-6">
        <div className="container mx-auto flex flex-col gap-4 px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 DQX - 裁縫職人ツール. All rights reserved.
          </p>
          <Link href="https://www.dqx.jp/online/" target="_blank" rel="noopener noreferrer">
            <p className="text-center text-sm text-blue-500 hover:underline leading-loose md:text-left">
              ドラゴンクエストX オンライン - 公式サイト
            </p>
          </Link>
          <Link href="https://hiroba.dqx.jp/sc/home/" target="_blank" rel="noopener noreferrer">
            <p className="text-center text-sm text-blue-500 hover:underline leading-loose md:text-left">
              ドラゴンクエストX 冒険者の広場 - 公式サイト
            </p>
          </Link>
        </div>
      </footer>
    </div>
  );
}
