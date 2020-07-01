import jwt from 'jsonwebtoken';
import { asyncCatchWrapper } from '../../utils';
import NamedError from '../models/NamedError';

const auth = (requiredRoles?: string[]) =>
  asyncCatchWrapper(async (req, res, next) => {
    const { bearerToken: token } = req.cookies;
    const { sub, email, type, csrf, roles } = await jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // If roles specified check jwt has roles
    if (requiredRoles) {
      const notAuthErr = new NamedError('Auth', 'Not authorized');
      if (!roles || !roles.length) throw notAuthErr;

      const hasRoles =
        requiredRoles
          .map((r) => roles.find((r2) => r === r2)) // see if roles exist on jwt
          .filter((r) => r).length === requiredRoles.length; // filter out missing roles and check lengths are equal

      if (!hasRoles) throw notAuthErr;
    }

    const headerCsrf = req.headers.authorization.replace('Bearer ', '');

    if (csrf !== headerCsrf || type !== 'BEARER')
      throw new NamedError('JsonWebTokenError', '');
    req.user = { userId: sub, email };
    next();
  });

export default auth;
