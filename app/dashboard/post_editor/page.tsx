'use client';
import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';

//具体作用 ？
// const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });
export default function PostEditorPage() {
  const [value, setValue] = React.useState('');
  document.documentElement.setAttribute('data-color-mode', 'light');
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
