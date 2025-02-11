import { getCookie } from 'cookies-next';

import type { InternalAxiosRequestConfig } from 'axios';

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers = config.headers || ({} as Record<string, string>);

  const accessToken = getCookie('accessToken');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    console.warn('🚨 accessToken 없음 - 401/403 가능성 있음');
  }
  return config;
};

const requestInterceptorError = (error: any) => Promise.reject(error);

export default { requestInterceptor, requestInterceptorError };
