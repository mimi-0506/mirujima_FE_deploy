'use server';

import axios from 'axios';

import { withTokenFromServer } from './interceptors/request';
import {
  defaultResponseSuccessInterceptor,
  retryRequestWhenAccessTokenIsExpire
} from './interceptors/response';

export const apiWithServerToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

apiWithServerToken.interceptors.request.use(withTokenFromServer);
apiWithServerToken.interceptors.response.use(
  defaultResponseSuccessInterceptor,
  retryRequestWhenAccessTokenIsExpire
);
