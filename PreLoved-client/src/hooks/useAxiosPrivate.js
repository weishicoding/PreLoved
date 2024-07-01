import {axiosPrivate} from '../api/axios'
import {useEffect} from 'react'
import {useRefreshToken} from './useRefreshToken'
import useAuth from './useAuth'

const useAxoisPrivate = () => {
  const refresh = useRefreshToken()
  const {auth} = useAuth()

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
        }
        return config
      },
      error => Promise.eject(error)
    )

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config
        if (error?.response.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true
          const newAccessToken = await refresh()
          prevRequest.header['Authorization'] = `Bearer ${newAccessToken}`
          return axiosPrivate(prevRequest)
        }
        return Promise.reject(error)
      }
    )
    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept)
      axiosPrivate.interceptors.request.eject(requestIntercept)
    }
  }, [auth, refresh])

  return axiosPrivate
}

export default useAxoisPrivate
