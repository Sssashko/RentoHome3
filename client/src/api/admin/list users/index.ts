// List all users (admin only)
import API from 'api'
import { User } from 'types'

const listUsers = async (): Promise<User[]> => {
  const { data } = await API.get<User[]>('/api/admin/users')
  return data
}
export default listUsers