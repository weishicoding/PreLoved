import React, {useEffect, useState} from 'react'
import {Outlet} from 'react-router-dom'
import {useRefreshToken} from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true)
  const refresh = useRefreshToken()
  const {auth} = useAuth()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
      } catch (error) {
        console.log(`error ${error}`)
      } finally {
        setIsLoading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)
  }, [])
  return <>{isLoading ? <p>Loding..</p> : <Outlet />}</>
}

export default PersistLogin
