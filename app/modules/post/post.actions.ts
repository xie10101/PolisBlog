'use server';
// controller 层
import { PostRepository } from '@/app/modules/post/post.server';
import { CreatePostDto } from '@/app/modules/post/dto/post-create.dto';
import { actionHandler } from '@/lib/api-handler';
// 包括 ：删除 ，新增， 更新 ， 查找 （多条件）（根据具体条件- 分页- 多条件）

export async function fetchAllPosts() {
  const res = await actionHandler(() => PostRepository.findAll());
  return res;
}
//  设置更新操作 - action

export async function updatePost(id: string, coverImage: string) {
  const res = await actionHandler(() =>
    PostRepository.updateImageUrl(id, coverImage),
  );
  return res;
}

export async function createPost(post: CreatePostDto) {
  const res = await actionHandler(() => PostRepository.create(post));
  return res;
}

export async function deletePost(id: string) {
  const res = await actionHandler(() => PostRepository.remove(id));
  return res;
}
