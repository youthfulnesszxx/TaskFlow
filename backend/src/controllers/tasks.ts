import { Request, Response } from 'express';
import { pool } from '../db/postgres.js';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string | null;
  reminderTime: string | null;
  reminder_sent: boolean;
}

// GET /api/tasks - Get all tasks with optional filtering
export const getTasks = async (req: Request, res: Response) => {
  try {
    const { completed, category, q } = req.query;

    let query = 'SELECT * FROM tasks WHERE 1=1';
    const params: (string | boolean)[] = [];

    if (completed !== undefined) {
      query += ` AND completed = ?`;
      params.push(completed === 'true');
    }

    if (category) {
      query += ` AND category = ?`;
      params.push(category as string);
    }

    if (q) {
      query += ` AND title LIKE ?`;
      params.push(`%${q}%`);
    }

    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// POST /api/tasks - Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, priority, category, dueDate, reminderTime } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    // Convert ISO date strings to MySQL datetime format
    const formatDateForMySQL = (dateStr: string | null | undefined) => {
      if (!dateStr) return null;
      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null;
        return date.toISOString().slice(0, 19).replace('T', ' ');
      } catch {
        return null;
      }
    };

    const query = `
      INSERT INTO tasks (id, title, completed, priority, category, due_date, reminder_time, reminder_sent)
      VALUES (UUID(), ?, FALSE, ?, ?, ?, ?, FALSE)
    `;

    await pool.query(query, [
      title,
      priority || 'medium',
      category || '',
      formatDateForMySQL(dueDate),
      formatDateForMySQL(reminderTime),
    ]);

    // 查询刚插入的记录
    const [rows] = await pool.query('SELECT * FROM tasks WHERE title = ? ORDER BY created_at DESC LIMIT 1', [title]);
    res.status(201).json((rows as any[])[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

// PUT /api/tasks/:id - Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { completed, priority, category, dueDate, reminderTime, reminder_sent } = req.body;

    const query = `
      UPDATE tasks
      SET
        completed = IFNULL(?, completed),
        priority = IFNULL(?, priority),
        category = IFNULL(?, category),
        due_date = IFNULL(?, due_date),
        reminder_time = IFNULL(?, reminder_time),
        reminder_sent = IFNULL(?, reminder_sent)
      WHERE id = ?
    `;

    await pool.query(query, [
      completed,
      priority,
      category,
      dueDate,
      reminderTime,
      reminder_sent,
      id,
    ]);

    // 查询更新后的记录
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    const updatedRows = rows as any[];

    if (updatedRows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedRows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// DELETE /api/tasks/:id - Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
