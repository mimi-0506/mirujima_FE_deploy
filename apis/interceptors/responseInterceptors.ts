import { getCookie, setCookie } from 'cookies-next';
import authApi from '../clientActions/authApi';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface RefreshTokenResponse {
  result?: {
    accessToken: string;
    refreshToken?: string;
  };
}

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const responseInterceptor = (response: AxiosResponse) => response;

const responseInterceptorError = async (error: AxiosError): Promise<unknown> => {
  const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;

  const isUnauthorized = error.response?.status === 401 || error.response?.status === 403;

  if (isUnauthorized && originalRequest && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = getCookie('refreshToken');
      if (!refreshToken) {
        return Promise.reject(new Error('Refresh token 없음'));
      }

      const { data } = await authApi.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });

      if (!data?.result?.accessToken) {
        return Promise.reject(new Error('새로운 access token 없음'));
      }

      setCookie('accessToken', data.result.accessToken, { path: '/' });
      originalRequest.headers['Authorization'] = `Bearer ${data.result.accessToken}`;
      return authApi(originalRequest);
    } catch (refreshError) {
      return Promise.reject(new Error((refreshError as AxiosError).message));
    }
  }

  return Promise.reject(error);
};

const interceptors = {
  responseInterceptor,
  responseInterceptorError
};

export default interceptors;
