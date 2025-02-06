'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Button from '../_components/Button';
import InputField from '../_components/InputField';

const registerSchema = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요.').max(10, '이름이 너무 깁니다.'),
    email: z.string().email('올바른 이메일을 입력해주세요.'),
    password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    confirmPassword: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.'
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange'
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('회원가입 폼 데이터:', data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="이름"
            placeholder="이름을 입력해주세요"
            register={register('name')}
            type="name"
            errorMessage={errors.name?.message}
          />
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
          <InputField
            label="비밀번호 확인"
            placeholder="비밀번호를 한 번 더 입력해주세요"
            register={register('confirmPassword')}
            type="password"
            errorMessage={errors.confirmPassword?.message}
          />

          <Button type="submit">회원가입</Button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            이미 계정이 있으신가요?
            <a href="/login" className="ml-1">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
