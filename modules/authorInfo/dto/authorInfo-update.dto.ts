import { z } from 'zod';

export const AuthorInfoSchema = z.object({
  siteName: z.string().max(50, '网站名称最多50字符').optional().default(''),
  siteDesc: z.string().max(200, '网站简介最多200字符').optional().default(''),
  authorName: z.string().max(30, '博主姓名最多30字符').optional().default(''),
  authorIntro: z.string().optional(),
  github: z.string().url('无效的Github地址').max(255).optional().or(z.literal('')).default(''),
  gitee: z.string().url('无效的Gitee地址').max(255).optional().or(z.literal('')).default(''),
  wechat: z.string().max(100).optional().default(''),
  qq: z.string().max(20).optional().default(''),
  backgroundImg: z.string().max(255).optional().default(''),
});

export type AuthorInfoDto = z.infer<typeof AuthorInfoSchema>;
