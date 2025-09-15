'use client';

import { sewingValues } from '@/data/sewingValue';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// Zustandストア
import { useStrengthFilterStore, useBastingModeStore } from '@/store/strengthFilterStore';

export default function SewingArea() {
  const { strengthFilter, addStrengthFilter, removeStrengthFilter } = useStrengthFilterStore();
  const { bastingMode, setBastingMode } = useBastingModeStore();

  // 数値の桁数に応じて区切り文字を変更する関数（最後の数値は区切り文字をつけない）
  const formatNumbers = (numbers: number[]) => {
    return numbers
      .map((num, index) => {
        const numStr = num.toString();
        return numStr.length === 1 && numbers.length !== index + 1 ? `${numStr} 　` : `${numStr}　`;
      })
      .join('');
  };

  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-background z-10 pb-2 flex items-center justify-start gap-2">
        <Button
          variant={strengthFilter.includes('弱い') ? 'default' : 'outline'}
          className={strengthFilter.includes('弱い') ? 'bg-blue-500 hover:bg-blue-600' : ''}
          size="sm"
          onClick={() => {
            if (strengthFilter.includes('弱い')) {
              removeStrengthFilter('弱い');
            } else {
              addStrengthFilter('弱い');
            }
          }}
        >
          弱い
        </Button>
        <Button
          variant={strengthFilter.includes('普通') ? 'default' : 'outline'}
          className={strengthFilter.includes('普通') ? 'bg-green-500 hover:bg-green-600' : ''}
          size="sm"
          onClick={() => {
            if (strengthFilter.includes('普通')) {
              removeStrengthFilter('普通');
            } else {
              addStrengthFilter('普通');
            }
          }}
        >
          普通
        </Button>
        <Button
          variant={strengthFilter.includes('強い') ? 'default' : 'outline'}
          className={strengthFilter.includes('強い') ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
          size="sm"
          onClick={() => {
            if (strengthFilter.includes('強い')) {
              removeStrengthFilter('強い');
            } else {
              addStrengthFilter('強い');
            }
          }}
        >
          強い
        </Button>
        <Button
          variant={strengthFilter.includes('最強') ? 'default' : 'outline'}
          className={strengthFilter.includes('最強') ? 'bg-red-500 hover:bg-red-600' : ''}
          size="sm"
          onClick={() => {
            if (strengthFilter.includes('最強')) {
              removeStrengthFilter('最強');
            } else {
              addStrengthFilter('最強');
            }
          }}
        >
          最強
        </Button>
        <Button
          variant={bastingMode ? 'default' : 'outline'}
          className={bastingMode ? 'bg-purple-500 hover:bg-purple-600' : ''}
          size="sm"
          onClick={() => {
            setBastingMode(!bastingMode);
          }}
        >
          しつけ縫い
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={sewingValues.map((v) => v.name)} className="w-full">
        {sewingValues.map((value) => (
          <AccordionItem key={value.name} value={value.name}>
            <AccordionTrigger className="text-left text-sm">{value.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-xs sm:text-base">
                {strengthFilter.includes('弱い') && !bastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-blue-600">弱い :</span>
                    <span className="border-b border-gray-400">{formatNumbers(value.normalValue.弱い)}</span>
                  </div>
                )}
                {strengthFilter.includes('普通') && !bastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-green-600">普通 :</span>
                    <span className="border-b border-gray-400">{formatNumbers(value.normalValue.普通)}</span>
                  </div>
                )}
                {strengthFilter.includes('強い') && !bastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-yellow-600">強い :</span>
                    <span className="border-b border-gray-400">{formatNumbers(value.normalValue.強い)}</span>
                  </div>
                )}
                {strengthFilter.includes('最強') && !bastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-red-600">最強 :</span>
                    <span className="border-b border-gray-400">{formatNumbers(value.normalValue.最強)}</span>
                  </div>
                )}
                {strengthFilter.includes('弱い') && bastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-blue-600">弱い (しつけ) :</span>
                    <span className="border-b border-gray-400">{formatNumbers(value.bastingValue.弱い)}</span>
                  </div>
                )}
                {strengthFilter.includes('普通') && bastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-green-600">普通 (しつけ) :</span>
                    <span className="border-b border-gray-400">{formatNumbers(value.bastingValue.普通)}</span>
                  </div>
                )}
                {strengthFilter.includes('強い') && bastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-yellow-600">強い (しつけ) :</span>
                    <span className="border-b border-gray-400">{formatNumbers(value.bastingValue.強い)}</span>
                  </div>
                )}
                {strengthFilter.includes('最強') && bastingMode && (
                  <div className="flex justify-start items-center gap-4">
                    <span className="text-red-600">最強 (しつけ) :</span>
                    <span className="border-b border-gray-400">{formatNumbers(value.bastingValue.最強)}</span>
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
