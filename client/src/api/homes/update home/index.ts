import API from 'api'
import { Home } from 'types'

const updateHome = async (body: FormData) => {
	const { data } = await API.patch<Home>(`/homes`, body, {
		headers: { 'Content-Type': 'multipart/form-data' }
	})
	return data
}

export default updateHome
