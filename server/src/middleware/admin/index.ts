import { RequestHandler } from 'express';
import { User } from '../../types';

/**
 * Allow only users with role "admin" to proceed.
 * If the user role is not admin, respond with 403 forbidden.
 */
const isAdmin: RequestHandler = (req, res, next) => {
  const user = req.user as User | undefined;
  if (user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access restricted to administrators only' });
  }
  next();
};

export default isAdmin;