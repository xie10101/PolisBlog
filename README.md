# PolisBlog 个人博客系统

一个基于 Next.js 15+ 开发的现代化全栈个人博客系统，集成了 Markdown 编辑、仪表盘管理和响应式设计。

## 🚀 技术栈

- **框架**: [Next.js 15+](https://nextjs.org/) (App Router)
- **语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **数据库**: [PostgreSQL](https://www.postgresql.org/) & [Drizzle ORM](https://orm.drizzle.team/)
- **状态管理**: [Zustand](https://zustand-demo.pmnd.rs/)
- **编辑器**: [@uiw/react-md-editor](https://github.com/uiwjs/react-md-editor)
- **表单验证**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **搜索**: [Fuse.js](https://www.fusejs.io/)
- **动画**: [Framer Motion](https://www.framer.com/motion/)

## ✨ 核心功能

- **内容管理**:
  - 基于 Markdown 的文章编写与实时预览。
  - 文章元数据管理（标题、Slug、摘要、封面图）。
  - 文章与草稿状态管理。
- **前端展示**:
  - 响应式博客列表及分页功能。
  - 文章详情页渲染（支持 GFM 和代码高亮）。
  - 全局模糊搜索功能。
- **后台管理**:
  - 仪表盘概览。
  - 文章与草稿的列表管理。
- **用户系统**:
  - 基本的用户认证与个人信息管理。

## 📂 目录结构

```text
├── app/                  # Next.js App Router 路由与页面
│   ├── (frontend)/       # 前端展示页面
│   ├── actions/          # Server Actions (业务逻辑)
│   ├── api/              # API 路由
│   ├── components/       # 业务组件
│   ├── dashboard/        # 后台管理页面
│   └── ui/               # UI 基础组件
├── components/           # 通用 UI 组件 (Shadcn UI)
├── content/              # 本地 Markdown 文章内容
├── lib/                  # 工具函数、数据库配置与模型定义
│   ├── modules/          # Drizzle 数据库 Schema
│   └── mock/             # Mock 数据与种子脚本
├── public/               # 静态资源与搜索索引
├── store/                # Zustand 状态管理
└── utils/                # 通用工具类
```

## 🛠️ 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd PolisBlog
```

### 2. 安装依赖
```bash
pnpm install
```

### 3. 环境配置
在根目录创建 `.env.local` 文件并配置数据库连接：
```env
DATABASE_URL=postgres://user:password@localhost:5432/polisblog
```

### 4. 数据库初始化
```bash
pnpm db:push       # 推送 Schema 到数据库
pnpm db:seed:1     # 填充用户测试数据
pnpm db:seed:2     # 填充文章测试数据
```

### 5. 启动开发服务器
```bash
pnpm dev
```

## 脚本说明

- `pnpm dev`: 启动开发服务器。
- `pnpm build`: 构建生产版本。
- `pnpm db:generate`: 生成 Drizzle 迁移文件。
- `pnpm db:push`: 将 Schema 更改直接推送到数据库。
- `pnpm lint`: 运行代码检查。
- `pnpm format`: 格式化代码。

