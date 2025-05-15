import API from 'api'
import { User } from 'types'

interface Body {
  email: string
  password: string
}

// Log in a user by POSTing credentials to /auth/login.
// Returns the User object on success.
const logIn = async (body: Body) => {
  const { data } = await API.post<User>('/auth/login', body)
  return data
}

export default logIn