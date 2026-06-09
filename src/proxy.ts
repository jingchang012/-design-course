import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 這些路由需要登入才能訪問
const protectedRoutes = ['/dashboard', '/player'];

export default function proxy(request: NextRequest) {
  // 檢查是否有登入的 Cookie
  const isLoggedIn = request.cookies.get('auth_token')?.value === 'true';
  const { pathname } = request.nextUrl;

  // 檢查目前路徑是否在保護名單中
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  // 如果未登入且試圖訪問保護頁面，強制導向登入頁
  if (!isLoggedIn && isProtected) {
    const loginUrl = new URL('/login', request.url);
    // 將原本想去的網址記錄下來，登入後可以跳回來
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // 指定哪些路徑要經過 middleware 檢查
  matcher: ['/dashboard/:path*', '/player/:path*'],
};
