import { z } from 'zod';
import { CreateCategorySchema } from './category-create.dto';

export const UpdateCategorySchema = CreateCategorySchema.partial().extend({
  id: z.string().uuid('分类ID必须是有效的UUID'),
});

export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
