// shadcn/ui
import { Button } from '@/components/ui/button';
// アイコン
import { RotateCcw } from 'lucide-react';

export default function ChannelFooter() {
  return (
    <footer className="border-b bg-background z-10">
      <div className="h-14 flex items-center gap-4 px-4">
        <div className="flex items-center gap-2">
          <p>トータル裁縫回数：600回</p>
          <p>大成功回数：450回</p>
          <p className="text-sm text-muted-foreground">大成功確率：75%</p>
          <Button variant="outline" size="sm">
            <RotateCcw className="h-4 w-4" />
            裁縫回数をリセット
          </Button>
        </div>
      </div>
    </footer>
  );
}
