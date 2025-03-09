'use client';

import { useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { useKakaoLoginMutation } from '@/hooks/auth/useKakaoLoginMutation';

export default function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: kakaoLoginMutate } = useKakaoLoginMutation();

  useEffect(() => {
    const code = searchParams.get('code');
    console.log('Received Kakao code:', code);
    if (code) {
      kakaoLoginMutate(code);
    } else {
      router.push('/login');
    }
  }, [searchParams, kakaoLoginMutate, router]);

  return <div>카카오 로그인 처리 중...</div>;
}
