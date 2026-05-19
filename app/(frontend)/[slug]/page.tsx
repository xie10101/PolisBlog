import { MetaItem } from '@/app/types/meta';
import Article from '@/app/components/Blog/Article';
import { Suspense } from 'react';
import { fetchPostBySlug } from '@/app/modules/post/post.actions';
import { toast } from 'sonner';

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  let meta: MetaItem = {
    title: '',
    createdAt: '',
    categoryId: '',
    wordCount: 0,
    readCount: 0,
  };

  let htmlContent1 = '';
  const res = await fetchPostBySlug((await params).slug);
  if (res.success && res.data) {
    const { htmlContent } = res.data;
    htmlContent1 = htmlContent || '';
    meta = {
      title: res.data.title,
      createdAt: res.data.createdAt?.toISOString() || '',
      categoryId: res.data.categoryId || '',
      wordCount: res.data.wordCount || 0,
      readCount: res.data.viewCount || 0,
      // readDuration: res.data.readDuration,
      summary: res.data.excerpt || '',
      coverImage: res.data.coverImage || '',
    };
  } else {
    toast.error('获取文章内容失败');
  }

  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Article slug={slug} meta={meta} htmlContent={htmlContent1} />
    </Suspense>
  );
}

