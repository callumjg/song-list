import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import pool from '../src/server/db';
import { users } from './mock-data';

// Verify using test database
export const connect = async () => {
  console.log('Connecting to databse');
  const client = await pool.connect();
  const { rows } = await pool.query('SELECT current_database()');
  const dbName = rows[0].current_database;
  console.log('Connected to ' + dbName);
  if (
    dbName !== process.env.TEST_DATABASE ||
    (process.env.PGDATABASE && dbName === process.env.PGDATABASE)
  ) {
    console.log('Error: Wrong database. Releasing client');
    await client.release();
    throw new Error('Tests are using wrong database');
  }

  return client;
};

// Init tables based on db-scripts
export const initTables = async (client) => {
  await client.query('DROP SCHEMA public CASCADE');
  await client.query('CREATE SCHEMA public');
  const tableScripts = fs
    .readFileSync(
      path.resolve(__dirname, '../db-scripts/01-tables.sql'),
      'utf8'
    )
    .toString()
    .split(';');

  await Promise.all(tableScripts.map(async (sql) => await client.query(sql)));
};

export const seedUsers = async (client) =>
  await Promise.all(
    Object.values(users).map(async (u) => {
      const hash = await bcrypt.hash(u.password, 10);
      await client.query(
        `
            INSERT INTO users (first_name, last_name, email, password, is_verified, is_deleted) 
            VALUES ($1, $2, $3, $4, $5, $6)
          `,
        [u.firstName, u.lastName, u.email, hash, u.isVerified, u.isDeleted]
      );
    })
  );

export const seedData = async (client) => {
  await seedUsers(client);
};
