// -- 有关 文章模块的服务器端逻辑 基础的数据库处理方法集合-servers
// 主要是 orm 操作；

import { db } from '@/lib/db.ts';
import posts from './schema.ts';
//  可以封装多个仓库进行处理
import { eq } from 'drizzle-orm';
export const PostRepository = {
  async findAll() {
    return await db.select().from(posts);
  },
  //   创建post ——数据插入操作

  async create(post: typeof posts.$inferInsert) {
    //  $inferInsert 类型介绍 ： 它能自动从你的数据库表定义中推导出 用于插入数据时的 TypeScript 类型
    return await db.insert(posts).values(post);
  },

  // 更新 -- imageUrl操作

  async updateImageUrl(id: string, coverImage: string) {
    return await db.update(posts).set({ coverImage }).where(eq(posts.id, id));
  },
};
