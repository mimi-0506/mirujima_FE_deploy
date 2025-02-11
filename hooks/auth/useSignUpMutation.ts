import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import api from '../../api/authApi';

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

interface EmailCheckResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
    exists: boolean;
  };
}

export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const response = await api.get<EmailCheckResponse>(`/user/exists?email=${email}`);
    return response.data.result.exists;
  } catch (error) {
    throw new Error('이미 존재하는 이메일입니다.');
  }
};

const signUpUser = async (formData: SignUpFormData): Promise<void> => {
  try {
    await api.post('/user', formData);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error('Axios 외 다른 에러 발생');
    }
  }
};

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
    toast.error(`회원가입 실패: ${errorMessage}`);
  } else {
    toast.error(error instanceof Error ? error.message : '예기치 못한 오류가 발생했습니다.');
  }
};

export const useSignUpMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (formData: SignUpFormData) => {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        throw new Error('이미 존재하는 이메일입니다.');
      }
      await signUpUser(formData);
    },
    onMutate: () => {
      toast.loading('회원가입 요청 중...', { id: 'signup' });
    },
    onSuccess: () => {
      toast.success('회원가입 되었습니다!', { duration: 2000 });
      setTimeout(() => {
        router.push('/login');
      }, 500);
    },
    onError: (error: unknown) => {
      handleError(error);
    },
    onSettled: () => {
      toast.dismiss('signup');
    }
  });
};
