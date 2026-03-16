'use server';
import { PostRepository } from '@/lib/modules/post/server';
export async function fetchAllPosts() {
  try {
    const posts = await PostRepository.findAll();
    return { success: true, data: posts };
  } catch (error) {
    return { success: false, error: '获取文章失败' };
  }
}
//  设置更新操作 - action

export async function updatePost(id: string, coverImage: string) {
  try {
    const result = await PostRepository.updateImageUrl(id, coverImage);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: '更新文章失败' };
  }
}
