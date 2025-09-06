'use client';

// アイコン
import { LogOut, Settings, User } from 'lucide-react';
// React
import { useState, useEffect } from 'react';
// Next.js（テーマ管理）
import { useTheme } from 'next-themes';
// shadcn/ui
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import type { UserProfile } from '@/types/workspace';
// サーバーアクション
import { logout } from '@/app/logout/actions';
// ストア
import { useUserStore } from '@/store/useUserStore';
import { useFavoriteStore } from '@/store/favoriteStore';

export default function UserProfileBar({ userProfile }: { userProfile: UserProfile }) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userName, setUserName] = useState(userProfile.name);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const { clearUser, updateUserName } = useUserStore();
  const { clearFavorites } = useFavoriteStore();

  // ダークモードの切り替え
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    // ユーザー名の初期化
    setUserName(userProfile.name);
  }, [settingsOpen, userProfile.name]);

  // ログアウト処理
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      // サーバー側でのログアウト処理
      await logout();
      // クライアント側のストア状態をクリア
      clearUser();
      clearFavorites();
      // ページリロードでリダイレクト（確実な方法）
      window.location.href = '/';
    } catch (error) {
      console.error('ログアウトエラー:', error);
      setIsLoading(false);
    }
  };

  // フロントエンド側のバリデーション関数
  const validateUserName = (name: string): string | null => {
    if (!name || name.trim() === '') {
      return 'ユーザー名は必須です';
    }
    if (name.length > 20) {
      return 'ユーザー名は20文字以内である必要があります';
    }
    return null; // バリデーション成功
  };

  // ユーザー名更新処理
  const handleUpdateUserName = async () => {
    try {
      if (userName === userProfile.name) {
        setSettingsOpen(false);
        return;
      }

      // フロントエンド側でバリデーション
      const validationError = validateUserName(userName);
      if (validationError) {
        alert(validationError); // または適切なエラー表示方法
        return;
      }

      await updateUserName(userName);
      setSettingsOpen(false);
    } catch (error) {
      console.error('ユーザー名更新エラー:', error);
      // サーバー側のバリデーションエラーも表示
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={userProfile.imageUrl || ''} />
        <AvatarFallback>
          <User className="h-4 w-4 scale-125" />
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-medium leading-none">{userProfile.name}</p>
        <p className="text-xs text-muted-foreground">{userProfile.email}</p>
      </div>

      {/* 環境設定ボタン */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
            <span className="sr-only">環境設定</span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>環境設定</DialogTitle>
            <DialogDescription>ユーザー名の変更やダークモードの設定を行えます。</DialogDescription>
          </DialogHeader>
          <div className="space-y-8 py-2">
            <div className="space-y-2">
              <Label htmlFor="username">ユーザー名を変更</Label>
              <Input
                id="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="ユーザー名を入力"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="DarkMode" checked={theme === 'dark'} onCheckedChange={toggleDarkMode} />
              <Label htmlFor="DarkMode">
                ダークモードを有効にする<span className="text-red-500">（β版）</span>
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => handleUpdateUserName()}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ログアウトボタン */}
      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">ログアウト</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ログアウト</AlertDialogTitle>
            <AlertDialogDescription>本当にログアウトしますか？</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={handleLogout}>
              {isLoading && (
                <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              ログアウト
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
