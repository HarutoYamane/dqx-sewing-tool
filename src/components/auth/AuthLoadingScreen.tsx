'use client';

import { useUserStore } from '@/store/useUserStore';

export default function AuthLoadingScreen() {
  const { isAuthInitialized } = useUserStore();

  // 認証初期化が完了している場合はこのローディング画面（全面表示）のみを表示する
  if (isAuthInitialized) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        {/* ローディングスピナー */}
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-blue-600 opacity-20"></div>
          </div>
        </div>

        {/* ローディングテキスト */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-foreground">認証確認中...</h2>
          <p className="text-sm text-muted-foreground">しばらくお待ちください</p>
        </div>

        {/* プログレスバー */}
        <div className="w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
