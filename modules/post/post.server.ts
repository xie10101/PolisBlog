// -- 有关 文章模块的服务器端逻辑 基础的数据库处理方法集合-servers
// 主要是 orm 操作；
import { db } from '@/lib/db.ts';
import posts from './post.schema.ts';
import { eq, sql } from 'drizzle-orm';
export const PostRepository = {
  // 查找所有
  async findAll() {
    return await db.select().from(posts);
  },
  // 按照标题字段 - 模糊查找
  async findByTitle(title: string) {
    return await db
      .select()
      .from(posts)
      .where(sql`${posts.title} ILIKE ${'%' + title + '%'}`);
  },

  // 分页查找 ：
  async findByPage(page: number, pageSize: number) {
    const offset = (page - 1) * pageSize;

    // Count 查询
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(posts);

    const total = Number(count ?? 0);
    const data = await db.select().from(posts).limit(pageSize).offset(offset);

    return {
      data,
      total,
      pageCount: Math.ceil(total / pageSize),
      currentPage: page,
      pageSize,
    };
  },

  //   创建post ——数据插入操作
  async create(post: typeof posts.$inferInsert) {
    //  $inferInsert 类型介绍 ： 它能自动从你的数据库表定义中推导出 用于插入数据时的 TypeScript 类型

    //  对创建操作进行parse 校验否则会导致确实字段
    try {
      let i = 0;
      while (i++ < 10) {
        {
          post.slug = `${post.slug}-${Math.random().toString(36).substring(2, 8) + i}`;
          await db.insert(posts).values(post).returning();
        }
      }
    } catch (error) {
      console.error('创建文章失败:', error);
      throw error;
    }
  },
  // 根据slug 查找文章

  async findBySlug(slug: string) {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.slug, slug))
      .limit(1)
      .then(res => res[0] || null);
  },

  // 更新 -- imageUrl操作
  async updateImageUrl(id: string, coverImage: string) {
    return await db
      .update(posts)
      .set({ coverImage })
      .where(eq(posts.id, id))
      .returning();
  },
  //删除操作
  async remove(id: string) {
    await db.delete(posts).where(eq(posts.id, id)).returning();
    return { success: true, deletedCount: 1 };
  },
};
