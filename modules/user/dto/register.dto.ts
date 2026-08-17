import z from 'zod';

export const RegisterSchema = z
  .object({
    username: z.string().min(3, '用户名不能为空'),
    password: z.string().min(6, '密码不能为空'),
    email: z.string(),
    confirmPassword: z.string().min(6, '确认密码不能为空'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致',
    path: ['confirmPassword'],
  });

export type registerDto = z.infer<typeof RegisterSchema>;
