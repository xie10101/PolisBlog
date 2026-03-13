import { db } from '@/lib/db.ts';
import users from './schema.ts';

const UserRepository = {
  async getUsers() {
    const data = await db.select().from(users);
    return data;
  },
  // 插入操作 ：
  async insertUser(user: typeof users.$inferInsert) {
    const data = await db.insert(users).values(user);
    return data;
  },
  //xx() {} (对象方法) : 这等同于传统对象的 xx: function() {} 。
};
export default UserRepository;
