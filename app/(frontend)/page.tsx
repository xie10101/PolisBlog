import Brief from '@/app/components/Blog/brief';
import { getAllSlugs, getPost } from '@/lib/posts';
import Pagination from '@/app/components/pagination';
import { MetaItem } from '@/app/types/meta';
export default async function Home() {
  const slugs = await getAllSlugs(); // 获取所有文章的 slug  - 可读唯一标识

  const posts = await Promise.all(
    // 对 slugs 进行截取  - 仅显示 10 篇文章
    slugs.slice(0, 10).map(async slug => {
      const res = await getPost(slug);
      const { meta, htmlContent } = res;
      return { slug, meta, htmlContent };
    }),
  );
  const totalPageNum = Math.ceil(slugs.length / 10);
  //  获取首页的所有文章
  return (
    <main className="overflow-y-auto p-8">
      <h1 className="mb-4 text-2xl font-bold">博客列表</h1>
      <hr />
      <main className="prose prose-gray flex max-w-none flex-col items-center justify-center">
        {/*  标签样式被默认样式覆盖  */}
        {posts
          .filter(post => post !== null)
          .map(post => (
            <Brief key={post.slug} slug={post.slug} meta={post.meta} />
          ))}
        <Pagination currentPage={1} totalPages={totalPageNum} />
      </main>
    </main>
  );
}
