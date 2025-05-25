import { RequestHandler } from 'express';
import { verifyToken } from '../../helpers/jwt';
import { User } from '../../types';

declare global {
  namespace Express {
    interface Request { user?: User }
  }
}

/**
 * Verify JWT stored in cookies to authenticate requests.
 * On success, attach user object to req.user; on failure, respond with 401.
 */
const authenticate: RequestHandler = (req, res, next) => {
  const token = req.cookies['accessToken'];
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  try {
    // Decode and verify token signature
    const user = verifyToken(token) as User;
    if (!user?.id) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }
    // Attach user data to the request for downstream handlers
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};

export default authenticate;
  