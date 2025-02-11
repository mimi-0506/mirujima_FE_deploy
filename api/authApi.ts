import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    } else {
      console.warn('🚨 accessToken 없음 - 401/403 가능성 있음');
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 403 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        console.log('[Interceptor] 403 에러 감지 - refresh token 시도 중');

        const refreshToken = getCookie('refreshToken');
        if (!refreshToken) {
          console.error('[Interceptor] Refresh token 없음.');
          return Promise.reject(new Error('Refresh token 없음'));
        }

        console.log('[Interceptor] 저장된 refresh token:', refreshToken);

        const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh`, {
          refreshToken
        });

        console.log('[Interceptor] 서버 응답:', data);

        if (!data || !data.result || !data.result.accessToken) {
          console.error('[Interceptor] 새 access token을 받지 못했습니다.', data);
          return Promise.reject(new Error('새로운 access token 없음'));
        }

        console.log('[Interceptor] 새로운 access token 발급:', data.result.accessToken);

        setCookie('accessToken', data.result.accessToken, { path: '/' });

        const checkCookie = getCookie('accessToken');
        console.log('[Interceptor] 쿠키에 저장된 access token:', checkCookie);

        originalRequest.headers['Authorization'] = `Bearer ${data.result.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('[Interceptor] 토큰 갱신 실패:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
