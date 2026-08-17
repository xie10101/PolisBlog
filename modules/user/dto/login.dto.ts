import z from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(3, '用户名不能为空'),
  password: z.string().min(6, '密码不能为空'),
});

export type LoginDto = z.infer<typeof LoginSchema>;
