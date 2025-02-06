'use client';

import { useEffect, useState } from 'react';

import { deleteCookie, getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const token = getCookie('accessToken') as string | undefined;
    const user = getCookie('user') as string | undefined;

    if (token && user) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(user).name);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, [pathname]);

  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('user');
    setIsLoggedIn(false);
    setUsername('');
    setRefresh((prev) => !prev);
    router.push('/login');
  };

  return (
    <header className="bg-gray-100 shadow-md">
      <div className="mx-auto flex max-w-xl items-center justify-between p-4">
        <h1 className="text-lg font-bold">미루지마</h1>
        <div>
          {isLoggedIn ? (
            <div className="flex gap-4">
              <span>반갑습니다, {username}님!</span>
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
