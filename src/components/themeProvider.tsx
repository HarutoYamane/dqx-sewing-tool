'use client';

// Next.js
import { ThemeProvider as NextThemesProvider } from 'next-themes';
// shadcn/ui
import type { ThemeProviderProps } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  //サーバーサイド: mounted = falseでテーマプロバイダーをスキップ
  //クライアントサイド: useEffectでマウント後にテーマプロバイダーを有効化;
  //ハイドレーション: サーバーとクライアントで同じ内容をレンダリング;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
