import bcrypt from 'bcryptjs';
import * as yup from 'yup';
import pool from '../../db';
import Resource from '../Resource';
import UserType from '../../../types/User';
import NamedError from '../NamedError';
import Token from '../Token';

class User extends Resource implements UserType {
  userId?: number;

  email: string;

  firstName?: string;

  lastName?: string;

  password?: string;

  static schema = yup.object().shape({
    userId: yup.number().integer(),
    email: yup.string().email(),
    firstName: yup.string().nullable(),
    lastName: yup.string().nullable(),
    password: yup.string(),
  });

  /**
   * CREATE
   */
  async insert() {
    try {
      const { email, firstName, lastName } = this;
      let { password } = this;
      if (password) password = await bcrypt.hash(password, 10);
      const {
        rows: [{ userId }],
      } = await pool.query(
        `
        insert into public.users (email, password, first_name, last_name)
        values ($1, $2, $3, $4)
        returning user_id "userId"
      `,
        [email, password, firstName, lastName]
      );

      this.userId = userId;
      delete this.password;
      return this;
    } catch (e) {
      if (e.constraint === 'users_email_key')
        throw new NamedError('Client', 'Unable to create new user', {
          email: 'Email address is already in use',
        });
      throw e;
    }
  }

  /**
   * READ
   */
  static async findById(id) {
    const { rows, rowCount } = await pool.query(
      `
        SELECT user_id "userId", email, first_name "firstName", last_name "lastName"
        from users
        where user_id = $1
        limit 1
      `,
      [id]
    );
    if (!rowCount) return null;
    return new User(rows[0]);
  }

  static async findByEmail(email) {
    const {
      rows: [user],
      rowCount,
    } = await pool.query(
      `
        select
          user_id "userId",
          email,
          first_name "firstName",
          last_name "lastName",
          password
        from users
        where
          email = $1
        limit 1
      `,
      [email]
    );
    return rowCount ? new User(user) : null;
  }

  static async login({ email, password }) {
    const user = await User.findByEmail(email);
    if (!user) return { user };
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) return { user, isAuth };
    const tokens = await Token.generate(user);
    return { user, isAuth, tokens };
  }

  async put() {
    // TODO: Write update method
    return this;
  }

  toJSON() {
    delete this.password;
    return this;
  }
}

export default User;
