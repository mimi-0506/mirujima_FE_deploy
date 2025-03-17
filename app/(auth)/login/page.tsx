'use client';
import { useAuthCheck } from '@/hooks/auth/useAuthCheck';
import { useRouter } from 'next/navigation';
import SocialLoginButtons from '../_components/SocialLoginButtons';
import LoginForm from '../_components/LoginForm';
import { useInfoStore } from '@/provider/store-provider';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const logout = useInfoStore((state) => state.logout);

  useAuthCheck();

  useEffect(() => {
    logout();
  }, []);

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
