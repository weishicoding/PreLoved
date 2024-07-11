import React, {ReactNode} from 'react';
import useAuth from '../hooks/useAuth';
import {Navigate, useLocation} from 'react-router-dom';

interface AuthRedirectProps {
  children: ReactNode;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({children}) => {
  const {auth} = useAuth();
  const location = useLocation();
  const from =
    (location.state as {from?: {pathname: string}})?.from?.pathname || '/';

  if (auth != null) {
    return <Navigate to={from} />;
  }
  return <>{children}</>;
};

export default AuthRedirect;
