'use client';

import { useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import { useInfoStore, useModalStore } from '@/provider/store-provider';

import authApi from '@/apis/clientActions/authApi';

import SocialLoginButtons from '../_components/SocialLoginButtons';
import LoginForm from '../_components/LoginForm';
import React from 'react';

export default function LoginPage() {
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
            deleteCookie('refreshToken', { path: '/' });
            deleteCookie('accessToken', { path: '/' });
            deleteCookie('user', { path: '/' });
            logout();
          }
        })
        .catch(() => {
          deleteCookie('refreshToken', { path: '/' });
          deleteCookie('accessToken', { path: '/' });
          deleteCookie('user', { path: '/' });
          logout();
        })
        .finally(() => setIsLoading(false));
    } else {
      logout();
      setIsLoading(false);
    }
  }, [router, logout, setInfo, setIsLoading]);

  return (
    <>
      <h1 className="mb-[60px] text-[26px] font-semibold leading-[28px] text-gray500 md:text-[34px] md:leading-[41px]">
        로그인
      </h1>
      <LoginForm onSignup={() => router.push('/signup')} />
      <SocialLoginButtons />
    </>
  );
}
