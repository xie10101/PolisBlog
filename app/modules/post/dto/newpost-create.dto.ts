import { z } from 'zod';

// 创建文章的 Zod 验证模式
export const CreateFormtSchema = z.object({
  // 基本信息（必填）
  title: z.string().min(1, '标题不能为空').max(200, '标题最多200字符'),
  // 可选字段
  excerpt: z.string().max(500, '摘要最多500字符').optional(),
  coverImage: z.string().max(500, '封面图片URL最多500字符').optional(),

  //   // 排序
  //   isTop: z.boolean().optional().default(false),
  //   sortOrder: z.number().int().optional().default(0),

  // 分类ID（可选）
  categoryId: z.string().uuid('分类ID必须是有效的UUID').optional(),
});

// 导出类型定义
export type CreateFormDto = z.infer<typeof CreateFormtSchema>; // 提取类型定义
