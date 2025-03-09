'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { useInfoStore, useModalStore } from '@/provider/store-provider';

import { useLoginMutation } from '../../../hooks/auth/useLoginMutation';
import Button from '../_components/Button';
import InputField from '../_components/InputField';

const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const logout = useInfoStore((state) => state.logout);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit'
  });
  const setIsLoading = useModalStore((state) => state.setIsLoading);

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

  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    loginMutate(data);
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

        <div className="mb-[60px] hidden items-center justify-between px-2">
          <p className="text-[14px] font-medium leading-[20px] text-gray350">
            비밀번호를 잊으셨나요?
          </p>
          <button className="cursor-not-allowed border-none bg-transparent p-0 text-[14px] font-medium leading-[20px] text-main">
            비밀번호 찾기
          </button>
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
