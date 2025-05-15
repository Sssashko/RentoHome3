import API from 'api'
import { Home } from 'types'

const updateHome = async (body: FormData) => {
  // send updated data to server
  const { data } = await API.patch<Home>('/homes', body, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data  // return updated home
}

export default updateHome