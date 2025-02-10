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
    //클라이언트 라이브러리라 서버에서 작동 불가. 다른 방법 찾아봐야 할듯
    //toast.success('로그아웃 되었습니다!', { duration: 2000 });
    return response;
  }

  // 우리쪽 api로 돌린 후 테스트
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
