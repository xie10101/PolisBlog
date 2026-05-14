import { db } from '@/lib/db.ts';
import categories from './category.schema';
import posts from '../post/post.schema';
import { eq } from 'drizzle-orm';

export const CategoryRepository = {
  // 查询所有分类
  async findAll() {
    return await db.select().from(categories);
  },

  // 查询所有激活分类
  async findAllActive() {
    return await db
      .select()
      .from(categories)
      .where(eq(categories.status, 'active'));
  },

  // 根据ID查询分类
  async findById(id: string) {
    const [result] = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id));
    return result;
  },

  // 根据slug查询分类
  async findBySlug(slug: string) {
    const [result] = await db
      .select()
      .from(categories)
      .where(eq(categories.slug, slug));
    return result;
  },

  // 创建分类
  async create(category: typeof categories.$inferInsert) {
    const [result] = await db.insert(categories).values(category).returning();
    return result;
  },

  // 更新分类
  async update(id: string, data: Partial<typeof categories.$inferInsert>) {
    const [result] = await db
      .update(categories)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return result;
  },
  // 软删除分类
  async softDelete(id: string) {
    const [result] = await db
      .update(categories)
      .set({ deletedAt: new Date(), status: 'inactive' })
      .where(eq(categories.id, id))
      .returning();
    return result;
  },
  // 硬删除分类
  async hardDelete(id: string) {
    return await db.delete(categories).where(eq(categories.id, id));
  },
  // 查询分类下的所有文章
  async getCategoryPosts(categoryId: string) {
    return await db
      .select()
      .from(posts)
      .where(eq(posts.categoryId, categoryId));
  },
  // 查询分类下的文章数量
  async getCategoryPostCount(categoryId: string) {
    const result = await db
      .select({ count: posts.id })
      .from(posts)
      .where(eq(posts.categoryId, categoryId));
    return result.length;
  },
};
