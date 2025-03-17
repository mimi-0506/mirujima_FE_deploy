import { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import authApi from '@/apis/clientActions/authApi';

export function useAuthCheck() {
  const router = useRouter();
  const setInfo = useInfoStore((state) => state.setInfo);
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const refreshToken = getCookie('refreshToken') as string | undefined;

        if (!refreshToken) {
          setIsLoading(false);
          return;
        }

        const response = await authApi.post('/auth/refresh', { refreshToken });
        const data = response.data;

        if (data.success && data.result.accessToken) {
          setCookie('accessToken', data.result.accessToken, {
            maxAge: 60 * 60 * 24,
            path: '/'
          });

          const userCookie = getCookie('user') as string | undefined;
          const user = userCookie ? JSON.parse(userCookie) : {};

          setInfo({
            userId: user.id || 0,
            email: user.email || '',
            name: user.username || '',
            profileImage: user.profileImagePath || null
          });

          router.push('/dashboard');
        } else router.push('/logout');
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/logout');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setIsLoading]);
}
