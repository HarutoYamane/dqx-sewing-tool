// アイコン
import { LogOut, User } from 'lucide-react';
// shadcn/ui
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
// 型
import type { UserProfile } from '@/types/workspace';

export default function UserProfileBar({ userProfile }: { userProfile: UserProfile }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={userProfile.imageUrl || ''} />
        <AvatarFallback>
          <User className="h-4 w-4 scale-125" />
        </AvatarFallback>
        {/* ユーザーアイコンが初期(null)の場合は名前の最初の文字を表示 */}
      </Avatar>

      <div className="flex-1 overflow-hidden">
        <p className="text-sm font-medium leading-none">{userProfile.name}</p>
        <p className="text-xs text-muted-foreground">{userProfile.email}</p>
      </div>

      <Button variant="ghost" size="icon">
        <LogOut className="h-4 w-4" />
        <span className="sr-only">ログアウト</span>
      </Button>
    </div>
  );
}
