enum Category {
  frontend = '前端',
  backend = '后端',
  mobile = '移动端',
  other = '其他'
}

// 标签（允许自定义字符串标签）
type Tag = string;

// 内容条目（核心对象结构）
 export interface MetaItem {
  /** 标题 */
  title: string;
  /** 创建时间 格式化的日期字符串，例如：2025-10-13） */
  createdAt: string;
  /** 分类 */
  category?: Category;
  /** 字数（正整数） */
  wordCount: number;
  /** 阅读次数（非负整数） */
  readCount: number;
  /** 阅读时长（秒，非负整数） */
  readDuration: number; // 单位：秒
  /** 标签（可多个） */
  tags?: Tag[];
  /** 内容摘要（可选） */
  summary?: string;
}
