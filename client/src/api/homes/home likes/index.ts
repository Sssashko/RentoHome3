import API from 'api'

const likeHomeQuery = async (homeId: number) => {
  // toggle like on the home
  const { data } = await API.patch(`/homes/${homeId}/like`)
  return data.home  // updated home object
}

export default likeHomeQuery