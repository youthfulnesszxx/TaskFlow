-- TaskFlow Database Schema (MySQL)
-- 使用 MySQL 客户端或初始化脚本执行

-- 创建数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS taskflow CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE taskflow;

-- 创建 tasks 表
CREATE TABLE IF NOT EXISTS tasks (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  category VARCHAR(100) NOT NULL DEFAULT '',
  due_date DATETIME,
  reminder_time DATETIME,
  reminder_sent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_completed (completed),
  INDEX idx_category (category),
  INDEX idx_priority (priority),
  INDEX idx_reminder (reminder_time, reminder_sent),
  INDEX idx_title (title)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
