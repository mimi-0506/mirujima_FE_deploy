'use server';

import axios from 'axios';

import { withTokenFromServer } from './interceptors/request';
import { defaultResponseSuccessInterceptor } from './interceptors/response';

export const apiWithServerToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

apiWithServerToken.interceptors.request.use(withTokenFromServer);
apiWithServerToken.interceptors.response.use(defaultResponseSuccessInterceptor);
