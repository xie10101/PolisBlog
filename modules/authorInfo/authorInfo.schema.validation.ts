import { z } from 'zod';

export const blogInfoSchema = z.object({
  id: z.number().optional(),
  siteName: z.string().max(50, '网站名称不能超过50个字符'),
  siteDesc: z.string().max(200, '网站描述不能超过200个字符'),
  authorName: z.string().max(30, '作者名称不能超过30个字符'),
  authorIntro: z.string().optional().nullable(),
  github: z.string().url('请输入有效的GitHub URL').optional().or(z.literal('')),
  gitee: z.string().url('请输入有效的Gitee URL').optional().or(z.literal('')),
  wechat: z.string().max(100, '微信号不能超过100个字符').optional().or(z.literal('')),
  qq: z.string().max(20, 'QQ不能超过20个字符').optional().or(z.literal('')),
  backgroundImg: z.string().url('请输入有效的图片URL').optional().or(z.literal('')),
});

export type BlogInfoFormData = z.infer<typeof blogInfoSchema>;
