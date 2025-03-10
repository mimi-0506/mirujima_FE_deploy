import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import authApi from '@/apis/clientActions/authApi';
import { LOGIN_ERROR, LOGIN_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

const isLocal = process.env.NODE_ENV === 'development';
const DOMAIN = isLocal ? '/' : process.env.NEXT_PUBLIC_DOMAIN;

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
    user: { id: number; username: string; email: string; createdAt: string; updatedAt: string };
    accessToken: string;
    refreshToken: string;
    expiredAt: string;
  } | null;
}

interface LoginMutationVariables {
  formData: LoginFormData;
  isAutoLogin: boolean;
}

const COOKIEOPTIONS_ACCESS = {
  maxAge: 60 * 60, // 1시간
  path: DOMAIN,
  sameSite: 'strict' as const
};

const COOKIEOPTIONS_REFRESH = {
  maxAge: 60 * 60 * 24 * 7, // 1주일
  path: DOMAIN,
  sameSite: 'strict' as const
};

const loginUser = async (variables: LoginMutationVariables): Promise<LoginResponse> => {
  const { formData } = variables;
  try {
    const response = await authApi.post<LoginResponse>('/auth/login', formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error('Axios 외 다른 에러 발생');
  }
};

export const useLoginMutation = () => {
  const router = useRouter();
  const setInfo = useInfoStore((state) => state.setInfo);
  const setIsLoading = useModalStore((state) => state.setIsLoading);

  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: (data, variables) => {
      setIsLoading(false);
      if (!data.success || !data.result) {
        toast.error(data.message || LOGIN_ERROR);
        return;
      }

      const { accessToken, refreshToken, user } = data.result;
      const { isAutoLogin } = variables;

      if (accessToken && user) {
        // accessToken, user 쿠키 저장 (feat/#186/autologin 로직 사용)
        setCookie('accessToken', accessToken, COOKIEOPTIONS_ACCESS);
        setCookie('user', JSON.stringify(user), COOKIEOPTIONS_ACCESS);
        setInfo({
          userId: user.id,
          email: user.email,
          name: user.username
        });
        if (isAutoLogin) {
          setCookie('refreshToken', refreshToken, COOKIEOPTIONS_REFRESH);
          console.log('[로그인] 자동 로그인 활성화됨 - refreshToken 저장 (7일 유효)');
        } else {
          deleteCookie('refreshToken', { path: DOMAIN });
          console.log('[로그인] 자동 로그인 비활성화됨 - refreshToken 삭제, accessToken만 1시간 유효');
        }
        toast.success(LOGIN_SUCCESS, { duration: 2000 });
        router.push('/dashboard');
      } else {
        deleteCookie('refreshToken', { path: DOMAIN });
        console.log('[로그인] 자동 로그인 비활성화됨 - refreshToken 삭제, accessToken만 1시간 유효');
        toast.error(LOGIN_ERROR);
      }
    },
    onError: (error: unknown) => {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || LOGIN_ERROR;
        toast.error(errorMessage);
      }
    }
  });
};
