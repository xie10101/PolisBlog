import { z } from 'zod';

export const CreateCategorySchema = z.object({
  name: z.string().min(1, '分类名称不能为空').max(100, '名称最多100字符'),
  slug: z
    .string()
    .min(1, 'slug不能为空')
    .max(100, 'slug最多100字符')
    .regex(/^[a-z0-9-]+$/, 'slug只能包含小写字母、数字和连字符'),
  description: z.string().max(500, '描述最多500字符').optional(),

  status: z.enum(['active', 'inactive']).default('active'),

  sortOrder: z.number().int().default(0).optional(),
});

export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
