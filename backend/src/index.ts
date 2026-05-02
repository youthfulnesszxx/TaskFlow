import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool } from './db/postgres.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API is running', version: '1.0.0' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TaskFlow Backend running on port ${PORT}`);
});
