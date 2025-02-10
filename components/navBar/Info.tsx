`use client`;

import Image from 'next/image';
import Link from 'next/link';

import { useInfoStore } from '@/provider/store-provider';

export default function Info() {
  const { id, email, name } = useInfoStore((state) => state);

  return (
    <div className="my-6 flex gap-[16px]">
      <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-[12.8px] border border-gray-200">
        <Image
          src={'/images/temp.png'} //임시파일. 토마토 분리되면 그걸로 교체
          width={64}
          height={64}
          alt={'profile image'}
        />
      </div>
      <div>
        <div>{name || '김밀리'}</div>
        <div className="text-gray400">{email || 'test@test.com'}</div>

        <Link href={'/logout'} className="text-gray350">
          로그아웃
        </Link>
      </div>
      {/* {isSmallScreen && (
        <Link href={'/logout'} className="text-gray350">
          로그아웃
        </Link>
      )} */}
    </div>
  );
}
