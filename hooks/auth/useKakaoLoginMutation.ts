import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import authApi from '@/apis/clientActions/authApi';
import { useInfoStore } from '@/provider/store-provider';
import type { OAuthLoginResponse } from '@/types/auth.types';
import { KAKAO_LOGIN_ERROR, KAKAO_LOGIN_SUCCESS, KAKAO_LOGIN_LOADING } from '@/constant/toastText';

const COOKIEOPTIONS = {
  maxAge: 60 * 60 * 24, // 1일
  path: '/',
  sameSite: 'strict' as const
};

const redirectUri =
  typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : process.env.NEXT_PUBLIC_REDIRECT_URI || '';

const kakaoLogin = async (authorizationCode: string): Promise<OAuthLoginResponse> => {
  try {
    const response = await authApi.get('/auth/kakao', {
      params: {
        code: authorizationCode,
        redirectUri
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
      toast.loading(KAKAO_LOGIN_LOADING, { id: 'kakaoLogin' });
    },
    onSuccess: (data) => {
      toast.dismiss('kakaoLogin');

      if (!data.success || !data.result) {
        toast.error(data.message || KAKAO_LOGIN_ERROR);
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

        toast.success(KAKAO_LOGIN_SUCCESS, { duration: 2000 });
        router.push('/dashboard');
      } else {
        toast.error(KAKAO_LOGIN_ERROR);
      }
    },
    onError: (error: unknown) => {
      toast.dismiss('kakaoLogin');
      console.error(error);
      toast.error(KAKAO_LOGIN_ERROR);
    }
  });
};
