// 用于处理映射关系 界面数据展示和数据库存储之间的转换
// 为啥 ， 可以省略吗 ？
/**
 *   1. 创建映射关系 
 *   id: string;
    title: string;
    imageUrl: string;
    // 分类和标签部分暂时不设置 ？ 
    category: string;
    tags: string[];
    status: 'Published' | 'Draft' | 'Scheduled';
    publishTime: string;
    views: number;
------------------------------------------
      // 主键
      id: uuid('id').primaryKey().defaultRandom(),
      title: varchar('title', { length: 200 }).notNull(),
      coverImage: varchar('cover_image', { length: 500 }),
      status: varchar('status', { length: 20 }).default('draft'),
      viewCount: integer('view_count').default(0),
      publishedAt: timestamp('published_at', { withTimezone: true }),
 */
//
import posts from '@/lib/modules/post/schema';

// 1. 定义前端 UI 使用的类型
export interface ArticleUI {
  id: string;
  title: string;
  imageUrl: string;
  category: string; // 目前数据库暂无此字段，设为默认值
  tags: string[]; // 目前数据库暂无此字段，设为默认值
  status: 'Published' | 'Draft' | 'Scheduled';
  publishTime: string;
  views: number;
}

// 2. 获取数据库原始类型 (Drizzle 自动推导)
type PostDB = typeof posts.$inferSelect;

/**
 * 将数据库对象转换为前端 UI 对象
 */
export function mapPostDBToUI(dbPost: PostDB): ArticleUI {
  return {
    id: dbPost.id,
    title: dbPost.title,
    imageUrl: dbPost.coverImage || '/file.svg', // 处理空值并设置默认图
    category: '未分类', // 占位符，待数据库扩展
    tags: [], // 占位符，待数据库扩展
    // 将数据库状态映射为 UI 枚举
    status: mapStatusToUI(dbPost.status),
    // 格式化时间：将 Date 对象转为展示字符串
    publishTime: dbPost.publishedAt
      ? new Intl.DateTimeFormat('zh-CN', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date(dbPost.publishedAt))
      : '未发布',
    views: dbPost.viewCount || 0,
  };
}

/**
 * 状态映射辅助函数
 */
function mapStatusToUI(status: string | null): ArticleUI['status'] {
  switch (status) {
    case 'published':
      return 'Published';
    case 'scheduled':
      return 'Scheduled';
    default:
      return 'Draft';
  }
}

/**
 * 如果需要，也可以构建反向映射 (UI -> DB) 用于保存数据
 */
export function mapPostUIToDB(
  uiPost: Partial<ArticleUI>,
): Partial<typeof posts.$inferInsert> {
  return {
    title: uiPost.title,
    coverImage: uiPost.imageUrl,
    status: uiPost.status?.toLowerCase(),
    // ... 其他字段映射
  };
}
