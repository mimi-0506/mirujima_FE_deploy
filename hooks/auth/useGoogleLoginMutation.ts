import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import authApi from '@/apis/clientActions/authApi';
import { setCookie } from 'cookies-next';
import { useInfoStore, useModalStore } from '@/provider/store-provider';
import { useRouter } from 'next/navigation';
import {
  GOOGLE_LOGIN_ERROR,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_LOADING
} from '@/constant/toastText';

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
  const response = await authApi.get('/auth/google', {
    params: {
      code: authorizationCode,
      redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
    }
  });
  return response.data;
}

export const useGoogleLoginMutation = () => {
  const setInfo = useInfoStore((state) => state.setInfo);
  const setIsLoading = useModalStore((state) => state.setIsLoading);
  const router = useRouter();

  return useMutation<GoogleLoginResponse, unknown, string>({
    mutationFn: googleLogin,
    onMutate: () => {
      setIsLoading(true);
      toast.loading(GOOGLE_LOGIN_LOADING, { id: 'googleLogin' });
    },
    onSuccess: (data) => {
      setIsLoading(false);
      toast.dismiss('googleLogin');
      if (!data.success || !data.result) {
        toast.error(data.message || GOOGLE_LOGIN_ERROR);
        console.log(data);
        return;
      }
      const { accessToken, refreshToken, user, expiredAt } = data.result;
      setCookie('accessToken', accessToken, { expires: new Date(expiredAt) });
      setCookie('refreshToken', refreshToken, { expires: new Date(expiredAt) });
      setCookie('user', JSON.stringify(user), { expires: new Date(expiredAt) });

      setInfo({
        userId: user.id,
        email: user.email,
        name: user.username
      });

      toast.success(GOOGLE_LOGIN_SUCCESS);
      router.push('/dashboard');
    },
    onError: (error) => {
      setIsLoading(false);
      toast.dismiss('googleLogin');
      console.error(error);
      toast.error(GOOGLE_LOGIN_ERROR);
    }
  });
};
