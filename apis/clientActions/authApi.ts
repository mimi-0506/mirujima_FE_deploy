import axios from 'axios';

import requestInterceptors from '../interceptors/requestInterceptors';
import responseInterceptors from '../interceptors/responseInterceptors';

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true
});

authApi.interceptors.request.use(
  requestInterceptors.requestInterceptor,
  requestInterceptors.requestInterceptorError
);

authApi.interceptors.response.use(
  responseInterceptors.responseInterceptor,
  responseInterceptors.responseInterceptorError
);

export default authApi;
