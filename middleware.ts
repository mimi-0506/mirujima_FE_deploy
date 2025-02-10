import { deleteCookie } from 'cookies-next';
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
    const cookiesToDelete = ['accessToken', 'refreshToken', 'user'];
    cookiesToDelete.forEach((cookie) => deleteCookie(cookie, { path: '/' }));
    //toast.success('로그아웃 되었습니다!', { duration: 2000 });
    return NextResponse.redirect(new URL('/login', req.url));
  }

  //로그인 완성되면 주석 풀기
  //   if (accessToken) {
  //     console.log(req.url, '액세스토큰 있음');
  //     if (pathname === '/login' || pathname === '/signup')
  //       return NextResponse.redirect(new URL('/dashboard', req.url));
  //     else return NextResponse.next();
  //   } else {
  //     console.log(req.url, '액세스토큰 없음');
  //     if (pathname === '/login' || pathname === '/signup') return NextResponse.next();
  //     else return NextResponse.redirect(new URL('/login', req.url));
  //   }
}

export const config = {
  matcher: '/((?!_next|api).*)'
};
