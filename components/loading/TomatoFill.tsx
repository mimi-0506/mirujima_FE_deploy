import Image from 'next/image';

import Test from '@/public/images/logo/stem.png';

export default function TomatoFill() {
  return (
    <div className="relative">
      <Image
        src={Test}
        width={50}
        height={50}
        alt="stem"
        className="absolute left-[10px] top-[-10px] z-10"
      />
      <div className="relative h-32 w-32 overflow-hidden rounded-full">
        <div className="absolute h-32 w-32 overflow-hidden rounded-full border-[6px] border-main" />
        <div className="absolute bottom-0 left-0 w-full animate-tomatofill bg-main" />
      </div>
    </div>
  );
}
