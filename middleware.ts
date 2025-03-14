import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 정적 파일 및 API 요청 무시
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // 로그아웃
  if (pathname === '/logout') {
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('accessToken', '', { expires: new Date(0) });
    response.cookies.set('refreshToken', '', { expires: new Date(0) });
    response.cookies.set('user', '', { expires: new Date(0) });
    return response;
  }

  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/' ||
    pathname === '/auth/callback'
  ) {
    return NextResponse.next();
  }

  // 토큰 검사
  const accessToken = req.cookies.get('accessToken');
  if (!accessToken) {
    // console.log(req.url, '❌ 액세스토큰 없음');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // console.log(req.url, '✅ 액세스토큰 있음');

  try {
    // axios보다 fetch가 next/server에서 더 안정적
    // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
    //   method: 'GET',
    //   headers: { Authorization: `Bearer ${accessToken}` }
    // });

    // console.log(response.status);

    // if (!response.ok) {
    //   console.log('토큰 유효하지 않음');
    //   return NextResponse.redirect(new URL('/login', req.url));
    // }

    // 로그인 상태에서 로그인 페이지 접근 시 대시보드로 리디렉트
    if (pathname === '/login' || pathname === '/signup' || pathname === '/auth/callback')
      return NextResponse.redirect(new URL('/dashboard', req.url));

    return NextResponse.next();
  } catch (error) {
    console.log('❌ 서버 통신 오류:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next|api|manifest\\.webmanifest|.*\\.png$).*)']
};
