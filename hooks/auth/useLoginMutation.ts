import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import api from '@/apis/clientActions/authApi';
import { useInfoStore } from '@/provider/store-provider';

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
  path: '/',
  sameSite: 'strict' as const
};

const loginUser = async (formData: LoginFormData): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/auth/login', formData);
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
  const { setInfo } = useInfoStore((state) => state);

  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      toast.loading('로그인중...', { id: 'login' });
    },
    onSuccess: (data) => {
      toast.dismiss('login');

      if (!data.success || !data.result) {
        toast.error(data.message || '로그인에 실패했습니다.');
        return;
      }

      const { accessToken, refreshToken, user } = data.result;

      if (accessToken && user) {
        setCookie('accessToken', accessToken, COOKIEOPTIONS);
        setCookie('refreshToken', refreshToken, COOKIEOPTIONS);
        setCookie('user', JSON.stringify(user), COOKIEOPTIONS);

        setInfo({
          id: user.id,
          email: user.email,
          name: user.username
        });

        toast.success('로그인 되었습니다!', { duration: 2000 });
        router.push('/dashboard');
      } else {
        toast.error('로그인 정보가 누락되었습니다.');
      }
    },
    onError: (error: unknown) => {
      toast.dismiss('login');

      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
        toast.error(errorMessage);
      }
    }
  });
};
