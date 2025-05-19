import { Router } from 'express'
import sendEmailHandler from './handlers/send email'

const emailRouter = Router()

// route to trigger sending an email
emailRouter.post('/send', sendEmailHandler)

export default emailRouter
