import {
  pgTable,
  integer,
  boolean,
  uniqueIndex,
  text,
  timestamp,
  varchar,
  uuid,
  index,
} from 'drizzle-orm/pg-core';
import users from '../user/schema';
const posts = pgTable(
  'posts',
  {
    // 主键
    id: uuid('id').primaryKey().defaultRandom(),
    // 基本信息
    title: varchar('title', { length: 200 }).notNull(),
    slug: varchar('slug', { length: 200 }).notNull(),

    excerpt: varchar('excerpt', { length: 500 }),
    content: text('content').notNull(),
    htmlContent: text('html_content'),

    // 媒体
    coverImage: varchar('cover_image', { length: 500 }),

    // 状态
    status: varchar('status', { length: 20 }).default('draft'),
    // 可设置状态:草稿"、"待审核"、"发布"、"回收站"

    // 统计
    viewCount: integer('view_count').default(0),
    wordCount: integer('word_count').default(0),
    readTime: integer('read_time').default(0),

    // 排序
    isTop: boolean('is_top').default(false),
    sortOrder: integer('sort_order').default(0),

    // 时间
    publishedAt: timestamp('published_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
    deletedAt: timestamp('deleted_at', { withTimezone: true }),

    // 外键
    authorId: uuid('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'restrict' }),
  },
  table => [
    // 唯一索引
    uniqueIndex('idx_posts_slug').on(table.slug),

    // 普通索引
    index('idx_posts_status').on(table.status),
    index('idx_posts_published_at').on(table.publishedAt.desc()),
    index('idx_posts_status_published').on(
      table.status,
      table.publishedAt.desc(),
    ),
    index('idx_posts_author').on(table.authorId),

    // 部分索引（PostgreSQL 特有）：仅对置顶文章建立索引
    //  index('idx_posts_is_top')
    //     .on(table.isTop)
    //     .where(sql`${table.isTop} = true`),
    //     index('idx_posts_search')
    //     .using('gin', sql`to_tsvector('chinese', ${table.title} || ' ' || COALESCE(${table.excerpt}, ''))`),
  ],
);

export default posts;
