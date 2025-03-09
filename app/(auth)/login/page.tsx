'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { useLoginMutation } from '@/hooks/auth/useLoginMutation';
import { useInfoStore } from '@/provider/store-provider';
import GoogleIcon from '@/public/images/sns/google-icon.svg';
import KaKaoIcon from '@/public/images/sns/kakao-icon.svg';
import getGoogleLoginUrl from '@/utils/getGoogleLoginUrl';
import getKakaoLoginUrl from '@/utils/getKakaoLoginUrl';

import Button from '../_components/Button';
import InputField from '../_components/InputField';

const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { logout, setInfo } = useInfoStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit'
  });

  const router = useRouter();
  const { mutate: loginMutate, isError, error } = useLoginMutation();

  useEffect(() => {
    logout();
    const accessToken = getCookie('accessToken');
    const user = getCookie('user');
    if (accessToken && user) {
      const parsedUser = JSON.parse(user as string);
      setInfo({
        id: parsedUser.id,
        email: parsedUser.email,
        name: parsedUser.username
      });
      router.push('/dashboard'); // 이미 로그인 상태면 대시보드로
    }
  }, [logout, setInfo, router]);

  const onSubmit = (data: LoginFormData) => {
    loginMutate(data);
  };

  const serverErrorMessage =
    isError && axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : null;

  const handleGoogleLogin = () => {
    window.location.href = getGoogleLoginUrl();
  };

  const handleKakaoLogin = () => {
    window.location.href = getKakaoLoginUrl(); // 카카오 로그인 URL로 이동
  };

  return (
    <>
      <h1 className="mb-[60px] text-[26px] font-semibold leading-[28px] md:text-[34px] md:leading-[41px]">
        로그인
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <InputField
          label="이메일"
          placeholder="이메일"
          register={register('email')}
          type="email"
          errorMessage={errors.email?.message}
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호"
          register={register('password')}
          type="password"
          errorMessage={errors.password?.message}
        />
        {serverErrorMessage && <p className="text-sm text-warning">{serverErrorMessage}</p>}

        <Button type="submit" className="bg-main text-white">
          로그인
        </Button>
        <Button
          type="button"
          onClick={() => router.push('/signup')}
          className="mt-3 border border-gray-300 bg-white text-gray500"
        >
          회원가입
        </Button>
      </form>

      <div className="mt-[40px] gap-4">
        <label className="font-semibold text-gray500">간편 로그인</label>
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-4 py-2 text-gray500"
          >
            <GoogleIcon />
            <span className="text-[16px] font-semibold leading-[22px]">구글 계정으로 로그인</span>
          </Button>
          <Button
            onClick={handleKakaoLogin}
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 bg-white px-4 py-2 text-gray500"
          >
            <KaKaoIcon alt="카카오 로고" />
            <span className="text-[16px] font-semibold leading-[22px]">카카오 계정으로 로그인</span>
          </Button>
        </div>
      </div>
    </>
  );
}
