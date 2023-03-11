const { Pool } = require('pg');

// Create a new pool with the database connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hotel_admin',
  password: '1337',
});

module.exports = pool;