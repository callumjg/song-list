import { Pool } from 'pg';

const pool = new Pool({
  database:
    process.env.NODE_ENV === 'test'
      ? process.env.TEST_DATABASE
      : process.env.PGDATABASE,
  ssl: process.env.PG_REQUIRE_SSL === 'true',
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err); // your callback here
  process.exit(-1);
});

export default pool;
