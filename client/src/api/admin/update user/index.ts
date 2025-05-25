// Update user via FormData (admin only)
import API from 'api'
import { User } from 'types'

const updateUserQuery = async (id: number, body: FormData): Promise<User> => {
  const { data } = await API.patch<User>(`/api/admin/users/${id}`, body)
  return data
}
export default updateUserQuery
