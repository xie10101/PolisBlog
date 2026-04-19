//  以上获取分页后的博客列表数

import { getPaginatedPosts } from '@/lib/posts';
import { getTotalNum } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { getPost } from '@/lib/posts';
import Brief from '@/app/components/Blog/brief';
import Pagination from '@/app/components/pagination';
export async function generateStaticParams() {
  const total = await getTotalNum();
  const PAGE_SIZE = 10;
  const pages = Math.ceil(total / PAGE_SIZE);
  return Array.from({ length: Math.min(pages, 5) }, (_, i) => ({
    slug: String(i + 1),
  }));
  // i代表索引 - 从1开始的字符串页码 1 2 3 4 5
  //？？？此处存在bug问题 - 当页面数大于5时，无法获取到正确的博客展示
}

async function getPageData(page: number) {
  const { postNames, totalPages } = await getPaginatedPosts(page, 10);
  if (page > totalPages) return null; // 非法页码
  return { postNames, totalPages, currentPage: page };
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const currentPage = Number(params.slug);
  // 检查页码是否有效
  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }
  const data = await getPageData(currentPage); // 传递当前 列表页数 获取博客列表数据
  if (!data) notFound(); // 返回 404 页面
  const { postNames, totalPages } = data; // 是否可以将 totalPages 提取到仓库中使用
  const posts = await Promise.all(
    postNames.map(async item => {
      const post = await getPost(item);
      return { ...post, slug: item.replace('.md', '') };
    }),
  ); // 获取博客列表数据
  //
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <ul>
          {posts.map(post => (
            <li key={post.slug}>
              <main className="prose prose-gray max-w-none">
                {/*  标签样式被默认样式覆盖  */}
                {post.meta == null ? (
                  <div>暂无数据</div>
                ) : (
                  <Brief key={post.slug} slug={post.slug} meta={post.meta} />
                )}
              </main>
            </li>
          ))}
        </ul>
        {/*  可以尝试将以下组件分装为分页器组件  */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
        ></Pagination>
      </div>
    </>
  );
}

// 启用 ISR 缓存再生机制（blocking + 缓存）
export const revalidate = 60; // 每60秒可自动再生
