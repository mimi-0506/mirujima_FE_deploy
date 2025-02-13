'use server';

import { getCookie } from 'cookies-next/server';
import { cookies } from 'next/headers';

import type { InternalAxiosRequestConfig } from 'axios';

export const withTokenFromServer = async (config: InternalAxiosRequestConfig) => {
  const accessToken = await getCookie('accessToken', { cookies });
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};
