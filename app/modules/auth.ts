import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByUserName } from './user/user.actions';
import bcrypt from 'bcryptjs';
import { authConfig } from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('检查是否执行');
        const { username, password } = credentials;

        const res = await getUserByUserName(username as string); // 返回值变了

        if (!res.success || !res.data) return null; // 存在报错

        const user = res.data;
        const passwordMatches = await bcrypt.compare(
          password as string,
          user.passwordHash,
        );

        if (passwordMatches) return user;

        return null;
      },
    }),
  ],
});

/**
 * signIn 和 authorize 的关系 ？
 *   2. 前端调用 signIn()
   ↓
3. 发送请求到 Next.js 后端
   ↓
4. 自动进入你的 authorize() 函数
   ↓
5. authorize 校验成功 → return 用户
   ↓
6. Auth.js 自动创建会话、写Cookie
 */
