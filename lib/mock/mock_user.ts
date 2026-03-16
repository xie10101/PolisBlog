// //  提前设置一些对应于已知 - schema字段 模拟数据 - 便于执行之后操作;
/*
       {
         // 主键
         id: uuid('id').primaryKey().defaultRandom(),
     
         // 基本信息
         username: varchar('username', { length: 50 }).notNull().unique(),
         passwordHash: varchar('password_hash', { length: 255 }).notNull(),
         email: varchar('email', { length: 100 }),
         avatar: varchar('avatar', { length: 500 }),
         bio: text('bio'),
     
         // 角色与状态
         role: varchar('role', { length: 20 }).default('admin'),
         status: varchar('status', { length: 20 }).default('active'),
     
         // 时间戳
         lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
         createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
         updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
       },
*/
import UserRepository from '@/lib/modules/user/server.ts';  
// 模拟用户数据 
const MOCK_USERS = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    username: 'admin_user',
    passwordHash: '$2b$12$LQ7.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X', // 模拟 bcrypt 哈希值
    email: 'admin@polisblog.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    bio: 'PolisBlog 系统管理员，热爱技术分享。',
    role: 'admin',
    status: 'active',
    lastLoginAt: new Date('2024-03-15T08:30:00Z'),
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-03-15T08:30:00Z'),
  },
  {
    id: 'a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d',
    username: 'editor_jason',
    passwordHash: '$2b$12$K8.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y.Y',
    email: 'jason@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jason',
    bio: '资深技术编辑，专注于前端开发领域。',
    role: 'editor',
    status: 'active',
    lastLoginAt: new Date('2024-03-14T15:45:00Z'),
    createdAt: new Date('2024-02-15T10:00:00Z'),
    updatedAt: new Date('2024-03-14T15:45:00Z'),
  },
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d4e5',
    username: 'test_user',
    passwordHash: '$2b$12$M9.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z.Z',
    email: 'test@example.com',
    avatar: null,
    bio: '这是一位测试用户。',
    role: 'user',
    status: 'inactive', // 禁用状态示例
    lastLoginAt: null,
    createdAt: new Date('2024-03-10T12:00:00Z'),
    updatedAt: new Date('2024-03-10T12:00:00Z'),
  },
];

MOCK_USERS.forEach(user => UserRepository.insertUser(user));
//  执行下 - 图片更新操作 ：
