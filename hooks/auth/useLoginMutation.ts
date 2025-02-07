import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import api from '../../api/authApi';

import type { AxiosError } from 'axios';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: { name: string };
}

const COOKIEOPTIONS = {
  maxAge: 60 * 60 * 24,
  path: '/',
  secure: typeof window !== 'undefined' && window.location.protocol === 'https:',
  sameSite: 'strict' as const
};

const loginUser = async (formData: LoginFormData): Promise<LoginResponse> => {
  const response = await api.post('/4/auth/login', formData);
  return response.data;
};

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation<LoginResponse, AxiosError<{ message: string }>, LoginFormData>({
    mutationFn: loginUser,

    onSuccess: (data: LoginResponse) => {
      const { accessToken, user } = data;

      if (accessToken && user?.name) {
        setCookie('accessToken', accessToken, COOKIEOPTIONS);
        setCookie('user', JSON.stringify({ name: user.name }), COOKIEOPTIONS);

        router.push('/signup');
      }
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.error('로그인 실패:', error.response?.data?.message || '알 수 없는 오류');
    }
  });
};
