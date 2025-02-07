import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import api from '../../api/authApi';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

const COOKIEOPTIONS = {
  maxAge: 60 * 60 * 24,
  path: '/',
  secure: typeof window !== 'undefined' && window.location.protocol === 'https:',
  sameSite: 'strict' as const
};

const loginUser = async (formData: LoginFormData): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/4/auth/login', formData);
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

  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      toast.loading('로그인중...', { id: 'login' });
    },
    onSuccess: (data) => {
      toast.dismiss('login');
      const { accessToken, refreshToken, user } = data;

      if (accessToken && user) {
        setCookie('accessToken', accessToken, COOKIEOPTIONS);
        setCookie('refreshToken', refreshToken, COOKIEOPTIONS);
        setCookie('user', JSON.stringify(user), COOKIEOPTIONS);
        toast.success('로그아웃 되었습니다!', { duration: 2000 });
        setTimeout(() => {
          router.push('/signup');
        }, 500);
      }
    },
    onError: (error: unknown) => {
      toast.dismiss('login');
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      } else {
        toast.error('예기치 못한 오류가 발생했습니다.');
      }
    },
    onSettled: () => {
      toast.dismiss('login');
    }
  });
};
