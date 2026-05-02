import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '3306'),
  database: process.env.DATABASE_NAME || 'taskflow',
  user: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
});

export { pool };

// Test connection
pool.getConnection()
  .then((conn) => {
    console.log('✓ MySQL connection established');
    conn.release();
  })
  .catch((err) => {
    console.error('✗ MySQL connection failed:', err.message);
  });
