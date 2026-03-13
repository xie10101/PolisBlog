// -- 有关 文章 模块的 服务器端 逻辑
// 主要是 orm 操作；

import { db } from '@/lib/db.ts';
import posts from './schema.ts';
//  可以封装多个仓库进行处理

export const PostRepository = {
  async findAll() {
    return await db.select().from(posts);
  },
  //   创建post ——数据插入操作

  async create(post: typeof posts.$inferInsert) {
    //  $inferInsert 类型介绍 ： typeof posts.$inferInsert 是一种非常强大且优雅的类型推导方式。
    // 它能自动从你的数据库表定义中推导出 用于插入数据时的 TypeScript 类型
    return await db.insert(posts).values(post);
  },
};
