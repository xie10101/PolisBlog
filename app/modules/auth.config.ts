import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // 处理的登录页路由路径
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // 重定向未登录用户到登录页
      }
      return true; //除去管理页访问外其余不舍限制
    },
    async jwt({ token, user }) {
      // 创建 jwt - cookie 保存
      if (user) token.id = user.id;
      // token.username = user.name;
      return token;
    },

    async session({ session, token }) {
      //
      if (token.id) session.user.id = token.id as string;
      // if (token.username) session.user.name = token.username as string;
      return session;
    },
  },
  providers: [], // 在这里保持为空，在 auth.ts 中添加具体的提供者
} satisfies NextAuthConfig;
