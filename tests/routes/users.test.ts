import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import setCookie from 'set-cookie-parser';
import supertest from 'supertest';
import server from '../../src/server/server';
import * as db from '../db';
import { users, tokens } from '../mock-data';
import User from '../../src/server/models/User';
import Token from '../../src/server/models/Token';
import pool from '../../src/server/db';

const request = supertest(server);
let client;

/***********************************
 *  LIFECYCLE
 ***********************************/

beforeAll(async () => {
  client = await db.connect();
});

beforeEach(async () => {
  await db.initTables(client);
  await db.seedUsers(client);
  // seed data
});

afterAll(async () => await client.release());

/***********************************
 *  TESTS
 ***********************************/

describe('POST /users', () => {
  it('Creates a new user', async () => {
    const newUser = {
      email: 'test@test.com',
      password: 'password',
      firstName: 'test',
      lastName: 'user',
    };
    const userId = Object.keys(users).length + 1;
    const res = await request.post('/api/v1/users').send(newUser).expect(201);

    const expected = { userId, ...newUser };
    delete expected.password;

    expect(res.body.user).toMatchObject(expected);
    expect(res.body.password).not.toBeDefined();

    const {
      rows: [user],
      rowCount,
    } = await client.query(
      `
        select 
          user_id "userId", 
          email, 
          first_name "firstName", 
          last_name "lastName", 
          password,
          is_deleted,
          is_verified
        from users 
        where user_id = $1
      `,
      [userId]
    );
    const hashedPw = await bcrypt.hash(user.password, 10);
    const isMatch = await bcrypt.compare(user.password, hashedPw);
    expect(rowCount).toBe(1);
    expect(isMatch).toBeTruthy();
    user.password = newUser.password;
    expect(user).toMatchObject({
      ...newUser,
      is_deleted: false,
      is_verified: false,
    });
  });
  it("Doesn't create a new user with an existing email", async () => {
    const newUser = { email: users[1].email, password: 'password' };
    const res = await request.post('/api/v1/users').send(newUser).expect(400);

    expect(res.body.error).toBeDefined();
    expect(res.body.errors).toBeDefined();

    const {
      rowCount,
    } = await client.query('select * from users where email = $1', [
      users[1].email,
    ]);
    expect(rowCount).toBe(1);
  });

  it("Doesn't create a new user without email and password", async () => {
    const newUser = { firstName: 'Bob' };
    const res = await request.post('/api/v1/users').send(newUser).expect(400);

    expect(res.body.error).toBeDefined();
    expect(res.body.errors.email).toBeDefined();
    expect(res.body.errors.password).toBeDefined();

    const {
      rowCount,
    } = await client.query('select * from users where email = $1', [
      users[1].email,
    ]);
    expect(rowCount).toBe(1);
  });
});

describe('POST /login', () => {
  it('Logs a user in', async () => {
    const user = { ...users[1] };
    const res = await request
      .post('/api/v1/users/login')
      .send({ email: user.email, password: user.password })
      .expect(200);

    delete user.password;
    delete user.isVerified;
    delete user.isDeleted;
    expect(res.body.user).toMatchObject(user);

    const cookies = setCookie.parse(res, { map: true });
    const expectedCookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    };
    expect(cookies.bearerToken).toMatchObject({
      ...expectedCookieOptions,
      path: '/api',
    });
    expect(cookies.refreshToken).toMatchObject({
      ...expectedCookieOptions,
      path: '/api/v1/users/auth',
    });

    const bearerContent = await jwt.verify(
      cookies.bearerToken.value,
      process.env.JWT_SECRET
    );
    const refreshContent = await jwt.verify(
      cookies.refreshToken.value,
      process.env.JWT_SECRET
    );
    // Check bearer token
    expect(bearerContent.exp).toBe(bearerContent.iat + 60 * 15);
    expect(bearerContent.sub).toBe(user.userId);
    expect(bearerContent.email).toBe(user.email);
    expect(bearerContent.type).toBe('BEARER');
    expect(bearerContent.csrf).toBe(res.body.csrf.bearer);

    // Check refresh token
    expect(refreshContent.exp).toBe(refreshContent.iat + 60 * 60 * 24 * 7);
    expect(refreshContent.sub).toBe(user.userId);
    expect(refreshContent.email).toBe(user.email);
    expect(refreshContent.type).toBe('REFRESH');
    expect(refreshContent.csrf).toBe(res.body.csrf.refresh);
  });

  it("Doesn't log a user in with wrong password", async () => {
    const res = await request
      .post('/api/v1/users/login')
      .send({ email: users[1].email, password: 'fakepassword' })
      .expect(403);

    const cookies = setCookie.parse(res, { map: true });
    expect(cookies.bearerToken || cookies.refreshToken).toBeFalsy();
    expect(res.body.error).toBeDefined();
    expect(res.body.errors).not.toBeDefined();
  });

  it("Doesn't log a user in with non-existent email", async () => {
    await request
      .post('/api/v1/users/login')
      .send({ email: 'noemail@email.com', password: 'fakepassword' })
      .expect(403);
  });
});

describe('GET /users/auth/refresh', () => {
  it('Gets new tokens', async () => {
    const tokens = await Token.generate(users[1]);

    const res = await request
      .get('/api/v1/users/auth/refresh')
      .set('Cookie', [
        `bearerToken=${tokens.bearer.token}`,
        `refreshToken=${tokens.refresh.token}`,
      ])
      .set('authorization', tokens.refresh.csrf)
      .expect(200);

    const cookies = setCookie.parse(res, { map: true });
    const expectedCookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    };
    expect(cookies.bearerToken.value).not.toBe(tokens.bearer.token);
    expect(cookies.refreshToken.value).not.toBe(tokens.refresh.token);
    expect(cookies.bearerToken).toMatchObject({
      ...expectedCookieOptions,
      path: '/api',
    });
    expect(cookies.refreshToken).toMatchObject({
      ...expectedCookieOptions,
      path: '/api/v1/users/auth',
    });

    const bearerContent = await jwt.verify(
      cookies.bearerToken.value,
      process.env.JWT_SECRET
    );
    const refreshContent = await jwt.verify(
      cookies.refreshToken.value,
      process.env.JWT_SECRET
    );
    // Check bearer token
    expect(bearerContent.exp).toBe(bearerContent.iat + 60 * 15);
    expect(bearerContent.sub).toBe(users[1].userId);
    expect(bearerContent.email).toBe(users[1].email);
    expect(bearerContent.type).toBe('BEARER');
    expect(bearerContent.csrf).toBe(res.body.csrf.bearer);

    // Check refresh token
    expect(refreshContent.exp).toBe(refreshContent.iat + 60 * 60 * 24 * 7);
    expect(refreshContent.sub).toBe(users[1].userId);
    expect(refreshContent.email).toBe(users[1].email);
    expect(refreshContent.type).toBe('REFRESH');
    expect(refreshContent.csrf).toBe(res.body.csrf.refresh);
  });
});

describe('GET /users/auth/logout', () => {
  it('Logs the user out', async () => {
    const newToken = new Token({ email: users[1].email, userId: 1 }, 'REFRESH');
    await newToken.save();
    const res = await request
      .get('/api/v1/users/auth/logout')
      .set('Cookie', `bearerToken=${tokens[1]}`)
      .set('Cookie', `refreshToken=${newToken.token}`)
      .set('Authorization', 'Bearer csrf')
      .expect(204);

    const cookies = setCookie.parse(res, { map: true });
    expect(cookies.bearerToken.value).toBe('');
    expect(cookies.refreshToken.value).toBe('');
  });
});
