import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import api from '../../api/authApi';

import type { AxiosError } from 'axios';

interface LoginFormData {
  email: string;
  password: string;
}

const loginUser = async (formData: LoginFormData) => {
  const response = await api.post('/4/auth/login', formData);
  return response.data;
};

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      alert(`반갑습니다, ${data.user?.name}님!`);
      router.push('/dashboard');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.error('로그인 실패:', error);
    }
  });
};
