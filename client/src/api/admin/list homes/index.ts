// List all homes (admin only)
import API from 'api'
import { Home } from 'types'

const listHomes = async (): Promise<Home[]> => {
  const { data } = await API.get<Home[]>('/api/admin/homes')
  return data
}
export default listHomes