import { Router } from 'express';
import authenticate from 'middleware/authenticate'; // verifies auth token
import isAdmin from 'middleware/admin';         // checks admin privileges
import {
  handleListAllUsers,
  handleDeleteAnyUser,
  handleListAllHomes,
  handleDeleteAnyHome,
  handleUpdateAnyUser
} from './handlers';

const adminRouter = Router();

// Apply auth and admin checks to all admin routes
adminRouter.use(authenticate, isAdmin);

// User routes
adminRouter.get('/users', handleListAllUsers);
adminRouter.patch('/users/:id', handleUpdateAnyUser);
adminRouter.delete('/users/:id', handleDeleteAnyUser);

// Home routes
adminRouter.get('/homes', handleListAllHomes);
adminRouter.delete('/homes/:id', handleDeleteAnyHome);

export default adminRouter;
