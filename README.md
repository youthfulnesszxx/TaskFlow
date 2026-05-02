# TaskFlow 开发指南

## 快速开始

### 1. 环境要求

- Node.js >= 18.0.0
- MySQL >= 8.0（或 MariaDB >= 10.4）

### 2. 安装步骤

```bash
# 安装根目录依赖
npm install

# 安装前端和后端依赖
npm install --prefix frontend
npm install --prefix backend

# 配置环境变量（编辑 backend/.env 填入数据库密码）
copy backend\.env.example backend\.env

# 初始化数据库（自动创建数据库和表结构）
npm run db:init --prefix backend
```

### 3. 访问地址

- 前端：http://localhost:3000
- 后端 API：http://localhost:8000

### 4. 启动开发服务器

```bash
# 在 TaskFlow 根目录运行
npm run dev
```

这会自动启动：

- 前端 (Vite)：http://localhost:3000
- 后端 (Express + tsx)：http://localhost:8000

> 注意：如果端口 3000 被占用，Vite 会自动使用其他端口（如 3001），请查看终端输出中的实际端口地址。

## 技术栈

### 前端

- React 18 + TypeScript
- Vite (构建工具)
- Ant Design (UI 组件库)
- Framer Motion (动画)
- Zustand (状态管理)
- React Router (路由)

### 后端

- Node.js + Express
- TypeScript
- MySQL
- node-cron (定时任务)
- web-push (浏览器推送)

## 项目结构

```
TaskFlow/
├── frontend/              # 前端应用
│   ├── src/
│   │   ├── components/    # UI 组件
│   │   ├── pages/         # 页面组件
│   │   ├── store/         # Zustand stores
│   │   ├── hooks/         # 自定义 hooks
│   │   └── utils/         # 工具函数
│   ├── package.json
│   └── vite.config.ts
├── backend/               # 后端应用
│   ├── src/
│   │   ├── routes/        # API 路由
│   │   ├── controllers/   # 业务逻辑
│   │   ├── db/            # 数据库配置
│   │   └── utils/         # 工具函数
│   ├── package.json
│   └── tsconfig.json
├── package.json           # Monorepo 根配置
└── README.md
```

## 常用命令

```bash
# 开发模式（前后端同时启动）
npm run dev

# 单独启动前端 (端口 3000 或自动分配)
npm run dev:frontend

# 单独启动后端 (端口 8000)
npm run dev:backend

# 初始化/重置数据库
npm run db:init --prefix backend

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## API 文档

### 任务管理

| 方法   | 端点           | 描述         |
| ------ | -------------- | ------------ |
| GET    | /api/tasks     | 获取任务列表 |
| POST   | /api/tasks     | 创建新任务   |
| PUT    | /api/tasks/:id | 更新任务     |
| DELETE | /api/tasks/:id | 删除任务     |

### 查询参数

- `completed`: 筛选完成状态 (true/false)
- `category`: 按分类筛选
- `q`: 关键词搜索（标题模糊匹配）

## 数据模型

### Task

```typescript
interface Task {
  id: string; // UUID
  title: string; // 任务标题
  completed: boolean; // 是否完成
  priority: "low" | "medium" | "high"; // 优先级
  category: string; // 分类标签
  dueDate: string | null; // 截止日期 (ISO)
  reminderTime: string | null; // 提醒时间 (ISO)
}
```

## 功能清单

- [x] 项目初始化
- [x] 任务 CRUD 界面
- [x] 完成率统计
- [ ] 分类筛选
- [ ] 优先级排序（短作业优先等）
- [x] 关键词搜索
- [x] 深色/浅色主题切换
- [ ] 定时提醒 (Cron + Web Push)
