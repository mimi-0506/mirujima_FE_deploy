'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import useAuth from '../../../hooks/auth/useAuth';

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, user, handleLogout } = useAuth();

  return (
    <header className="border border-gray200 bg-white shadow-md">
      <div className="mx-auto flex w-full items-center justify-between px-[316px]">
        <Image
          src="/images/logo/mirujima-logo-with-tmt.svg"
          alt="미루지마 로고"
          height={19}
          width={108}
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />

        {/* 네비게이션 */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              <span className="text-gray-700">반갑습니다, {user.name}님!</span>
              <button className="text-red-500 hover:underline" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </header>
  );
}
