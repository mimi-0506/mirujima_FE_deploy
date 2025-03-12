'use client';
import React from 'react';
import Link from 'next/link';
import SignUpForm from '../_components/SignupForm';

export default function SignUpPage() {
  return (
    <>
      <h1 className="mb-[60px] text-[26px] font-semibold leading-[28px] text-gray500 md:text-[34px] md:leading-[41px]">
        회원가입
      </h1>

      <SignUpForm />

      <div className="mt-[60px] flex items-center justify-between px-2">
        <p className="text-[12px] font-medium leading-[16px] text-gray350 md:text-[14px] md:leading-[20px]">
          이미 계정이 있으신가요?{' '}
        </p>
        <Link
          href="/login"
          className="text-[12px] font-medium leading-[16px] text-main md:text-[14px] md:leading-[20px]"
        >
          로그인하기
        </Link>
      </div>
    </>
  );
}
