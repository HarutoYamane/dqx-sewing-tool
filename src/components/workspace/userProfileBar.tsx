'use client';

// アイコン
import { LogOut, Settings, User } from 'lucide-react';
// React
import { useState } from 'react';
// Next.js（テーマ管理）
import { useTheme } from 'next-themes';
// shadcn/ui
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
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
  const { theme, setTheme } = useTheme();
  const { clearUser } = useUserStore();
  const { clearFavorites } = useFavoriteStore();

  // ダークモードの切り替え
  const toggleDarkMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // ログアウト処理
  const handleLogout = async () => {
    try {
      // クライアント側のストア状態をクリア
      clearUser();
      clearFavorites();
      // サーバー側でのログアウト処理
      await logout();
    } catch (error) {
      console.error('ログアウトエラー:', error);
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
            <Button onClick={() => setSettingsOpen(false)}>保存</Button>
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
            <AlertDialogAction onClick={handleLogout}>ログアウト</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
