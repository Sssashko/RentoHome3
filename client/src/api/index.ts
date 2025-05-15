import axios from 'axios'
import { SERVER_URL } from 'config'

// create a single axios instance for all API calls
const API = axios.create({
  baseURL: SERVER_URL,     // send requests to this server URL
  withCredentials: true    // include cookies in requests if needed
})

export default API
