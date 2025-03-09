'use client';

import axios from 'axios';
import { getCookie } from 'cookies-next';

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const withTokenFromClient = (config: InternalAxiosRequestConfig) => {
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');

  config.headers.Authorization = `Bearer ${accessToken || refreshToken}`;
  return config;
};

export const apiWithClientToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// ✅ 응답 인터셉터: 에러 발생 시 URL 이동
const errorInterceptor = async (error: AxiosError) => {
  if (error.response) {
    if (error.response.status === 401) {
      window.location.href = '/logout';
    }
    //  else if (error.response.status >= 400 && error.response.status < 500) {
    //   window.location.href = '/pageError';
    // } else if (error.response.status >= 500) {
    //   window.location.href = '/serverError';
    // }
  }
  return Promise.reject(error);
};

// ✅ 응답 인터셉터: 정상 응답 로깅
const responseInterceptor = async (response: AxiosResponse) => {
  // console.log('현재 response', response, response.data?.code, response.status);
  return response;
};

// ✅ Axios 인스턴스에 인터셉터 추가
apiWithClientToken.interceptors.request.use(withTokenFromClient);
apiWithClientToken.interceptors.response.use(responseInterceptor, errorInterceptor);
