'use server';

import type { AxiosError, AxiosResponse } from 'axios';
import { redirect } from 'next/navigation';

export const defaultResponseSuccessInterceptor = async (response: AxiosResponse) => response;

export const errorHandlerInterceptor = async (error: AxiosError) => {
  if (error.response) {
    const isUnauthorized = error.response.status === 401 || error.response.status === 403;
    if (isUnauthorized) return redirect('/logout');
  } else if (error.request) {
    const isNetworkError = error.code === 'ERR_NETWORK';
    if (isNetworkError) return redirect('/dashboard');
  } else {
    return Promise.reject(error);
  }

  return Promise.reject(error);
};
