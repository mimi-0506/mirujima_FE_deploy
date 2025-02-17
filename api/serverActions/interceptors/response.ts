'use server';

import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

import type { AxiosResponse } from 'axios';

export const defaultResponseSuccessInterceptor = async (response: AxiosResponse) => response;

export const retryRequestWhenAccessTokenIsExpire = async (error: any) => {
  const originalRequest = error.config;
  const isTokenError =
    (error.response?.status === 403 || error.response?.status === 401) && !originalRequest._retry;

  if (isTokenError) {
    originalRequest._retry = true;
    try {
      const refreshToken = await getCookie('refreshToken', { cookies });
      if (!refreshToken) {
        return Promise.reject(new Error('Refresh token 없음'));
      }

      // 토큰 재발급
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
        refreshToken
      });

      if (!data || !data.result || !data.result.accessToken) {
        return Promise.reject(new Error('새로운 access token 없음'));
      }

      // 쿠키 재설정
      await setCookie('accessToken', data.result.accessToken, { path: '/', cookies });

      // 헤더 재설정
      originalRequest.headers['Authorization'] = `Bearer ${data.result.accessToken}`;

      // 재시도
      return axios(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};
