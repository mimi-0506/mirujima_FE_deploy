import axios from 'axios';
import { getCookie } from 'cookies-next';

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// accessToken 만료시 로그아웃시킴
export const withTokenFromClient = (config: InternalAxiosRequestConfig) => {
  const accessToken = getCookie('accessToken');
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  else {
    const refreshToken = getCookie('refreshToken');
    config.headers.Authorization = `Bearer ${refreshToken}`;
  }

  return config;
};

export const apiWithClientToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// 정상 응답 처리
const tokenExpireCheck = (response: AxiosResponse) => {
  console.log('response');
  if (response.data.code !== 200) {
    console.log('토큰 이상');
    window.location.href = '/logout';
  }
  return response;
};

// 에러 응답 처리 (404 등)
// 토큰 만료 처리도 이쪽에 추가할 것
const errorHandler = (error: AxiosError) => {
  if (error.response) {
    const { status } = error.response;

    if ([401, 403, 404].includes(status)) {
      console.log(`HTTP ${status} 에러 - 로그아웃 처리`);
      window.location.href = '/logout';
    }
  }

  return Promise.reject(error);
};

apiWithClientToken.interceptors.request.use(withTokenFromClient);
apiWithClientToken.interceptors.response.use(tokenExpireCheck, errorHandler);
