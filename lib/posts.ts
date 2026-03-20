//  主要的md文件 处理逻辑：
//  1. 遍历文件夹，获M所有md文件
import { MetaItem } from '@/app/types/meta';
import { readdir } from 'fs/promises';
import { promises as fs } from 'fs'; //  fs.promises 为fs模块的Promise版本
//  2. 解析md文件，获取标题、日期、标签等信息
import path from 'path'; //  获取文件夹下所有md文件名
import matter from 'gray-matter';
//  这块导入的不通过会导致报错 的原因？  ：  因为remark-gfm 依赖于 remark-parse ，而 remark-parse 是 remark 的一个插件，而 remark 是 unified 的一个插件，而 unified 是一个插件系统，而插件系统的插件必须是一个函数，而 remark-gfm 是一个对象，所以会报错。

import { unified } from 'unified';
import remarkParse from 'remark-parse'; // 1️⃣ 解析 Markdown 文本为 mdast
import remarkGfm from 'remark-gfm'; // 3️⃣ 表格/任务列表/删除线
import remarkRehype from 'remark-rehype'; // 4️⃣ mdast → hast
import rehypeHighlight from 'rehype-highlight'; // 5️⃣ 代码高亮
import rehypeExternalLinks from 'rehype-external-links'; // 6️⃣ 外链新窗口
import rehypeStringify from 'rehype-stringify'; // 7️⃣ hast → HTML
// 获取磁盘的绝对路径：
export const contentDir = path.resolve(process.cwd(), './content');

// module.export
// 暴露 所有的文档- 名称 - 用于生成路由 静态 html
export async function getAllSlugs(): Promise<string[]> {
  const fileArray = await readdir(contentDir); //  获取文件夹下所有md文件名
  return fileArray.map(file => file.replace(/\.md$/, '')); //  获取文件名，去掉后缀
}

// 文章获取应该按照日期顺序 ；

//  获取单篇文章的数据 ； + 添加 防范性处理 +更新文本处理方案
export async function getPost(
  slug: string,
): Promise<
  { meta: MetaItem; htmlContent: string } | { meta: null; htmlContent: '' }
> {
  if (!slug) {
    throw new Error('Slug is required');
  }
  const filePath = path.join(contentDir, `${slug}.md`);
  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const processor = unified()
      .use(remarkParse)
      .use(remarkGfm) // 支持 GitHub 风格语法
      .use(remarkRehype) // 进入 HTML 生态
      .use(rehypeHighlight) // 代码块高亮（含行号）
      .use(rehypeExternalLinks, { target: '_blank', rel: ['nofollow'] })
      .use(rehypeStringify); // 生成最终 HTML
    const htmlContent = processor.processSync(content).toString();
    return { meta: data as MetaItem, htmlContent };
  } catch (error: any) {
    //  出现了错误但没有throw处理- 在开发阶段和生产阶段都需要处理 （可能处理方式不同 ）
    if (error.code === 'ENOENT') {
      throw new Error(`文件未找到: ${filePath}`);
    } else {
      throw new Error(`处理错误`);
    }
  }
  //  主要的错误处理 ： 联合类型 +  默认空值  防止渲染报错 - 类型检查书写复杂
}

/**
 * 对于本地文件的一系列处理 需要 注意 - 异步同步问题 ， 如果放置于服务端运行的程序大多是异步的 ，同步往往是在build执行一次的部分
 *   readFileSync
 *   processSync
 */

/**
 ​​remark()​​ 创建一个 Markdown 处理器实例。
 remark-html  把 mdast 转换成 hast (Hypertext AST)
​​.process(content)​​ 执行处理流程，输入为 Markdown 源码，返回一个包含 HTML 的 ​​VFile​​（unified 的虚拟文件对象）。
​​.toString()​​ 将 VFile 的内容取出为 ​​UTF-8 字符串​​，便于在页面或接口中直接使用。该字符串即为可直接渲染的 ​​HTML 字符串。
 */

//分页博客列表处理逻辑
const PAGE_SIZE = 10;

// 获取当页的博客列表
export async function getPaginatedPosts(page = 1, size = PAGE_SIZE) {
  const all = await getAllSlugs(); // 按日期排好序
  const totalPages = Math.ceil(all.length / size);
  const start = (page - 1) * size;
  const postNames = all.slice(start, start + size); // 仅返回 - 文章名列表
  return { postNames, totalPages };
}

//  获取所有的文章数量
export async function getTotalNum() {
  const all = await getAllSlugs();
  return all.length;
}
