import useAuth from './useAuth'
import axiosInstance from '../api/axios'

export const useRefreshToken = () => {
  const {setAuth} = useAuth()
  const refresh = async () => {
    const response = await axiosInstance.get(
      '/auth/refreshToken',
      {token: ''},
      {
        withCredentials: true
      }
    )
    setAuth(prev => {
      console.log(JSON.stringify(prev))
      console.log(response.data.accessToken)
      return {...prev, accessToken: response.data.accessToken}
    })
    return response.data.accessToken
  }
  return refresh
}
