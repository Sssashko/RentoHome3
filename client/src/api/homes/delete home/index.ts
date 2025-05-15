import API from 'api'

const deleteHome = async (id: number) => {
  // ask server to delete the home with given id
  const { data } = await API.delete(`/homes/${id}`, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return data  // return server response
}

export default deleteHome