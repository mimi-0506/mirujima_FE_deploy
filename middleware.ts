import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
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
    return response;
  }

  // 로그인에서 쿠키 싹 밀기
  if (pathname === '/login') {
    const cookieStore = await cookies();
    cookieStore.getAll().forEach(({ name }) => {
      cookieStore.set(name, '', { expires: new Date(0) });
    });
    return NextResponse.next();
  }

  // /는 토큰이 있어도, 없어도 접근 가능
  const NO_TOKEN_AREA = ['/login', '/signup', '/auth/callback'];

  // 토큰 검사
  const accessToken = req.cookies.get('accessToken');

  if (accessToken) {
    // 토큰있음
    if (NO_TOKEN_AREA.includes(pathname))
      return NextResponse.redirect(new URL('/dashboard', req.url));
  } else {
    // 토큰없음
    if (!NO_TOKEN_AREA.includes(pathname) && pathname !== '/')
      return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next|api|manifest\\.webmanifest|.*\\.png$|sw\\.js$).*)']
};
