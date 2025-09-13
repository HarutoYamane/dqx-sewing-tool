import Link from 'next/link';
import Image from 'next/image';

export default function AppLogo({ SheetOpenChange }: { SheetOpenChange?: (open: boolean) => void }) {
  const handleLogoClick = () => {
    if (SheetOpenChange) {
      // アニメーション完了後にSheetを閉じる（duration-300 + 少し余裕を持たせる）
      setTimeout(() => {
        SheetOpenChange(false);
      }, 350);
    }
  };

  return (
    <Link
      href="/workspace"
      className="flex items-center gap-2 font-bold hover:opacity-70 transition-opacity"
      onClick={handleLogoClick} // ロゴを選んだら、モバイル時のナビゲーションシートを閉じる
    >
      <Image src="/images/Icons/AppLogo.png" alt="DQX - 裁縫職人ツール" width={32} height={32} />
      <span>DQX - 裁縫職人ツール</span>
    </Link>
  );
}
