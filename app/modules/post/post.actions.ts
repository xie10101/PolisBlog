'use server';
// controller 层
import { PostRepository } from '@/app/modules/post/post.server';
import { CreatePostDto } from '@/app/modules/post/dto/post-create.dto';
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

// 上传post:

export async function uploadPost(post: {
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  slug: string;
  publishedAt: Date;
  authorId: string;
}) {
  try {
    // // 补充必填字段
    // const postData = {
    //   ...post,
    //   slug: post.title
    //     .toLowerCase()
    //     .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    //     .replace(/^-|-$/g, ''),
    //   htmlContent: post.content,
    //   authorId: '00000000-0000-0000-0000-000000000000', // TODO: 从 session 获取真实用户ID
    //   status: 'published',
    //   publishedAt: new Date(),
    // };
    console.log('上传文章:', post);
    const result = await PostRepository.create(post);
    console.log(result);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: '发布失败' };
  }
}

// 创建post :

export async function createPost(post: CreatePostDto) {
  try {
    const result = await PostRepository.create(post);
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: '创建文章失败' };
  }
}
