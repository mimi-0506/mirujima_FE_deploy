'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useGoogleLoginMutation } from '@/hooks/auth/useGoogleLoginMutation';

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();
  const mutation = useGoogleLoginMutation();
  useEffect(() => {
    console.log('useGoogleLoginMutation 반환 객체:', mutation);
  }, [mutation]);

  useEffect(() => {
    if (!code) return;

    mutation.mutate(code, {
      onSuccess: () => {
        router.push('/dashboard');
      },
      onError: (err) => {
        console.error('구글 로그인 에러:', err);
      }
    });
  }, [code, mutation, router]);

  return (
    <div>{mutation.status === 'pending' ? '구글 로그인 처리 중...' : '잠시만 기다려주세요...'}</div>
  );
}
