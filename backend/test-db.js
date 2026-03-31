const pool = require('./db/connection');

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database is connected');
    process.exit(0);
  } catch (error) {
    console.error('Database FAILED to connect:', error.message);
    process.exit(1);
  }
}

testConnection();