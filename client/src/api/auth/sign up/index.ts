import API from 'api'
import { User } from 'types'

// Sign up a new user by POSTing form data (including avatar) to /auth/signup.
// Returns the created User object.
const signUp = async (body: FormData) => {
  const { data } = await API.post<User>('/auth/signup', body)
  return data
}

export default signUp