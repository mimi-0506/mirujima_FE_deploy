import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import authApi from '@/apis/clientActions/authApi';
import { LOGIN_ERROR, LOGIN_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';

// 버셀 배포시에만 도메인을 버셀 도메인으로 적용. 그 외에는 "/"
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
    user: {
      id: number;
      username: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
    expiredAt: string;
  } | null;
}

const COOKIEOPTIONS = {
  maxAge: 60 * 60 * 24,
  path: DOMAIN,
  sameSite: 'strict' as const
};

const loginUser = async (formData: LoginFormData): Promise<LoginResponse> => {
  try {
    const response = await authApi.post<LoginResponse>('/auth/login', formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error('Axios 외 다른 에러 발생');
    }
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
    onSuccess: (data) => {
      setIsLoading(false);
      if (!data.success || !data.result) {
        toast.error(data.message || LOGIN_ERROR);
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

        toast.success(LOGIN_SUCCESS, { duration: 2000 });
        router.push('/dashboard');
      } else {
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
