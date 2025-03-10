'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCookie, setCookie, deleteCookie } from 'cookies-next'; // deleteCookie 추가

import { CheckedIcon } from '@/app/(workspace)/todoList/_components/CheckedIcon';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import { useLoginMutation } from '../../../hooks/auth/useLoginMutation';
import authApi from '@/apis/clientActions/authApi';
import Button from '../_components/Button';
import InputField from '../_components/InputField';

const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
});

type LoginFormData = z.infer<typeof loginSchema>;

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
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema), mode: 'onSubmit' });

  useEffect(() => {
    setIsLoading(false);
    logout();

    // 모든 쿠키 삭제
    document.cookie.split(';').forEach((cookie) => {
      const [name] = cookie.split('=');
      document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: loginMutate, isError, error } = useLoginMutation();
  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = (data: LoginFormData) => {
    loginMutate({ formData: data, isAutoLogin: isChecked });
  };

  const serverErrorMessage =
    isError && axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : null;

  return (
    <>
      <h1 className="mb-[60px] text-[26px] font-semibold leading-[28px] text-gray500 md:text-[34px] md:leading-[41px]">
        로그인
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <InputField
          label="이메일"
          placeholder="이메일"
          register={register('email')}
          type="email"
          errorMessage={errors.email?.message}
          triggerValidation={() => trigger('email')}
        />
        <InputField
          label="비밀번호"
          placeholder="비밀번호"
          register={register('password')}
          type="password"
          errorMessage={errors.password?.message}
          triggerValidation={() => trigger('password')}
        />
        {serverErrorMessage && <p className="text-sm text-warning">{serverErrorMessage}</p>}

        <div className="my-3 flex items-center gap-2">
          <div className="relative flex cursor-pointer">
            <input
              id="auto-login"
              type="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
              className="peer h-[18px] w-[18px] cursor-pointer appearance-none rounded-[6px] border border-gray200 transition-all checked:border-main checked:bg-main"
            />
            <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100">
              <CheckedIcon />
            </span>
          </div>
          <label htmlFor="auto-login" className="text-[14px] font-medium text-gray500">
            자동 로그인
          </label>
        </div>

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

      <div className="mt-[40px] hidden gap-4">
        <label className="font-semibold text-gray500">간편 로그인</label>
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            className="flex cursor-not-allowed items-center justify-center gap-2 border border-gray-300 bg-white px-4 py-2 text-gray500"
          >
            <Image
              src="/images/sns/google-icon.svg"
              alt="구글 로고"
              width={24}
              height={24}
              className="h-auto w-auto"
            />
            <span className="text-[16px] font-semibold leading-[22px]">구글 계정으로 로그인</span>
          </Button>
          <Button
            type="button"
            className="flex cursor-not-allowed items-center justify-center gap-2 border border-gray-300 bg-white px-4 py-2 text-gray500"
          >
            <Image
              src="/images/sns/kakao-icon.svg"
              alt="카카오 로고"
              width={24}
              height={24}
              className="h-auto w-auto"
            />
            <span className="text-[16px] font-semibold leading-[22px]">카카오 계정으로 로그인</span>
          </Button>
        </div>
      </div>
    </>
  );
}
