import API from 'api'
import { User } from 'types'

// Log out the user by sending their ID to /auth/logout.
// Returns the User object (or confirmation) on success.
const logOut = async (userId: number) => {
  const { data } = await API.post<User>('/auth/logout', { userId })
  return data
}

export default logOut