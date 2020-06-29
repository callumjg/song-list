import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import pool from '../db';
import NamedError from './NamedError';

class Token {
  token: string;
  csrf: string;
  userId?: number;
  email?: string;

  constructor({ userId, email }, type: 'BEARER' | 'REFRESH') {
    const iat = Math.floor(Date.now() / 1000); // NumericDate: seconds since epoch
    this.userId = userId;
    this.email = email;
    this.csrf = uuid();
    const expiryTime =
      type === 'REFRESH'
        ? parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10) || 60 * 60 * 24 * 7
        : parseInt(process.env.BEARER_TOKEN_EXPIRY, 10) || 60 * 15;
    const content = {
      iat, // issued at
      exp: iat + expiryTime,
      sub: userId, // subject
      email,
      type,
      csrf: this.csrf,
    };

    this.token = jwt.sign(content, process.env.JWT_SECRET);
  }

  async save() {
    pool.query('insert into refresh_tokens (token, user_id) values ($1, $2)', [
      this.token,
      this.userId,
    ]);
  }

  static async generate(user) {
    const bearer = new Token(user, 'BEARER');
    const refresh = new Token(user, 'REFRESH');
    await refresh.save();
    return { bearer, refresh };
  }

  static async find(token) {
    const { rows, rowCount } = await pool.query(
      `
        SELECT token, user_id "userId" 
        FROM refresh_tokens
        where token = $1
      `,
      [token]
    );
    return rowCount ? new Token(rows[0], 'REFRESH') : null;
  }

  static async refresh(refreshToken, csrf) {
    const { sub, email, type, csrf: tokenCSRF } = await jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    );

    if (tokenCSRF !== csrf || type !== 'REFRESH')
      throw new NamedError('JsonWebTokenError', '');

    const oldToken = await Token.find(refreshToken);

    if (!oldToken) throw new NamedError('Auth', 'Invalid token');

    await oldToken.delete();
    return Token.generate({ userId: sub, email });
  }

  static async delete(token) {
    const { rowCount } = await pool.query(
      `
      delete from refresh_tokens r 
      where r.token = $1 
    `,
      [token]
    );
    return rowCount || null;
  }

  async delete() {
    return Token.delete(this.token);
  }

  toJSON() {
    delete this.userId;
    delete this.email;
    return this;
  }
}

export default Token;
