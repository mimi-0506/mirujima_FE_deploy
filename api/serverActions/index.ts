import axios from 'axios';
import { getCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

import type { InternalAxiosRequestConfig } from 'axios';
// accessToken 만료 시 재 발급하는 기능 추가 필요

export const withTokenFromServer = async (config: InternalAxiosRequestConfig) => {
  const accessToken = await getCookie('accessToken', { cookies });
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    const refreshToken = await getCookie('refreshToken');
    config.headers.Authorization = `Bearer ${refreshToken}`;
  }
  return config;
};

export const apiWithServerToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

apiWithServerToken.interceptors.request.use(withTokenFromServer);
