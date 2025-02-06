import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import api from '../../api/authApi';

import type { AxiosError } from 'axios';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpUser = async (formData: SignUpFormData) => {
  try {
    const response = await api.post('/4/user', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const useSignUpMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signUpUser,

    onMutate: () => {
      console.log('회원가입 요청중...');
    },

    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
      router.push('/login');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      console.error('회원가입 실패:', error);
    },

    onSettled: () => {
      console.log('회원가입 요청 완료 (성공 또는 실패)');
    }
  });
};
