import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import pool from '../db';
import NamedError from './NamedError';

class Token {
  token: string;
  csrf: string;
  userId?: number;
  email?: string;
  roles?: string[];

  constructor({ userId, email, roles = [] }, type: 'BEARER' | 'REFRESH') {
    const iat = Math.floor(Date.now() / 1000); // NumericDate: seconds since epoch
    this.csrf = uuid();
    this.userId = userId;
    const expiryTime =
      type === 'REFRESH'
        ? parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10) || 60 * 60 * 24 * 7
        : parseInt(process.env.BEARER_TOKEN_EXPIRY, 10) || 60 * 15;
    const content = {
      iat, // issued at
      exp: iat + expiryTime,
      sub: userId, // subject
      email,
      roles,
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
        SELECT token
        FROM refresh_tokens
        where token = $1
      `,
      [token]
    );
    return rowCount ? rows[0].token : null;
  }

  static async refresh(refreshToken, csrfHeader) {
    const { sub, email, type, csrf: tokenCSRF, roles } = await jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    );

    const csrf = csrfHeader.replace(/^Bearer /i, '');

    if (tokenCSRF !== csrf || type !== 'REFRESH')
      throw new NamedError('JsonWebTokenError', '');

    const isDeleted = await Token.delete(refreshToken);
    if (!isDeleted) throw new NamedError('Auth', 'Invalid token');
    return Token.generate({ userId: sub, email, roles });
  }

  static async delete(token) {
    const { rowCount } = await pool.query(
      `
      delete from refresh_tokens
      where token = $1 
    `,
      [token]
    );
    return rowCount || null;
  }
}

export default Token;
