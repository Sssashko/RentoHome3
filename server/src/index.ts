import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { join } from 'path'
import { passport } from 'middleware'
import authenticate from './middleware/authenticate';
import isAdmin from './middleware/admin';

import {
  authRouter,
  homesRouter,
  healthRouter,
  usersRouter,
  emailRouter,
  commentRouter,
  adminRouter
} from 'routes'
import { CLIENT_URL, PORT } from 'config'

const app = express()

// --- Middlewares ---
// Parse JSON request bodies
app.use(json())

app.use(express.urlencoded({
  extended: true,
}))
// Parse cookies from incoming requests
app.use(cookieParser())
// Enable CORS for our frontend origin and allow credentials
app.use(cors({ origin: CLIENT_URL, credentials: true }))
// Initialize passport for OAuth flows (if used)
app.use(passport.initialize())

app.use(express.static(join(__dirname, 'public')))

// --- Static file serving ---
// Serve uploaded images from server/images under the /images URL path
app.use('/images', express.static(join(__dirname, '..', 'images')))
// Also serve any files placed in public/images under /public/images
app.use(
  '/public/images',
  express.static(join(__dirname, '..', 'public', 'images'))
)

// --- Routes ---
// Health check endpoint
app.use('/health', healthRouter)
// CRUD for homes, plus comments & likes
app.use('/homes', homesRouter)
// Authentication routes (login, signup, etc)
app.use('/auth', authRouter)
// User profile management
app.use('/users', usersRouter)
// Email sending endpoint (e.g. contact form)
app.use('/email', emailRouter)
// Comment CRUD routes
app.use('/comments', commentRouter)

app.use('/api/admin', authenticate, isAdmin, adminRouter)

// Catch-all 404 for any unhandled routes
app.use('*', (_req, res) => {
  res.status(404).json({ message: 'Not found' })
})

// Optional root endpoint
app.use('/', (_req, res) => {
  res.send('<h1>Hello, world!</h1>')
})

// Start HTTP server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
