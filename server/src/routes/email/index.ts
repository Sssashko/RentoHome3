import { Router } from 'express';
import sendEmailHandler from './handlers/send email';

const emailRouter = Router();

emailRouter.post('/send', sendEmailHandler);

export default emailRouter;
