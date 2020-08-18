import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import pool from '../src/server/db';
import { users } from './mock-data';
import iterateAsync from '../src/utils/iterateAsync';

// Verify using test database
export const connect = async () => {
  const { rows } = await pool.query('SELECT current_database()');
  const dbName = rows[0].current_database;
  if (
    dbName !== process.env.TEST_DATABASE ||
    (process.env.PGDATABASE && dbName === process.env.PGDATABASE)
  ) {
    console.log('Error: Wrong database. Releasing client');
    process.exit(1);
  }
};

// Init tables based on db-scripts
export const initTables = async () => {
  await pool.query('DROP SCHEMA public CASCADE');
  await pool.query('CREATE SCHEMA public');
  const tableScripts = fs
    .readFileSync(
      path.resolve(__dirname, '../db-scripts/01-tables.sql'),
      'utf8'
    )
    .toString()
    .split(';');

  const runScript = async (sql) => await pool.query(sql);
  await iterateAsync(tableScripts, runScript);
};

export const seedUsers = async () => {
  const addUser = async (u) => {
    const hash = await bcrypt.hash(u.password, 10);
    await pool.query(
      `
          INSERT INTO users (first_name, last_name, email, password, is_verified, is_deleted) 
          VALUES ($1, $2, $3, $4, $5, $6)
        `,
      [u.firstName, u.lastName, u.email, hash, u.isVerified, u.isDeleted]
    );
  };
  await iterateAsync(Object.values(users), addUser);
};

export const seedData = async () => {
  await seedUsers();
};

export const end = async () => {
  await pool.end();
};
