'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">로그인</h1>

        {isError && (
          <div className="mb-4 rounded bg-red-100 p-2 text-sm text-red-600">
            {typeof error === 'string' ? error : error?.message || '로그인 중 에러가 발생했습니다.'}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="이메일"
            placeholder="이메일을 입력해주세요"
            register={register('email')}
            type="email"
            errorMessage={errors.email?.message}
          />
          <InputField
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요"
            register={register('password')}
            type="password"
            errorMessage={errors.password?.message}
          />
          <Button type="submit">로그인</Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            계정이 없으신가요?
            <Link href="/signup" className="ml-1">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
