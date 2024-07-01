import {useContext} from 'react'
import AuthContext from '../context/AuthProvieder'

const useAuth = () => {
  return useContext(AuthContext)
}

export default useAuth
