import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { armors, armorSeries } from '@/data/armor';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function SearchPage() {
  return (
    <div>
      <div className="flex items-center justify-between p-4 md:p-8 pt-6">
        <h2 className=" text-2xl font-bold">防具検索</h2>
        <Link href="/workspace">
          <Button variant="outline" size="default">
            <Home className="mr-2 h-4 w-4" />
            <p className="text-lg">ダッシュボードに戻る</p>
          </Button>
        </Link>
      </div>
      <Separator />
      {armorSeries.map((armorSeries) => (
        <Accordion key={armorSeries.id} type="multiple">
          <AccordionItem value={armorSeries.name}>
            <AccordionTrigger className="justify-start pl-4 pr-4">
              <div className="flex items-center gap-2 flex-1">
                <Image src={armorSeries.imageUrl} alt={armorSeries.name} width={20} height={20} />
                <div>{armorSeries.name}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              {armors
                .filter((armor) => armor.series === armorSeries.name)
                .map((armor) => (
                  <div
                    key={armor.id}
                    className="flex flex-row items-center ml-6 space-y-1 border-l-2 border-gray-200 gap-2 p-2"
                  >
                    <Image src={armor.imageUrl} alt={armor.name} width={20} height={20} />
                    <Link href={`/workspace/channel/${armor.id}`}>
                      <div className="text-sm hover:underline">{armor.name}</div>
                    </Link>
                  </div>
                ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
