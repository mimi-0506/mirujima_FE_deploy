'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleLoginMutation } from '@/hooks/auth/useGoogleLoginMutation';
import LoadingSpinner from '@/public/icon/spin.svg';
import { GOOGLE_LOGIN_ERROR } from '@/constant/toastText';
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
        toast.error(GOOGLE_LOGIN_ERROR);
      }
    });
  }, [code, mutation, router]);

  return (
    <div>
      {/* {mutation.isPending ? (
        <LoadingSpinner width={48} height={48} />
      ) : mutation.isError ? (
        '구글 로그인에 실패했습니다.'
      ) : mutation.isSuccess ? (
        '로그인 성공! 이동 중...'
      ) : (
        <LoadingSpinner width={48} height={48} />
      )} */}{' '}
      <LoadingSpinner width={48} height={48} />
    </div>
  );
}
