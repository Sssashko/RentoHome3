import { healthCheckQuery } from 'api/health'

// Calls the health-check endpoint and returns a boolean
const healthCheck = async () => {
  try {
    await healthCheckQuery()   // → GET /health
    return true                // if we get a 200, server is healthy
  } catch {
    return false               // on network or non-200, treat as “down”
  }
}

export default healthCheck
