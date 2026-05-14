import { z } from 'zod';

// 创建文章的 Zod 验证模式
export const CreatePostSchema = z.object({
  // 基本信息（必填）
  title: z.string().min(1, '标题不能为空').max(200, '标题最多200字符'),
  slug: z.string().min(1, 'slug不能为空').max(200, 'slug最多200字符'),
  content: z.string().min(1, '内容不能为空'),

  // 可选字段
  excerpt: z.string().max(500, '摘要最多500字符').optional(),
  htmlContent: z.string().optional(),
  coverImage: z.string().max(500, '封面图片URL最多500字符').optional(),

  // 状态（默认草稿） // 与 schema 一致
  status: z.enum(['draft', 'pending', 'published', 'trash']).default('draft'),

  // 统计字段（可选，通常由系统计算）
  wordCount: z.number().int().min(0).optional(),
  readTime: z.number().int().min(0).optional(),

  // 排序
  isTop: z.boolean().default(false),
  sortOrder: z.number().int().default(0),

  // 发布时间（可选，发布时设置）
  publishedAt: z.string().datetime().optional(),

  // 作者ID（必填）
  authorId: z.string().uuid('作者ID必须是有效的UUID'),

  // 分类ID（可选）
  categoryId: z.string().uuid('分类ID必须是有效的UUID').optional(),
});

// 导出类型定义
export type CreatePostDto = z.infer<typeof CreatePostSchema>; // 提取类型定义
