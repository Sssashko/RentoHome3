import API from 'api'

// Send GET /health to verify the server is up and running
const healthCheck = async () => {
  const { data } = await API.get('/health')
  return data
}

export default healthCheck
