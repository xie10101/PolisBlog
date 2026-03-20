// app/blog/[slug]/page.tsx
import { contentDir } from '@/lib/posts';
import { MetaItem } from '@/app/types/meta';
import Article from '@/app/components/Blog/Article';
import { getPost } from '@/lib/posts';
import { readdir } from 'fs/promises';
import { Suspense } from 'react';
// ① 构建时扫描 content 目录
export async function generateStaticParams() {
  // 可以直接复用 getPath 函数
  const files = await readdir(contentDir);
  return files.map(f => ({ slug: f.replace('.md', '') }));
}

//  具体的执行时机 渲染出的结果如何与html文件进行对应 ？
// ② 渲染函数
export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { meta, htmlContent } = await getPost(slug);
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Article slug={slug} meta={meta} htmlContent={htmlContent} />
    </Suspense>
  );
}

/*
类型安全检查：
let meta: MetaItem | undefined;
let htmlContent: string | undefined;
  const post = await getPost(slug);
  if('htmlContent' in post) {
      ({ meta, htmlContent } = post)
  }
此种方法 存在 变量 值为 undefind 进行渲染的情况 
*/
