// Delete a user by ID (admin only)
import API from 'api'

const deleteUser = async (id: number): Promise<void> => {
  await API.delete(`/api/admin/users/${id}`)
}
export default deleteUser