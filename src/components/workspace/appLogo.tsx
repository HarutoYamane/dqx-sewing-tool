import Link from 'next/link';
import Image from 'next/image';

export default function AppLogo() {
  return (
    <Link href="/workspace" className="flex items-center gap-2 font-bold hover:opacity-70 transition-opacity">
      <Image src="/images/Icons/AppLogo.png" alt="DQX - 裁縫職人ツール" width={32} height={32} />
      <span>DQX - 裁縫職人ツール</span>
    </Link>
  );
}
