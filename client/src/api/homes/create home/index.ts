import API from 'api'
import { Home } from 'types'

const createHome = async (body: FormData) => {
  // send form data to server to add a new home
  const { data } = await API.post<Home>('/homes', body, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data  // return the created home
}

export default createHome