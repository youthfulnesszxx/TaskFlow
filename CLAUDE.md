# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**TaskFlow** - A todo application with completion statistics, categorization, search, priority management, and scheduled reminders.

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **UI:** Ant Design (antd) + Framer Motion
- **State Management:** Zustand or Context API
- **Backend:** Node.js + Express (RESTful API)
- **Database:** MySQL
- **Scheduling:** node-cron + Web Push

## Commands

```bash
# Install all dependencies
npm install
npm install --prefix frontend
npm install --prefix backend

# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Frontend only (port 3000)
npm run dev:backend      # Backend only (port 8000)

# Database
npm run db:init --prefix backend   # Initialize MySQL database

# Build
npm run build            # Build both
npm run build:frontend   # Frontend only
npm run build:backend    # Backend only
```

## Architecture

```
TaskFlow/
├── frontend/            # React + TypeScript (Vite)
│   └── src/
│       ├── components/  # TaskList, TaskForm, ThemeToggle
│       ├── pages/       # HomePage
│       ├── store/       # Zustand store (useTaskStore)
│       └── hooks/       # useDarkMode, useDebounce
├── backend/             # Node.js + Express + MySQL
│   └── src/
│       ├── routes/      # API routes (tasks.ts)
│       ├── controllers/ # Business logic (tasks.ts)
│       └── db/          # MySQL connection & init scripts
└── AGENTS.md            # Detailed specifications (authoritative)
```

## Data Model

**Task** entity fields:
- `id` (UUID string), `title` (string), `completed` (boolean)
- `priority` ("low" | "medium" | "high")
- `category` (string), `dueDate` (datetime), `reminderTime` (datetime)
- `reminder_sent` (boolean)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List tasks (query: `completed`, `category`, `q`) |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

## Key Implementation Details

### Database (MySQL)
- Uses `mysql2` package with connection pool
- UUID for task IDs via `UUID()` function
- `IFNULL()` for updates, `LIKE` for search

### Completion Rate
- Formula: `completed_tasks / total_tasks * 100`
- Display as progress bar or percentage

### Search
- Frontend: Debounced input (300ms)
- Backend: SQL `LIKE` on `title` field

### Reminders
- Cron job runs every minute
- Query: tasks where `reminder_sent = false AND reminder_time <= NOW()`
- Send via `web-push` library

### Theme
- Use Ant Design `ConfigProvider` with `theme` variable
- Store preference in `localStorage`

### Animations
- Use Framer Motion `motion.li` with `initial`, `animate`, `exit`

## Reference

For detailed specifications, always refer to `AGENTS.md` - it contains the authoritative requirements for data models, API interfaces, and feature implementations.
