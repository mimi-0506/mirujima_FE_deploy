'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleLoginMutation } from '@/hooks/auth/useGoogleLoginMutation';
import { useKakaoLoginMutation } from '@/hooks/auth/useKakaoLoginMutation';
import LoadingSpinner from '@/public/icon/spin.svg';
import { GOOGLE_LOGIN_ERROR, KAKAO_LOGIN_ERROR } from '@/constant/toastText';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state'); // 카카오 로그인은 state 파라미터를 사용할 수 있음
  const router = useRouter();

  const googleMutation = useGoogleLoginMutation();
  const kakaoMutation = useKakaoLoginMutation();

  const loginType = state?.includes('kakao') ? 'kakao' : 'google';

  useEffect(() => {
    if (!code) return;

    if (loginType === 'google') {
      if (googleMutation.status === 'pending' || googleMutation.status === 'success') return;

      googleMutation.mutate(code, {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (err) => {
          console.error('구글 로그인 에러:', err);
          toast.error(GOOGLE_LOGIN_ERROR);
        }
      });
    } else if (loginType === 'kakao') {
      if (kakaoMutation.status === 'pending' || kakaoMutation.status === 'success') return;

      kakaoMutation.mutate(code, {
        onSuccess: () => {
          router.push('/dashboard');
        },
        onError: (err) => {
          console.error('카카오 로그인 에러:', err);
          toast.error(KAKAO_LOGIN_ERROR);
        }
      });
    }
  }, [code, state, loginType, googleMutation, kakaoMutation, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {(googleMutation.isPending || kakaoMutation.isPending) && (
        <LoadingSpinner width={48} height={48} />
      )}
      {(googleMutation.isError || kakaoMutation.isError) && (
        <p className="text-red-500">
          {loginType === 'google' ? '구글 로그인에 실패했습니다.' : '카카오 로그인에 실패했습니다.'}
        </p>
      )}
      {(googleMutation.isSuccess || kakaoMutation.isSuccess) && (
        <p className="text-gray500">로그인 성공! 이동 중...</p>
      )}
    </div>
  );
}
