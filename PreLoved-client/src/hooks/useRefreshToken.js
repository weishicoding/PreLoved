import useAuth from './useAuth'
import axios from '../api/axios'

export const useRefreshToken = () => {
  const {setAuth} = useAuth()
  const refresh = async () => {
    const response = await axios.get('/api/auth/refreshToken', {
      withCredentials: true
    })
    setAuth(prev => {
      return {...prev, username: response.data.username, roles: response.data.roles, accessToken: response.data.accessToken}
    })
    return response.data.accessToken
  }
  return refresh
}
