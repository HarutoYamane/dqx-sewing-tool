import { sewingValues } from '@/data/sewingValue';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function SewingArea() {
  const [showWeak, setShowWeak] = useState<boolean>(true); // 弱いボタンの状態管理
  const [showNormal, setShowNormal] = useState<boolean>(true); // 普通ボタンの状態管理
  const [showStrong, setShowStrong] = useState<boolean>(true); // 強いボタンの状態管理
  const [showStrongest, setShowStrongest] = useState<boolean>(true); // 最強ボタンの状態管理
  const [BastingMode, setBastingMode] = useState<boolean>(false); // しつけ縫いモードの状態管理

  return (
    <div className="space-y-4 pt-3">
      <div className="sticky top-0 bg-background z-10 pb-2 flex items-center justify-start gap-2">
        <Button
          variant={showWeak ? 'default' : 'outline'}
          className={showWeak ? 'bg-blue-500 hover:bg-blue-600' : ''}
          size="sm"
          onClick={() => setShowWeak(!showWeak)}
        >
          弱い
        </Button>
        <Button
          variant={showNormal ? 'default' : 'outline'}
          className={showNormal ? 'bg-green-500 hover:bg-green-600' : ''}
          size="sm"
          onClick={() => setShowNormal(!showNormal)}
        >
          普通
        </Button>
        <Button
          variant={showStrong ? 'default' : 'outline'}
          className={showStrong ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
          size="sm"
          onClick={() => setShowStrong(!showStrong)}
        >
          強い
        </Button>
        <Button
          variant={showStrongest ? 'default' : 'outline'}
          className={showStrongest ? 'bg-red-500 hover:bg-red-600' : ''}
          size="sm"
          onClick={() => setShowStrongest(!showStrongest)}
        >
          最強
        </Button>
        <Button
          variant={BastingMode ? 'default' : 'outline'}
          className={BastingMode ? 'bg-purple-500 hover:bg-purple-600' : ''}
          size="sm"
          onClick={() => setBastingMode(!BastingMode)}
        >
          しつけ縫い
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={sewingValues.map((v) => v.name)} className="w-full">
        {sewingValues.map((value) => (
          <AccordionItem key={value.name} value={value.name}>
            <AccordionTrigger className="text-left">{value.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm">
                {showWeak && !BastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-blue-600">弱い :</span>
                    <span>{value.normalValue.弱い.join(', ')}</span>
                  </div>
                )}
                {showNormal && !BastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-green-600">普通 :</span>
                    <span>{value.normalValue.普通.join(', ')}</span>
                  </div>
                )}
                {showStrong && !BastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-yellow-600">強い :</span>
                    <span>{value.normalValue.強い.join(', ')}</span>
                  </div>
                )}
                {showStrongest && !BastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-red-600">最強 :</span>
                    <span>{value.normalValue.最強.join(', ')}</span>
                  </div>
                )}
                {showWeak && BastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-blue-600">弱い (しつけ) :</span>
                    <span>{value.bastingValue.弱い.join(', ')}</span>
                  </div>
                )}
                {showNormal && BastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-green-600">普通 (しつけ) :</span>
                    <span>{value.bastingValue.普通.join(', ')}</span>
                  </div>
                )}
                {showStrong && BastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-yellow-600">強い (しつけ) :</span>
                    <span>{value.bastingValue.強い.join(', ')}</span>
                  </div>
                )}
                {showStrongest && BastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-red-600">最強 (しつけ) :</span>
                    <span>{value.bastingValue.最強.join(', ')}</span>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
