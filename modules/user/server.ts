import { db } from '@/lib/db.ts';
import users from './user.schema.ts';
import { eq } from 'drizzle-orm';
const UserRepository = {
  async getUsers() {
    const data = await db.select().from(users);
    return data;
  },
  // 获取对应用户名的用户信息
  async getUserByName(username: string) {
    const data = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return data[0];
  },

  // 获取对应邮箱的用户信息
  async getUserByEmail(email: string) {
    const data = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    return data[0];
  },
  // 获取第一个用户信息 ：
  async getFirstUser() {
    const data = await db.select().from(users).limit(1);
    return data;
  },
  // 插入操作 ：
  async insertUser(user: typeof users.$inferInsert) {
    const data = await db.insert(users).values(user);
    return data;
  },
  //xx() {} (对象方法) : 这等同于传统对象的 xx: function() {} 。
  // 根据id 获取用户信息
  async getUserById(id: string) {
    const data = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return data[0];
  },
};
export default UserRepository;
