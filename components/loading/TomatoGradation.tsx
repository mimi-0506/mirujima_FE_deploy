import Image from 'next/image';

import Test from '@/public/images/logo/stem.png';

export default function TomatoGradation() {
  return (
    <div className="relative">
      <Image
        src={Test}
        width={50}
        height={50}
        alt="stem"
        className="absolute left-[10px] top-[-10px]"
      />
      <div className="h-32 w-32 animate-tomatogradation rounded-full border border-main bg-transparent" />
    </div>
  );
}
