import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import authApi from '@/apis/clientActions/authApi';
import { LOGIN_ERROR, LOGIN_SUCCESS } from '@/constant/toastText';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import { COOKIEOPTIONS_ACCESS, COOKIEOPTIONS_REFRESH } from '@/constant/cookieOptions';
import { AuthResponse } from '@/types/auth.types';

interface LoginMutationVariables {
  formData?: {
    email: string;
    password: string;
  };
  isAutoLogin?: boolean;
}

const loginUser = async (variables: LoginMutationVariables): Promise<AuthResponse> => {
  const { formData } = variables;
  try {
    const response = await authApi.post<AuthResponse>('/auth/login', formData);
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
        setCookie('accessToken', accessToken, COOKIEOPTIONS_ACCESS);
        setCookie('user', JSON.stringify(user), COOKIEOPTIONS_ACCESS);
        setInfo({
          userId: user.id,
          email: user.email,
          name: user.username
        });
        if (isAutoLogin) {
          setCookie('refreshToken', refreshToken, COOKIEOPTIONS_REFRESH);
        } else {
          deleteCookie('refreshToken', { path: COOKIEOPTIONS_REFRESH.path });
        }
        toast.success(LOGIN_SUCCESS, { duration: 2000 });
        router.push('/dashboard');
      } else {
        deleteCookie('refreshToken', { path: COOKIEOPTIONS_REFRESH.path });

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
