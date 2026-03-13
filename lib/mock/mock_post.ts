//  提前设置一些对应于已知 - schema字段 模拟数据 - 便于执行之后操作;
// 当前 schema - post 字段 为 ：
/*
      // 主键
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 200 }).notNull(),
    slug: varchar('slug', { length: 200 }).notNull(),
    excerpt: varchar('excerpt', { length: 500 }),
    content: text('content').notNull(),
    htmlContent: text('html_content'), // 
    //TEXT 类型可以存储 不限长度 的字符串（理论上限是 1GB，但在实际应用中远超需求）
    // 。这非常适合存储解析后的 HTML 代码，因为它可能包含大量的 HTML 标签和内容
    coverImage: varchar('cover_image', { length: 500 }),
    status: varchar('status', { length: 20 }).default('draft'),
    // 可设置状态:草稿"、"待审核"、"发布"、"回收站"
    viewCount: integer('view_count').default(0),
    wordCount: integer('word_count').default(0),
    readTime: integer('read_time').default(0),
    isTop: boolean('is_top').default(false),
    sortOrder: integer('sort_order').default(0),
    publishedAt: timestamp('published_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    authorId: uuid('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
*/
import { PostRepository } from '../modules/post/server.ts';
//   问题 

const MOCK_AUTHOR_ID = '550e8400-e29b-41d4-a716-446655440000';

export const MOCK_POSTS = [
  {
    id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    title: '深入浅出 React Server Components',
    slug: 'deep-dive-into-rsc',
    excerpt: '探索 Next.js 15 中 RSC 的核心原理与性能优势。',
    content: '这里是文章的 Markdown 正文内容...',
    htmlContent: '<div>这里是解析后的 HTML 内容...</div>',
    coverImage: 'https://picsum.photos/seed/post1/800/400',
    status: 'published', // 发布状态
    viewCount: 1250,
    wordCount: 3500,
    readTime: 12,
    isTop: true, // 置顶
    sortOrder: 1,
    publishedAt: new Date('2024-03-10T10:00:00Z'),
    createdAt: new Date('2024-03-01T08:00:00Z'),
    updatedAt: new Date('2024-03-10T10:00:00Z'),
    deletedAt: null,
    authorId: MOCK_AUTHOR_ID,
  },
  {
    id: 'b2c3d4e5-f6a7-4b5c-9d0e-1f2a3b4c5d6e',
    title: 'Drizzle ORM：TypeScript 开发者的数据库利器',
    slug: 'drizzle-orm-guide',
    excerpt: '为什么说 Drizzle 是目前最适合 Next.js 的 ORM？',
    content: 'Drizzle ORM 提供了极佳的类型推导体验...',
    htmlContent: '<p>Drizzle ORM 提供了极佳的类型推导体验...</p>',
    coverImage: 'https://picsum.photos/seed/post2/800/400',
    status: 'draft', // 草稿状态
    viewCount: 0,
    wordCount: 1200,
    readTime: 5,
    isTop: false,
    sortOrder: 0,
    publishedAt: null,
    createdAt: new Date('2024-03-12T15:30:00Z'),
    updatedAt: new Date('2024-03-12T15:30:00Z'),
    deletedAt: null,
    authorId: MOCK_AUTHOR_ID,
  },
  {
    id: 'c3d4e5f6-a7b8-4c5d-0e1f-2a3b4c5d6e7f',
    title: 'Tailwind CSS 最佳实践',
    slug: 'tailwind-css-best-practices',
    excerpt: '如何在大规模项目中保持样式代码的整洁与可维护性。',
    content: '使用 @layer 指令和设计变量来管理你的样式...',
    htmlContent: '<p>使用 @layer 指令和设计变量来管理你的样式...</p>',
    coverImage: null,
    status: 'published',
    viewCount: 890,
    wordCount: 2100,
    readTime: 8,
    isTop: false,
    sortOrder: 2,
    publishedAt: new Date('2024-03-11T09:00:00Z'),
    createdAt: new Date('2024-03-05T12:00:00Z'),
    updatedAt: new Date('2024-03-11T09:00:00Z'),
    deletedAt: null,
    authorId: MOCK_AUTHOR_ID,
  },
];

const { create } = PostRepository;
//  单一对象 insert
MOCK_POSTS.forEach(post => create(post));
