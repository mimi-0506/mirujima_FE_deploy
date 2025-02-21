import axios from 'axios';
import { getCookie } from 'cookies-next';

import type { InternalAxiosRequestConfig } from 'axios';
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

const tokenExpireCheck = (config: any) => {
  // console.log('config', config);

  if (config.data.code === 401) {
    console.log('토큰만료 ');
    window.location.href = '/logout';
  }
  return config;
};

apiWithClientToken.interceptors.request.use(withTokenFromClient);

apiWithClientToken.interceptors.response.use(tokenExpireCheck);
