import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

const REFRESH_THRESHOLD_MINUTES = 50;

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

let refreshAttempts = 0;
const MAX_REFRESH_ATTEMPTS = 2;

interface JwtPayload {
  exp: number;
  [key: string]: unknown;
}

function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    return JSON.parse(decoded) as JwtPayload;
  } catch (error) {
    return null;
  }
}

async function refreshAccessToken(): Promise<string> {
  if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
    throw new Error('Max refresh attempts exceeded');
  }

  refreshAttempts += 1;

  const refreshToken = getCookie('refreshToken');
  if (!refreshToken) {
    throw new Error('refreshToken이 쿠키에 없습니다.');
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

    const data = response.data as { result?: { accessToken: string; refreshToken?: string } };
    if (!data?.result?.accessToken) {
      throw new Error('응답에 result.accessToken이 없습니다.');
    }

    const newAccessToken = data.result.accessToken;
    const newRefreshToken = data.result.refreshToken;
    setCookie('accessToken', newAccessToken);

    if (newRefreshToken) {
      setCookie('refreshToken', newRefreshToken);
    }

    refreshAttempts = 0;

    return newAccessToken;
  } catch (error) {
    throw error;
  }
}

export async function requestInterceptor(
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> {
  config.headers = config.headers || {};

  const accessToken = getCookie('accessToken');
  if (!accessToken) {
    return config;
  }

  if (config.url?.includes('/auth/refresh')) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  let tokenToUse = accessToken as string;

  try {
    const decoded = decodeJwtPayload(tokenToUse);
    if (!decoded || !decoded.exp) {
      // exp 없거나 디코딩 실패 시 로깅 제거, 기본 토큰 사용
    } else {
      const currentTime = Math.floor(Date.now() / 1000);
      const expiresIn = decoded.exp - currentTime;

      if (expiresIn < REFRESH_THRESHOLD_MINUTES * 60) {
        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = refreshAccessToken()
            .then((newToken) => newToken)
            .finally(() => {
              isRefreshing = false;
            });
        }

        if (refreshPromise) {
          tokenToUse = await refreshPromise;
        }
      }
    }
  } catch (error) {}

  config.headers.Authorization = `Bearer ${tokenToUse}`;
  return config;
}

export function requestInterceptorError(error: AxiosError) {
  return Promise.reject(error);
}

const interceptors = { requestInterceptor, requestInterceptorError };
export default interceptors;
