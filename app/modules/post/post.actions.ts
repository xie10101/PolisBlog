'use server';
// controller 层
import { PostRepository } from '@/app/modules/post/post.server';
import { CreatePostSchema } from '@/app/modules/post/dto/post-create.dto';
import { actionHandler } from '@/lib/api-handler';

// 包括 ：删除 ，新增， 更新 ， 查找 （多条件）（根据具体条件- 分页- 多条件）

export async function fetchAllPosts() {
  const res = await actionHandler(() => PostRepository.findAll());
  return res;
}

//分页查找 ：
export async function fetchPostsByPage(page: number, pageSize: number) {
  const res = await actionHandler(() =>
    PostRepository.findByPage(page, pageSize),
  );
  return res;
}

// 根据slug 查找文章
export async function fetchPostBySlug(slug: string) {
  const res = await actionHandler(() => PostRepository.findBySlug(slug));
  return res;
}

//  设置更新操作 - action -- 待完善

export async function updatePost(id: string, coverImage: string) {
  const res = await actionHandler(() =>
    PostRepository.updateImageUrl(id, coverImage),
  );
  return res;
}

export async function createPost(post: unknown) {
  // 先进行验证 - 创建时需要保证 slug - 唯一标识是唯一的
  return actionHandler(async () => {
    const validatedPost = CreatePostSchema.parse(post); // 验证错误会抛出 Error  - 校验后保证数据正确补全

    const existing = await PostRepository.findBySlug(validatedPost.slug);
    if (existing) {
      throw new Error('slug已存在');
    }

    return await PostRepository.create(validatedPost);
  });
}

export async function deletePost(id: string) {
  const res = await actionHandler(() => PostRepository.remove(id));
  return res;
}

// 标题字段模糊查找
export async function searchPostsByTitle(title: string) {
  const res = await actionHandler(() => PostRepository.findByTitle(title));
  return res;
}
