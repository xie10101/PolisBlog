// middleware.ts
import { auth } from './auth';
import { NextResponse } from 'next/server';

export default auth(req => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === '/login';

  // 需要登录的页面
  const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard');

  // 未登录 + 访问需要权限页面 → 跳登录
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 已登录访问主页 → 跳主页
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url)); // 登录后自动处理 ？？
  }

  return NextResponse.next();
});

// 中间件生效路由
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/:path*'],
};


/**
 *  Next 是如何处理中间件的? 
 
 *       Next.js 自动扫描根目录的 middleware.ts
         matcher 只是配置哪些路由需要经过它 **
 */