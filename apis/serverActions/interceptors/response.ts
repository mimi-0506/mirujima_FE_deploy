'use server';

import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 버셀 배포시에만 도메인을 버셀 도메인으로 적용. 그 외에는 "/"
const isLocal = process.env.NODE_ENV === 'development';
const DOMAIN = isLocal ? '/' : process.env.NEXT_PUBLIC_DOMAIN;

interface RefreshTokenResponse {
  result?: {
    accessToken: string;
    refreshToken?: string;
  };
}

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const defaultResponseSuccessInterceptor = async (response: AxiosResponse) => response;

export const retryRequestWhenAccessTokenIsExpire = async (error: AxiosError): Promise<unknown> => {
  const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;
  const isTokenError =
    (error.response?.status === 403 || error.response?.status === 401) &&
    originalRequest &&
    !originalRequest._retry;

  if (isTokenError) {
    originalRequest._retry = true;
    try {
      const refreshToken = await getCookie('refreshToken', { cookies });
      if (!refreshToken) {
        return Promise.reject(new Error('Refresh token 없음'));
      }

      // 토큰 재발급
      const { data } = await axios.post<RefreshTokenResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`,
        { refreshToken }
      );

      if (!data?.result?.accessToken) {
        return Promise.reject(new Error('새로운 access token 없음'));
      }

      // 쿠키 재설정
      await setCookie('accessToken', data.result.accessToken, { path: DOMAIN, cookies });

      // 헤더 재설정
      originalRequest.headers['Authorization'] = `Bearer ${data.result.accessToken}`;

      // 재시도
      return axios(originalRequest);
    } catch (refreshError) {
      return Promise.reject(new Error((refreshError as AxiosError).message));
    }
  }

  return Promise.reject(error);
};
