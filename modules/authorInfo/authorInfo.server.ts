import { db } from '@/lib/db';
import blogInfo from './authorInfo.schema';
import { eq } from 'drizzle-orm';

export const AuthorInfoRepository = {
  async getInfo() {
    // 获取第一条记录（通常只有一条配置）
    const result = await db.select().from(blogInfo).limit(1);
    return result[0] || null;
  },

  async updateInfo(id: number, data: typeof blogInfo.$inferInsert) {
    return await db
      .update(blogInfo)
      .set({ ...data, updateTime: new Date() })
      .where(eq(blogInfo.id, id))
      .returning();
  },

  async createInfo(data: typeof blogInfo.$inferInsert) {
    return await db.insert(blogInfo).values(data).returning();
  },
};
