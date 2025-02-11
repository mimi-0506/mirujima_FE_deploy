// src/api/authApi.ts
import axios from 'axios';

import requestInterceptor from './interceptors/requestInterceptors';
import responseInterceptor from './interceptors/responseInterceptors';

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true
});

authApi.interceptors.request.use(
  requestInterceptor.requestInterceptor,
  requestInterceptor.requestInterceptorError
);

authApi.interceptors.response.use(
  responseInterceptor.responseInterceptor,
  responseInterceptor.responseInterceptorError
);

export default authApi;
