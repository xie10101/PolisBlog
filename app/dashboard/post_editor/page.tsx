'use client';
import React from 'react';
import dynamic from 'next/dynamic';
// 组件懒加载和渲染方式的设置 
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export default function PostEditorPage() {
  const [value, setValue] = React.useState('');
  // -- 主题的改变 ?
  // document.documentElement.setAttribute('data-color-mode', 'light');
  return (
    <div>
      <MDEditor
        value={value}
        onChange={e => {
          setValue(e || '');
        }}
        height={700}
        className="w-full"
      />
      {/* <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} /> */}
    </div>
  );
}
