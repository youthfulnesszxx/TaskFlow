import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/tasks.js';

const router = Router();

// GET /api/tasks - Get all tasks with optional filtering
router.get('/', getTasks);

// POST /api/tasks - Create a new task
router.post('/', createTask);

// PUT /api/tasks/:id - Update a task
router.put('/:id', updateTask);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', deleteTask);

export default router;
