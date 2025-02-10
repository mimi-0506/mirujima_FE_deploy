'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

import { useInfoStore } from '@/stores/infoStore';

import { useLoginMutation } from '../../../hooks/auth/useLoginMutation';
import Button from '../_components/Button';
import InputField from '../_components/InputField';

const loginSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit'
  });

  const { mutate: loginMutate, isError, error } = useLoginMutation();
  const { setInfo } = useInfoStore();
  const router = useRouter();

  const onSubmit = (data: LoginFormData) => {
    loginMutate(data, {
      onSuccess: (responseData) => {
        const { user } = responseData;
        setInfo({
          id: user.id,
          email: user.email,
          name: user.name
        });
        router.refresh();
      }
    });
  };

  const serverErrorMessage =
    isError && axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : null;

  return (
    <div className="flex min-h-screen justify-center bg-white">
      <div className="mt-[76px] min-h-[779px] w-[688px] rounded-[16px] border-[1px] border-solid border-gray200 bg-white p-[40px] shadow">
        <h1 className="mb-[60px] text-[32px] font-semibold leading-[41px]">로그인</h1>

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
          <div className="mb-[60px] flex items-center justify-between px-2">
            <p className="text-[14px] font-medium leading-[20px] text-gray350">
              비밀번호를 잊으셨나요?
            </p>
            <button className="cursor-pointer border-none bg-transparent p-0 text-[14px] font-medium leading-[20px] text-main">
              비밀번호 찾기
            </button>
          </div>
          <Button type="submit" className="bg-main text-white">
            로그인
          </Button>
        </form>

        <div className="mt-3 text-center">
          <Button
            type="button"
            onClick={() => router.push('/signup')}
            className="border border-gray-300 bg-white text-gray500"
          >
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
