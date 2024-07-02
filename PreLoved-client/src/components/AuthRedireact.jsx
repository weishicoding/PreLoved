import React from 'react'
import useAuth from '../hooks/useAuth'
import {Navigate, useLocation} from 'react-router-dom'

const AuthRedireact = ({children}) => {
  const {auth} = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
 
  if (auth != null) {
    return <Navigate to={from} />
  }
  return children
}

export default AuthRedireact
