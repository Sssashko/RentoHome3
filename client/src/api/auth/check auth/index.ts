import API from 'api'
import { User } from 'types'

// Check current user’s auth status by calling GET /auth.
// Returns the User data or null if not authenticated.
const checkAuth = async () => {
  const { data } = await API.get<User>('/auth')
  return data || null
}

export default checkAuth
