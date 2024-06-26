import axiosInstance from './axios'

export async function login(username, password) {
  const response = await axiosInstance.post('/login', {username, password})
  const accessToken = response.data.accessToken
  localStorage.setItem('accessToken', accessToken)
  return accessToken
}
