const isLocal = process.env.NODE_ENV === 'development';
const DOMAIN = isLocal ? '/' : process.env.NEXT_PUBLIC_DOMAIN;

export const COOKIEOPTIONS_ACCESS = {
  maxAge: 60 * 60 * 24, // 24시간
  path: DOMAIN,
  sameSite: 'strict' as const
};

export const COOKIEOPTIONS_REFRESH = {
  maxAge: 60 * 60 * 24 * 7, // 일주일
  path: DOMAIN,
  sameSite: 'strict' as const
};
