import * as mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createDatabase() {
  const dbName = process.env.DATABASE_NAME || 'taskflow';

  // 先连接到 MySQL 服务器（不指定数据库）
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD,
    multipleStatements: true, // 允许执行多条 SQL 语句
  });

  try {
    // 读取并执行 SQL 脚本
    const sqlPath = join(__dirname, 'init_mysql.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    await connection.query(sql);
    console.log(`✓ 数据库 ${dbName} 创建/验证成功`);
    console.log('✓ 表结构初始化成功');

    await connection.end();
  } catch (error: any) {
    console.error('× 初始化失败:', error.message);
    await connection.end();
    process.exit(1);
  }
}

async function main() {
  console.log('🚀 开始初始化 TaskFlow MySQL 数据库...\n');

  await createDatabase();

  console.log('\n✅ 数据库初始化完成！');
  console.log('\n现在可以运行 npm run dev 启动应用了');
}

main();
