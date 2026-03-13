import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

// 加载环境变量
config({ path: '.env.local' });

// drizzle的配置文件
export default defineConfig({
  schema: ['./lib/modules/post/schema.ts', './lib/modules/user/schema.ts'],
  // 含义: 指定数据库 schema 定义文件的位置
  out: './lib/db/migrations',
  // 含义: 指定生成的迁移文件的输出目录
  dialect: 'postgresql',
  // 含义: 指定使用的数据库类型，这里是 PostgreSQL
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  //  连接凭证
});
