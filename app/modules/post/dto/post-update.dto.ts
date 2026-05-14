import { z } from 'zod';
import { CreatePostSchema } from './post-create.dto';

export const UpdatePostSchema = CreatePostSchema.partial().extend({
  id: z.string().uuid('文章ID必须是有效的UUID'),
});

export type UpdatePostDto = z.infer<typeof UpdatePostSchema>;
