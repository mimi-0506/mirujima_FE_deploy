import { useMutation } from '@tanstack/react-query';

import api from '../../api/authApi';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpUser = async (formData: SignUpFormData) => {
  const response = await api.post('/4/user', formData);
  return response.data;
};

export const useSignUpMutation = () =>
  useMutation({
    mutationFn: signUpUser,

    onMutate: () => {
      console.log('회원가입 요청중...');
    },

    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
    },

    onError: (error: any) => {
      console.error('회원가입 실패:', error);
    },

    onSettled: () => {
      console.log('회원가입 요청 완료 (성공 또는 실패)');
    }
  });
