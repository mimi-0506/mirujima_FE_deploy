'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header className="h-[74px] border border-gray200 bg-white shadow-md">
      <div className="mx-auto flex w-full items-center justify-between px-[316px]">
        <Image
          src="/images/logo/mirujima-logo-full.png"
          alt="미루지마 로고"
          height={19}
          width={108}
          className="h-auto w-[108px] cursor-pointer"
          onClick={() => router.push('/')}
        />

        <div className="flex items-center">
          <div className="flex items-center py-[10px]">
            <button
              className="px-4 py-4 text-[17px] font-semibold text-gray500"
              onClick={() => router.push('/login')}
            >
              로그인
            </button>
            <button
              className="px-4 py-4 text-[17px] font-semibold text-main"
              onClick={() => router.push('/signup')}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
