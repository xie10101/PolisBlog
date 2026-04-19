'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { zhCN } from 'zod/locales';

z.config(zhCN());
// 组件懒加载和渲染方式的设置
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

// Markdown 预览组件 - 内部会转换为 HTML
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
  loading: () => <div className="p-4 text-gray-500">Loading preview...</div>,
});

//  zod 创建表单验证 ：

const PostFormDataSchema = z.object({
  title: z
    .string()
    .min(1, '标题不能为空')
    .max(100, '标题长度不能超过 100 个字符'),
  slug: z
    .string()
    .min(1, 'Slug 不能为空')
    .max(100, 'Slug 长度不能超过 100 个字符'),
  excerpt: z
    .string()
    .min(15, '摘要不能少于15字')
    .max(200, '摘要长度不能超过 200 个字符'),
  coverImage: z.string().min(1, '封面图不能为空').url('封面图必须是有效的 URL'),
});

type PostFormData = z.infer<typeof PostFormDataSchema>;

export default function PostEditorPage() {
  const [content, setContent] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<PostFormData>({
    defaultValues: {},
    // resolver: zodResolver(),
  });
  // 编辑器主题的设置
  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'light');
  }, []);

  // 处理内容变化 - 同时更新原始 markdown 和 html 内容
  const handleContentChange = (value: string | undefined) => {
    const md = value || '';
    setContent(md);
    // 保存原始 markdown 内容
    // setFormData(prev => ({ ...prev, content: md }));
  };

  // 生成 slug (从标题)
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
      .replace(/^-|-$/g, '');
    // 这段处理是对文章做 URL 友好标识生成
  };
  const previewRef = useRef<HTMLDivElement>(null);
  // 发布文章
  const handlePublish = async data => {
    const postData = {
      ...data,
    };

    setIsDialogOpen(false);
  };

  //  获取内部Html内容
  function extractInnerHtml(html: string): string {
    const match = html.match(/<div[^>]*>([\s\S]*?)<\/div>/);
    return match ? match[1] : html;
  }

  // 当打开对话框时更新 获取到的 Html的内容 ：

  // 保存草稿
  const handleSaveDraft = () => {
    const draftData = {
      ...formData,
      content,
      status: 'draft' as const,
    };
    console.log('保存草稿:', draftData);
    // TODO: 调用 API 保存草稿
  };

  // 表单数据处理

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col gap-4">
      {/* 顶部操作栏 */}
      <div className="flex items-center justify-between">
        <Button variant="outline">
          <Link href="/dashboard/drafts">草稿箱</Link>
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveDraft}>
            保存草稿
          </Button>
          <Button onClick={() => setIsDialogOpen(true)}>发布</Button>
        </div>
      </div>

      {/* Markdown 编辑器 */}
      <div className="flex-1 overflow-hidden">
        <MDEditor
          value={content}
          onChange={handleContentChange}
          height="100%"
          className="h-full"
          preview="edit"
        />
      </div>

      {/* 发布弹窗 */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={e => {
          setIsDialogOpen(false);
        }}
      >
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>发布文章</DialogTitle>
            <DialogDescription>填写文章信息并预览内容后发布</DialogDescription>
          </DialogHeader>
          <form>
            <div className="flex flex-col gap-4 py-4">
              {/* 标题 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">标题</label>
                <Input
                  id="title"
                  placeholder="输入文章标题"
                  {...register('title')}
                />
              </div>

              {/* 摘要 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">摘要</label>
                <Textarea
                  placeholder="输入文章摘要（可选）"
                  {...register('excerpt')}
                  rows={3}
                />
              </div>

              {/* 封面图 */}
              <div className="space-y-2">
                <label className="text-sm font-medium">封面图片 URL</label>
                {/*  此处处理存在问题 - url 可能无效- 最好是1. 可以判断该URL有效或者直接从图库中复制选择传递*/}
                <Input
                  placeholder="输入封面图片地址（可选）"
                  {...register('coverImage')}
                />
              </div>

              {/* 内容预览 -- 该数据的处理1. 因为转换时内容逻辑执行的所以验证可以自定义处理  */}
              <div className="space-y-2">
                <label className="text-sm font-medium">内容预览</label>
                <div className="max-h-[300px] min-h-[200px] overflow-y-auto rounded-md border bg-gray-50 p-4">
                  {content ? (
                    <div ref={previewRef}>
                      <MarkdownPreview
                        source={content}
                        className="bg-transparent"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-400">暂无内容</p>
                  )}
                </div>
              </div>
            </div>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">取消</Button>
            </DialogClose>
            <Button
              onClick={() => {
                handleSubmit(handlePublish)();
              }}
            >
              确认发布
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
