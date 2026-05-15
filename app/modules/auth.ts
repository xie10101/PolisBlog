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

        const user = await getUserByUserName(username as string);

        if (!user) return null;

        const res = await bcrypt.compare(password as string, user.passwordHash); //返回ture/false

        if (res) return user; // 必须返回一个user对象对照 token存放 

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
