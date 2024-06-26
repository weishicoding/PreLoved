import axios from 'axios'
import moment from 'moment'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true // Include cookies in requests
})

// custom a axios request
axiosInstance.interceptors.request.use(async config => {
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
    error => {
      return Promise.reject(error)
    }
})

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await axiosInstance.post('/refresh-token')
        const newAccessToken = response.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

        return axiosInstance(originalRequest)
      } catch (e) {
        console.error('Token refresh failed', e)
      }
    }

    return Promise.reject(error)
  }
)

export default axiosInstance
