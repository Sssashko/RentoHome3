import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../../helpers/jwt';
import { User } from '../../types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies['accessToken'];

    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }

    const user = verifyToken(token) as User;

    if (!user || !user.id) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log('Error while authenticating:', error);
    res.status(401).json({ message: 'Invalid authentication token' });
  }
};

export default authenticate;