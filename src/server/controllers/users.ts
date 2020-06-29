import { asyncCatchWrapper } from '../../utils';
import User from '../models/User';
import NamedError from '../models/NamedError';
import Token from '../models/Token';

const bearerCookieOptions = {
  httpOnly: true,
  secure:
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test',
  sameSite: true,
  path: '/api',
};

const refreshCookieOptions = {
  ...bearerCookieOptions,
  path: '/api/v1/users/auth',
};

export const register = asyncCatchWrapper(async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).send({ user });
});

export const login = asyncCatchWrapper(async (req, res) => {
  const { user, isAuth, tokens } = await User.login(req.body);
  if (!user || !isAuth)
    throw new NamedError('Auth', 'Invalid email or password');

  res
    .cookie('bearerToken', tokens.bearer.token, bearerCookieOptions)
    .cookie('refreshToken', tokens.refresh.token, refreshCookieOptions)
    .send({
      user,
      csrf: { bearer: tokens.bearer.csrf, refresh: tokens.refresh.csrf },
    });
});

export const authRefresh = asyncCatchWrapper(async (req, res) => {
  const { refreshToken } = req.cookies;
  const csrf = req.headers.authorization;
  const tokens = await Token.refresh(refreshToken, csrf);

  res
    .cookie('bearerToken', tokens.bearer.token, bearerCookieOptions)
    .cookie('refreshToken', tokens.refresh.token, refreshCookieOptions)
    .send({
      csrf: { bearer: tokens.bearer.csrf, refresh: tokens.refresh.csrf },
      tokens,
    });
});

export const getProfile = asyncCatchWrapper(async (req, res) => {
  const user = await User.findById(req?.user?.userId);
  if (!user) throw new NamedError('NotFound', 'Unable to find user');
  res.send({ user });
});

export const logout = asyncCatchWrapper(async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log('cookies', req.cookies);
  console.log('refreshToken', refreshToken);
  const isDeleted = await Token.delete(refreshToken);
  if (!isDeleted) throw new NamedError('Auth', 'Not a valid token');
  res
    .clearCookie('bearerToken', { path: bearerCookieOptions.path })
    .clearCookie('refreshToken', { path: refreshCookieOptions.path })
    .status(204)
    .send();
});
