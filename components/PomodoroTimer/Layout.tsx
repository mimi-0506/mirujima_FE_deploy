import Test from '@/public/images/logo/stem.png';
import Image from 'next/image';

export default function Layout({
  children,
  isExpanded,
  getColor
}: {
  children: React.ReactNode;
  isExpanded: boolean;
  getColor: () => string;
}) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={Test}
        width={30}
        height={30}
        alt="stem"
        className={'absolute left-[3px] top-[-6px] z-20 transition-all duration-500 ease-in-out'}
      />

      <div
        className={`cursor-pointer items-center justify-center overflow-hidden shadow-lg transition-all duration-500 ease-in-out ${
          isExpanded ? 'h-80 w-80 rounded-3xl' : 'h-20 w-20 rounded-full'
        }`}
        style={{ backgroundColor: getColor() }}
      >
        {children}
      </div>
    </div>
  );
}
