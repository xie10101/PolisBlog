'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Link from 'next/link';
// 组件懒加载和渲染方式的设置
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function PostEditorPage() {
  const [content, setContent] = React.useState('');
  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', 'light');
  }, []);

  useEffect(() => {
    // 主要用于处理 -- state- 编辑器部分数据
    // 数据库的存储
  }, [content]);
  return (
    <div>
      <Link href="/dashboard/drafts">Drafts</Link>
      <MDEditor
        value={content}
        onChange={e => {
          setContent(e || '');
        }}
        height={700}
        className="w-full"
      />
    </div>
  );
}
