import toast from 'react-hot-toast';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setCookie } from 'cookies-next';

interface GoogleLoginResponse {
  success: boolean;
  code: number;
  message: string;
  result: {
    user: {
      id: number;
      username: string;
      email: string;
      profileImagePath: string;
      createdAt: string;
      updatedAt: string;
    };
    accessToken: string;
    refreshToken: string;
    expiredAt: string;
  } | null;
}

async function googleLogin(authorizationCode: string): Promise<GoogleLoginResponse> {
  const response = await axios.get('https://api.mirujima.shop/mirujima/auth/google', {
    params: { code: authorizationCode }
  });
  return response.data;
}

export const useGoogleLoginMutation = () => {
  return useMutation<GoogleLoginResponse, unknown, string>({
    mutationFn: googleLogin,
    onMutate: () => {
      toast.loading('구글 로그인 중...', { id: 'googleLogin' });
    },
    onSuccess: (data) => {
      toast.dismiss('googleLogin');
      if (!data.success || !data.result) {
        toast.error(data.message || '구글 로그인에 실패했습니다.');
        console.log(data);
        return;
      }
      const { accessToken, refreshToken, user, expiredAt } = data.result;
      setCookie('accessToken', accessToken, { expires: new Date(expiredAt) });
      setCookie('refreshToken', refreshToken, { expires: new Date(expiredAt) });
      setCookie('user', JSON.stringify(user), { expires: new Date(expiredAt) });
      toast.success('구글 로그인 성공!');
    },
    onError: (error) => {
      toast.dismiss('googleLogin');
      console.error(error);
      toast.error('구글 로그인 중 오류가 발생했습니다.');
    }
  });
};
