import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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

export const useSignUpMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signUpUser,

    onMutate: () => {
      console.log('회원가입 요청중...');
    },

    onSuccess: (data) => {
      alert('회원가입 되었습니다.');
      router.push('/login');
    },

    onError: (error: Error) => {
      console.error('회원가입 실패:', error);
    },

    onSettled: () => {
      console.log('회원가입 요청 완료 (성공 또는 실패)');
    }
  });
};
