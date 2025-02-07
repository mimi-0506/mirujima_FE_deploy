'use client';

import { useCallback, useEffect, useState } from 'react';

import { deleteCookie, getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';

interface User {
  name: string;
}

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = useCallback(() => {
    const token = getCookie('accessToken') as string | undefined;
    const userCookie = getCookie('user') as string | undefined;

    if (token && userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie) as User;
        setIsLoggedIn(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  return { isLoggedIn, user, checkAuth };
};

const Header = () => {
  const { isLoggedIn, user, checkAuth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);

  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('user');
    checkAuth();
    router.push('/login');
  };

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="mx-auto flex max-w-xl items-center justify-between p-4">
        <h1 className="text-lg font-bold">미루지마</h1>
        <div>
          {isLoggedIn ? (
            <div className="flex gap-4">
              <span>반갑습니다, {user?.name}님!</span>
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
};

export default Header;
