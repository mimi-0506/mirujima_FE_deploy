// import { getCookie } from 'cookies-next';

// import type { InternalAxiosRequestConfig } from 'axios';

// const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//   config.headers = config.headers || ({} as Record<string, string>);

//   const accessToken = getCookie('accessToken');
//   if (accessToken) {
//     config.headers['Authorization'] = `Bearer ${accessToken}`;
//   } else {
//     console.warn('🚨 accessToken 없음 - 401/403 가능성 있음');
//   }
//   return config;
// };

// const requestInterceptorError = (error: any) => Promise.reject(error);

// export default { requestInterceptor, requestInterceptorError };
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';

import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

const REFRESH_THRESHOLD_MINUTES = 50;

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 2;

function decodeJwtPayload<T = any>(token: string): T | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.error('[JWT 디코딩] 잘못된 형식의 JWT 입니다.');
      return null;
    }
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return JSON.parse(decoded) as T;
  } catch (error) {
    console.error('[JWT 디코딩] 디코딩 중 오류:', error);
    return null;
  }
}

async function refreshAccessToken(): Promise<string> {
  if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
    console.error('[리프레시] 최대 시도 횟수(2회) 초과!');
    throw new Error('Max refresh attempts exceeded');
  }

  refreshAttempts += 1;
  console.log(`[리프레시] ${refreshAttempts}번째 시도 시작`);

  const refreshToken = getCookie('refreshToken');
  if (!refreshToken) {
    throw new Error('[리프레시] refreshToken이 쿠키에 없습니다.');
  }

  try {
    const response = await axios.post(
      'https://api.mirujima.shop/mirujima/auth/refresh',
      {
        refreshToken
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const data = response.data;
    if (!data?.result?.accessToken) {
      throw new Error('[리프레시] 응답에 result.accessToken이 없습니다.');
    }

    const newAccessToken = data.result.accessToken;
    const newRefreshToken = data.result.refreshToken;
    setCookie('accessToken', newAccessToken);

    if (newRefreshToken) {
      setCookie('refreshToken', newRefreshToken);
    }

    console.log(`[리프레시] 새 AccessToken: ${newAccessToken}`);
    console.log(`[리프레시] 새 RefreshToken: ${newRefreshToken}`);

    refreshAttempts = 0;

    return newAccessToken;
  } catch (error) {
    console.error('[리프레시] 갱신 중 에러 발생:', error);
    throw error;
  }
}

export async function requestInterceptor(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  config.headers = config.headers || {};

  const accessToken = getCookie('accessToken');
  if (!accessToken) {
    console.warn('[requestInterceptor] accessToken 없음 - 401/403 발생 가능');
    return config;
  }

  if (config.url?.includes('/auth/refresh')) {
    console.log('[requestInterceptor] refresh API 요청이므로 기존 토큰 그대로 사용');
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  let tokenToUse = accessToken as string;

  try {
    const decoded = decodeJwtPayload<{ exp: number }>(tokenToUse);
    if (!decoded || !decoded.exp) {
      console.warn('[requestInterceptor] 토큰에 exp가 없거나 디코딩 실패');
    } else {
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresIn = decoded.exp - currentTime;
      const remainingMinutes = Math.floor(expiresIn / 60);

      console.log(`[requestInterceptor] 토큰 남은 시간: ${remainingMinutes}분 (${expiresIn}초)`);

      if (expiresIn < REFRESH_THRESHOLD_MINUTES * 60) {
        console.warn('[requestInterceptor] 만료 임박 - refreshAccessToken 진행');

        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken()
            .then((newToken) => newToken)
            .finally(() => {
              isRefreshing = false;
            });
        } else {
          console.log('[requestInterceptor] 이미 갱신 중이므로 대기');
        }

        if (refreshPromise) {
          tokenToUse = await refreshPromise;
        }
      } else {
        console.log('[requestInterceptor] 토큰 만료까지 충분한 시간 남음');
      }
    }
  } catch (error) {
    console.error('[requestInterceptor] 토큰 만료 검사 중 에러:', error);
  }

  config.headers.Authorization = `Bearer ${tokenToUse}`;
  return config;
}

export function requestInterceptorError(error: AxiosError) {
  return Promise.reject(error);
}

export default { requestInterceptor, requestInterceptorError };
