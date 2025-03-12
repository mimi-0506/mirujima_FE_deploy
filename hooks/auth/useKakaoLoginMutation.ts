import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import authApi from '@/apis/clientActions/authApi';
import { useInfoStore } from '@/provider/store-provider';
import type { OAuthLoginResponse } from '@/types/auth.types';

const COOKIEOPTIONS = {
  maxAge: 60 * 60 * 24, // 1일
  path: '/',
  sameSite: 'strict' as const
};

const kakaoLogin = async (authorizationCode: string): Promise<OAuthLoginResponse> => {
  try {
    const response = await authApi.get('/auth/kakao', {
      params: {
        code: authorizationCode,
        redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI
      }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error('카카오 로그인 중 예상치 못한 오류 발생');
    }
  }
};

export const useKakaoLoginMutation = () => {
  const router = useRouter();
  const { setInfo } = useInfoStore((state) => state);

  return useMutation({
    mutationFn: kakaoLogin,
    onMutate: () => {
      toast.loading('카카오 로그인 처리 중...', { id: 'kakaoLogin' });
    },
    onSuccess: (data) => {
      toast.dismiss('kakaoLogin');

      if (!data.success || !data.result) {
        toast.error(data.message || '카카오 로그인에 실패했습니다.');
        return;
      }

      const { accessToken, refreshToken, user } = data.result;

      if (accessToken && user) {
        setCookie('accessToken', accessToken, COOKIEOPTIONS);
        setCookie('refreshToken', refreshToken, COOKIEOPTIONS);
        setCookie('user', JSON.stringify(user), COOKIEOPTIONS);

        setInfo({
          userId: user.id,
          email: user.email,
          name: user.username
        });

        toast.success('카카오로 로그인 되었습니다!', { duration: 2000 });
        router.push('/dashboard');
      } else {
        toast.error('로그인 정보가 누락되었습니다.');
      }
    },
    onError: (error: unknown) => {
      toast.dismiss('kakaoLogin');

      // 인터셉터에서 이미 에러를 처리하므로 추가 메시지 생략 가능
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || '카카오 로그인 중 오류가 발생했습니다.';
        toast.error(errorMessage);
      }
    }
  });
};
