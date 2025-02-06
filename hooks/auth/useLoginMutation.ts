import { useMutation } from '@tanstack/react-query';

import api from '../../api/authApi';

interface LoginFormData {
  email: string;
  password: string;
}

const loginUser = async (formData: LoginFormData) => {
  const response = await api.post('/4/auth/login', formData);
  return response.data;
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: loginUser,

    onMutate: () => {
      console.log('로그인 요청중...');
    },

    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
    },

    onError: (error: any) => {
      console.error('로그인 실패:', error);
    },

    onSettled: () => {
      console.log('로그인 요청 완료 (성공 또는 실패)');
    }
  });
