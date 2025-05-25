// Delete a home by ID (admin only)
import API from 'api'

const deleteHome = async (id: number): Promise<void> => {
  await API.delete(`/api/admin/homes/${id}`)
}
export default deleteHome