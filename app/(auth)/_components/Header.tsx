'use client';
import { useRouter } from 'next/navigation';

import useAuth from '../../../hooks/auth/useAuth';

export default function Header() {
  const router = useRouter();
  const { isLoggedIn, user, handleLogout } = useAuth();

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="mx-auto flex max-w-xl items-center justify-between p-4">
        <h1 className="text-lg font-bold">미루지마</h1>
        <div>
          {isLoggedIn ? (
            <div className="flex gap-4">
              <span>반갑습니다, {user.name}님!</span>
              <button className="text-red-500" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button onClick={() => router.push('/login')}>로그인</button>
              <button onClick={() => router.push('/signup')}>회원가입</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
