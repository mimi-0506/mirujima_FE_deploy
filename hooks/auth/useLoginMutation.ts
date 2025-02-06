import { useMutation } from '@tanstack/react-query';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import api from '../../api/authApi';

import type { AxiosError } from 'axios';

interface LoginFormData {
  email: string;
  password: string;
}

const loginUser = async (formData: LoginFormData) => {
  console.log('로그인 요청 시작:', formData);
  try {
    const response = await api.post('/4/auth/login', formData);
    console.log('로그인 요청 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('로그인 요청 실패:', error);
    throw error;
  }
};

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      const { accessToken, user } = data;

      if (accessToken && user?.name) {
        setCookie('accessToken', accessToken, {
          maxAge: 60 * 60 * 24 * 1,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        setCookie('user', JSON.stringify({ name: user.name }), {
          maxAge: 60 * 60 * 24 * 1,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }

      router.push('/signup'); //user.name 받아오는지 확인용
      // router.push('/dashboard'); 원래 여기로 가야하는데
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.error('로그인 실패:', error);
    }
  });
};
