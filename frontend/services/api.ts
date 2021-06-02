import axios from 'axios'

const api = axios.create({
  baseURL:
    typeof window !== 'undefined'
      ? `${process.env.BACKEND_URL}`
      : 'http://backend-service',
  withCredentials: true
})

export default api
