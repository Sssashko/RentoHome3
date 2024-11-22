import API from 'api'
import { Home } from 'types'

const createHome = async (body: FormData) => {
	const { data } = await API.post<Home>(`/homes`, body, {
		headers: { 'Content-Type': 'multipart/form-data' }
	})
	return data
}

export default createHome
