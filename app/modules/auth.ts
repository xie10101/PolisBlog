import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { getUserByUserName } from './user/user.actions';
import bcrypt from 'bcrypt';
export const { handlers, auth, signIn, signOut } = NextAuth({
  // 密钥从环境变量读
  secret: process.env.AUTH_SECRET,

  // 登录方式：账号密码登录
  providers: [
    Credentials({
      // 接收到的参数
      credentials: {
        username: { label: '账号', type: 'text' },
        password: { label: '密码', type: 'password' },
      },
      // 你的登录校验逻辑
      async authorize(credentials) {
        // 1. 拿前端传的账号密码
        const { username, password } = credentials;
        // username 验证当前用户是否存在
        const user = await getUserByUserName(username as string);

        // return new Error('用户名或密码错误');
        if (!user) return null;

        // 验证密码结合 brcytpjs
        const res = await bcrypt.compare(password as string, user.passwordHash);
        // 返回数据可以是消除了敏感数据的部分

        if (res) return user;
        //  return null 会生成一个标准错误 ： error: "CredentialsSignin"

        return null;
      },
    }),
  ],

  // 固定：用JWT存会话
  session: { strategy: 'jwt' },

  // 扩展：把 id 塞进会话里（必写，不然拿不到用户ID）
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token.id) session.user.id = token.id as string;
      return session;
    },
  },
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
