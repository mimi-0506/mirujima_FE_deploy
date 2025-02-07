import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

import { deleteCookie, getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';

import { useInfoStore } from '../../stores/infoStore';

export default function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { id, email, name, setInfo, logout } = useInfoStore();

  const checkAuth = useCallback(() => {
    const token = getCookie('accessToken');

    if (!token) {
      logout();
    }
  }, [logout]);

  useEffect(() => {
    checkAuth();
  }, [pathname, checkAuth]);

  const isLoggedIn = id !== null;

  const handleLogout = () => {
    const cookiesToDelete = ['accessToken', 'refreshToken', 'user'];
    cookiesToDelete.forEach((cookie) => deleteCookie(cookie, { path: '/' }));
    toast.success('로그아웃 되었습니다!', { duration: 2000 });
    logout();
    setTimeout(() => {
      router.push('/login');
    }, 500);
  };

  return {
    isLoggedIn,
    user: { id, email, name },
    checkAuth,
    handleLogout
  };
}
