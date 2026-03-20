//  主要负责生成 md文件的搜索索引

import path from 'path';
import matter from 'gray-matter';
import { readdir, readFile, writeFile } from 'fs/promises'; // 使用封装异步读取文件夹内容的函数
const postsDir = path.join(process.cwd(), './content');
console.log(postsDir);

async function generateSearchIndex() {
  console.log(postsDir);
  const files = await readdir(postsDir);
  const index = files.map(async file => {
    const content = await readFile(path.join(postsDir, file), 'utf-8');
    const { data, content: body } = matter(content); // 高级语言默认使用utf-8编码字符串
    return {
      slug: file.replace('.md', ''),
      title: data.title,
      // 以下是摘要-总结
      summary: data.summary || body.slice(0, 0), //处理
      tags: data.tags || [],
    };
  });

  //  同样需要重复 使用 await 方法进行返回值的调用
  const indexData = await Promise.all(index); // 生成索引数据
  //  创建 文件方法
  await writeFile(
    path.join(process.cwd(), './public/SearchIndex/search-index.json'),
    JSON.stringify(indexData),
  );
}

export default generateSearchIndex;
