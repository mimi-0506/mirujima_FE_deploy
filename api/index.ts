import { getCookie } from 'cookies-next';

import type { InternalAxiosRequestConfig } from 'axios';

export const withToken = (config: InternalAxiosRequestConfig) => {
  const accessToken = getCookie('accessToken');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    const refreshToken = getCookie('refreshToken');
    config.headers.Authorization = `Bearer ${refreshToken}`;
  }
  return config;
};
