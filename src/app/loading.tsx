import { cn } from '@/lib/utils';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

function Spinner({ className, size = 'md', ...props }: SpinnerProps) {
  return (
    <div
      className={cn(
        'inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent',
        {
          'h-4 w-4': size === 'sm',
          'h-8 w-8': size === 'md',
          'h-12 w-12': size === 'lg',
        },
        className
      )}
      role="status"
      aria-label="読み込み中"
      {...props}
    >
      <span className="sr-only">読み込み中...</span>
    </div>
  );
}

export default function Loading({
  size = 'lg',
  text = 'visible',
}: {
  size?: 'sm' | 'md' | 'lg'; // スピナーのサイズ（デフォルトはlg）
  text?: 'hidden' | 'visible'; // テキストの表示/非表示（デフォルトは表示）
}) {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <Spinner size={size} className="mb-4" />
      <p className={`text-lg font-medium text-muted-foreground ${text}`}>データを読み込んでいます...</p>
    </div>
  );
}
