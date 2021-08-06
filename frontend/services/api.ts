import axios from 'axios'

const buildClient = () => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL: `http://backend:4000`,
      withCredentials: true
    })
  } else {
    return axios.create({
      baseURL: process.env.BACKEND_URL,
      withCredentials: true
    })
  }
}

export default buildClient
