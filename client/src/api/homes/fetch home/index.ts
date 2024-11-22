import API from 'api'
import { Home } from 'types'

const fetchHomes = async () => {
	const { data } = await API.get<[Home]>(`/homes`)
	return data
}

export default fetchHomes
