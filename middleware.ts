import { NextResponse } from 'next/server';

import { apiWithClientToken } from './apis/clientActions';

import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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

  //토큰 유효성 검사까지 추가
  const accessToken = req.cookies.get('accessToken');

  if (accessToken) {
    console.log(req.url, '액세스토큰 있음');

    try {
      apiWithClientToken.get('/user').then((response) => {
        console.log('액세스토큰 유효성검사', response.data);

        if (response.data.status === 200) {
          if (pathname === '/login' || pathname === '/signup')
            return NextResponse.redirect(new URL('/dashboard', req.url));
          else return NextResponse.next();
        } else return NextResponse.redirect(new URL('/login', req.url));
      });
    } catch (e) {
      console.log('액세스토큰 유효성검사', e);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  } else {
    console.log(req.url, '액세스토큰 없음');
    if (pathname === '/login' || pathname === '/signup') return NextResponse.next();
    else return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next|api|.*\\.png$).*)']
};
