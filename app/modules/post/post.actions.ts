'use server';
// controller 层
import { PostRepository } from '@/app/modules/post/post.server';
import { CreatePostDto } from '@/app/modules/post/dto/post-create.dto';

// 如何做 反馈数据
export async function fetchAllPosts() {
  try {
    const posts = await PostRepository.findAll();
    return { success: true, data: { posts, totalPages: posts.length } };
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

export async function createPost(post: CreatePostDto) {
  try {
    const result = await PostRepository.create(post);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: '创建文章失败' };
  }
}

export async function deletePost(id: string) {
  try {
    const result = await PostRepository.remove(id);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: '删除文章失败' };
  }
}
