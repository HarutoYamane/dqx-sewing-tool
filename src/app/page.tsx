// Next.js
import Link from 'next/link';
import Image from 'next/image';
// アイコン
import { ArrowRight, ThumbsUp } from 'lucide-react';
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
            <span>DQX - 裁縫職人ツール</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">ログイン</Button>
            </Link>
            <Link href="/signup">
              <Button>新規登録</Button>
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
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    DQX - 裁縫職人ツール
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    DQX - 裁縫職人ツール は、MMORPGのドラゴンクエストX
                    オンラインの裁縫職人向けのアプリです。ゲーム内の裁縫作業を支援します。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1.5">
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
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <ThumbsUp />
                </div>
                <h3 className="text-xl font-bold">機能</h3>
                <p className="text-center text-muted-foreground">裁縫職人向けのアプリです。</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <ThumbsUp />
                </div>
                <h3 className="text-xl font-bold">機能</h3>
                <p className="text-center text-muted-foreground">裁縫職人向けのアプリです。</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <ThumbsUp />
                </div>
                <h3 className="text-xl font-bold">機能</h3>
                <p className="text-center text-muted-foreground">裁縫職人向けのアプリです。</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 DQX - 裁縫職人ツール. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
