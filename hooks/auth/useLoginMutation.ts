import { useMutation } from '@tanstack/react-query';
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
  console.log(' 로그인 요청 데이터:', formData);
  const response = await api.post<LoginResponse>('/4/auth/login', formData);
  return response.data;
};

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: loginUser,

    onSuccess: (data) => {
      const { accessToken, refreshToken, user } = data;

      if (accessToken && user) {
        setCookie('accessToken', accessToken, COOKIEOPTIONS);
        setCookie('refreshToken', refreshToken, COOKIEOPTIONS);
        setCookie('user', JSON.stringify(user), COOKIEOPTIONS);
        router.push('/signup');
      }
    },

    onError: (error) => {
      console.error('로그인 실패:', error || '알 수 없는 오류');
    }
  });
};
