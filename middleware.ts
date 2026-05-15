import NextAuth from 'next-auth';
import { authConfig } from './app/modules/auth.config';

export default NextAuth(authConfig).auth;
/**
 *   NextAuth(authConfig) 会根据你提供的 authConfig （只包含基础配置，不含数据库操作）创建一个 NextAuth 实例。
 *  .auth 属性则导出了一个专门为 Next.js Middleware 设计的处理函数。
 * authConfig 剥离了数据库和原生加密模块（如 bcrypt），这行代码可以在 Next.js 的边缘运行时（Edge Runtime）中流畅运行，不会报 crypto 或 fs 的错误。
 *  旧的 middleware 处理中包含 auth 函数关联了数据库操作 等 nodeAPI 原生模块 
 */

// 中间件生效路由
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
