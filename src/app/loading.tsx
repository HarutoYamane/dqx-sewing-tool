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

export function LoadingSpinner() {
  return (
    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
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
