'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleLoginMutation } from '@/hooks/auth/useGoogleLoginMutation';

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const router = useRouter();
  const mutation = useGoogleLoginMutation();
  useEffect(() => {
    if (!code) return;

    if (mutation.status === 'pending' || mutation.status === 'success') return;

    mutation.mutate(code, {
      onSuccess: () => {
        router.push('/dashboard');
      },
      onError: (err) => {
        console.error('구글 로그인 에러:', err);
        toast.error('구글 로그인에 실패했습니다. 다시 시도해주세요.');
      }
    });
  }, [code, mutation, router]);

  return (
    <div>
      {mutation.isPending
        ? '구글 로그인 처리 중...'
        : mutation.isError
          ? '구글 로그인에 실패했습니다.'
          : mutation.isSuccess
            ? '로그인 성공! 이동 중...'
            : '잠시만 기다려주세요...'}
    </div>
  );
}
