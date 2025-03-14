'use server';

import { getCookie, setCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { apiWithServerToken } from '..';

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

// 클라이언트, 서버에서 쿠키 재발급 로직을 통일해야함 (서버에서는 쿠키 재설정 불가)
export const retryRequestWhenAccessTokenIsExpire = async (error: AxiosError): Promise<unknown> => {
  const originalRequest = error.config as ExtendedAxiosRequestConfig | undefined;

  const isUnauthorized = error.response?.status === 401 || error.response?.status === 403;

  if (isUnauthorized && originalRequest && !originalRequest._retry) {
    originalRequest._retry = true;
    try {
      const refreshToken = await getCookie('refreshToken', { cookies });
      if (!refreshToken) {
        return Promise.reject(new Error('Refresh token 없음'));
      }

      const { data } = await apiWithServerToken.post<RefreshTokenResponse>('/auth/refresh', {
        refreshToken
      });

      if (!data?.result?.accessToken) {
        return Promise.reject(new Error('새로운 access token 없음'));
      }

      await setCookie('accessToken', data.result.accessToken, { path: DOMAIN, cookies });

      originalRequest.headers['Authorization'] = `Bearer ${data.result.accessToken}`;

      return apiWithServerToken(originalRequest);
    } catch (refreshError) {
      return Promise.reject(new Error((refreshError as AxiosError).message));
    }
  }

  return Promise.reject(error);
};
