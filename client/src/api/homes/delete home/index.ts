import API from 'api'

const deleteHome = async (id: number) => {
	const { data } = await API.delete(`/homes/${id}`, {
		headers: { 'Content-Type': 'multipart/form-data' }
	})
	return data
}

export default deleteHome
