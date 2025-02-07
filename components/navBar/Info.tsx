`use client`;

import Image from 'next/image';

import useIsSmall from '@/hooks/useIsSmallScreen';
import { useInfoStore } from '@/provider/store-provider';

export default function Info() {
  const { id, email, name, logout } = useInfoStore((state) => state);
  const { isSmallScreen } = useIsSmall();

  return (
    <div className="flex">
      <div className="relative h-[50px] w-[50px]">
        <Image
          src={'https://i.pinimg.com/736x/c3/1f/51/c31f519a91cc2560c5d2d006913af4dc.jpg'}
          fill
          alt={'profile image'}
        />
      </div>
      <div>
        <div>{name}</div>
        <div>{email}</div>
        {!isSmallScreen && <div onClick={logout}>로그아웃</div>}
      </div>
      {isSmallScreen && <div onClick={logout}>로그아웃</div>}
    </div>
  );
}
