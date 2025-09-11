import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/themeProvider';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'DQX 裁縫職人ツール | ドラゴンクエストX オンライン 裁縫支援アプリ',
  description:
    'ドラゴンクエストX オンラインの裁縫職人向け支援ツール。裁縫商材の強さローテーション、設定値・現在値の確認、裁縫結果の保存が可能です。',
  keywords: 'ドラゴンクエストX,ドラゴンクエスト,ドラクエ10,DQX,裁縫,職人,ツール,オンライン,ゲーム,支援,効率',
  authors: [{ name: 'DQX 裁縫職人ツール' }],
  creator: 'DQX 裁縫職人ツール',
  publisher: 'DQX 裁縫職人ツール',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://dqx-sewing-tool.vercel.app',
    title: 'DQX 裁縫職人ツール',
    description: 'ドラゴンクエストX オンラインの裁縫職人向け支援ツール',
    siteName: 'DQX 裁縫職人ツール',
    images: [
      {
        url: 'https://dqx-sewing-tool.vercel.app/images/表紙.jpg',
        width: 1200,
        height: 630,
        alt: 'DQX 裁縫職人ツール',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DQX 裁縫職人ツール',
    description: 'ドラゴンクエストX オンラインの裁縫職人向け支援ツール',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
