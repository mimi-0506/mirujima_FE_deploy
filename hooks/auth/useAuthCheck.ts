import { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import authApi from '@/apis/clientActions/authApi';

export function useAuthCheck() {
  const router = useRouter();
  const logout = useInfoStore((state) => state.logout);
  const setInfo = useInfoStore((state) => state.setInfo);
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  useEffect(() => {
    setIsLoading(true);
    const refreshToken = getCookie('refreshToken') as string | undefined;

    if (refreshToken) {
      authApi
        .post('/auth/refresh', { refreshToken })
        .then((response) => {
          const data = response.data;
          if (data.success && data.result.accessToken) {
            setCookie('accessToken', data.result.accessToken, {
              maxAge: 60 * 60, // 1시간
              path: '/'
            });

            const userCookie = getCookie('user') as string | undefined;
            const user = userCookie ? JSON.parse(userCookie) : {};

            setInfo({ userId: user.id || 0, email: user.email || '', name: user.username || '' });

            router.push('/dashboard');
          } else {
            router.push('/logout');
          }
        })
        .catch(() => {
          router.push('/logout');
        })
        .finally(() => setIsLoading(false));
    } else {
      router.push('/logout');
      setIsLoading(false);
    }
  }, [router, logout, setInfo, setIsLoading]);
}
