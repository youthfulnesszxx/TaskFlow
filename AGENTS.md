# 待办事项应用 AI 开发代理指令手册

**项目名称：** TaskFlow
**开发环境**

- 操作系统：Windows
- 终端：PowerShell
- 请使用 Windows 兼容的命令
  **核心目标：** 开发一个支持完成率统计、分类、搜索、优先级排序及定时提醒的待办事项网站。

---

## 1. 项目架构概览

- **前端：** React 18 + TypeScript，使用 Vite 构建工具。
- **UI 库：** Ant Design (antd) 用于组件，Framer Motion 用于动画。
- **状态管理：** Zustand (轻量级，适合此规模项目) 或 Context API。
- **后端：** Node.js + Express，RESTful API 风格。
- **数据库：** PostgreSQL。
- **定时任务：** node-cron (后端扫描) + Web Push (浏览器通知)。

## 2. 数据模型定义 (Schema)

Claude，请严格遵守以下数据结构进行前后端代码生成：

### 2.1 任务实体 (Task)

| 字段名       | 类型                        | 描述         | 示例                   |
| :----------- | :-------------------------- | :----------- | :--------------------- |
| id           | string (UUID)               | 任务唯一标识 | "task_123"             |
| title        | string                      | 任务标题     | "完成周报"             |
| completed    | boolean                     | 是否完成     | false                  |
| priority     | "low" \| "medium" \| "high" | 优先级       | "high"                 |
| category     | string                      | 分类标签     | "工作"                 |
| dueDate      | string (ISO Date)           | 截止日期     | "2026-04-15T00:00:00Z" |
| reminderTime | string (ISO Date)           | 提醒时间     | "2026-04-14T09:00:00Z" |

### 2.2 API 接口规范

- `GET /api/tasks`: 获取任务列表（支持查询参数：completed, category, q[关键词]）。
- `POST /api/tasks`: 创建新任务。
- `PUT /api/tasks/:id`: 更新任务（标记完成、修改优先级等）。
- `DELETE /api/tasks/:id`: 删除任务。

## 3. 核心功能实现指令

### 3.1 完成率统计

- **逻辑：** 计算 `completed: true` 的任务数 / 总任务数。
- **输出：** 前端需展示一个进度条或百分比数字。

### 3.2 任务分类与优先级

- **逻辑：** 后端需支持按 `category` 和 `priority` 过滤。
- **前端：** 提供下拉菜单或标签栏进行筛选。

### 3.3 关键词查找

- **实现：** 前端输入框使用防抖（Debounce）技术，通过 API 的 `q` 参数传递给后端。
- **后端：** 使用 SQL `ILIKE` 或 MongoDB 正则匹配 `title` 字段。

### 3.4 定时提醒 (关键逻辑)

- **后端 (Node-Cron)：** 编写一个每分钟执行一次的 Cron Job。
  - SQL 查询：`SELECT * FROM tasks WHERE reminder_sent = false AND reminder_time <= NOW();`
  - 触发逻辑：查询到任务后，调用推送服务。
- **推送：** 使用 `web-push` 库发送通知到前端。

### 3.5 设计与动画

- **主题：** 使用 Ant Design 的 `ConfigProvider` 配合 `theme` 变量实现深色/浅色切换。存储用户偏好到 `localStorage`。
- **动画：** 列表项使用 Framer Motion 的 `motion.li`，添加 `initial`, `animate`, `exit` 状态。

---

## 4. 编码风格指南

1.  **TypeScript：** 所有文件必须使用 `.ts` 或 `.tsx` 后缀。
2.  **Hooks：** 优先使用自定义 Hooks (如 `useTasks`, `useTheme`) 而不是在组件内写逻辑。
3.  **文件结构：**
    - `/frontend/src/components`: 通用 UI 组件
    - `/frontend/src/pages`: 页面组件
    - `/frontend/src/store`: 状态管理
    - `/backend/routes`: API 路由
    - `/backend/controllers`: 业务逻辑

## 5. 开发任务清单 (To-Do for Claude)

请按以下顺序协助我生成代码：

1.  初始化项目结构（Vite + Express 脚手架）。
2.  配置 PostgreSQL 连接池。
3.  实现前端任务列表的展示与增删改查界面。
4.  实现深色/浅色主题切换组件。
5.  实现后端定时任务扫描器 (Cron)。
