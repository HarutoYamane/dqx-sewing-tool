import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/themeProvider';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'DQX - 裁縫職人ツール',
  description: 'DQX - 裁縫職人ツール',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
