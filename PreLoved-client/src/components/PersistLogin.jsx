import React, {useEffect, useState} from 'react'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import {useRefreshToken} from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'

const PersistLogin = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const {auth, setAuth} = useAuth()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.log(`error ${error}`)
        setAuth(null)
        navigate('/login', {state: {from: location}, replace: true})
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])
  return <>{isLoading ? <p>Loding..</p> : <Outlet />}</>
}

export default PersistLogin
