import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('accessToken');

  // 정적 파일 및 API 요청 무시
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (pathname === '/') return NextResponse.redirect(new URL('/dashboard', req.url));
  if (pathname === '/logout') {
    const response = NextResponse.redirect(new URL('/login', req.url));
    const cookiesToDelete = ['accessToken', 'refreshToken', 'user'];
    cookiesToDelete.forEach((cookie) => {
      response.cookies.delete(cookie);
    });

    return response;
  }

  if (accessToken) {
    console.log(req.url, '액세스토큰 있음');
    if (pathname === '/login' || pathname === '/signup')
      return NextResponse.redirect(new URL('/dashboard', req.url));
    else return NextResponse.next();
  } else {
    console.log(req.url, '액세스토큰 없음');
    if (pathname === '/login' || pathname === '/signup') return NextResponse.next();
    else return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next|api|.*\\.png$).*)']
};
