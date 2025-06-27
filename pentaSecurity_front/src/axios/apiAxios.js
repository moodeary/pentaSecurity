import axios from 'axios'

export const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_REQ_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
  },
})
