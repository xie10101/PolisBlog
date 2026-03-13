import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { schema } from './modules';
import { config } from 'dotenv';
// 加载环境变量
config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
// 主要的 orm 操作 都在 这个 db 实例 上进行；
