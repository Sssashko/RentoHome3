import { Router } from 'express'

const healthRouter = Router()

// Simple health-check endpoint.
// Responds with 201 if the server is up and running.
healthRouter.get('/', (_req, res) => {
  res.status(201).json('Server is working')
})

export default healthRouter
