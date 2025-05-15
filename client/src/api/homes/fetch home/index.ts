import API from 'api'
import { Home } from 'types'

const fetchHomes = async () => {
  // get list of all homes from server
  const { data } = await API.get<Home[]>('/homes')
  return data  // array of homes
}

export default fetchHomes