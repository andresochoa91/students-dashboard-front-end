import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

const PublicRoute = ({ component: Component, ...rest }) => {
  const [authUser, setAuthUser] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => authUser ?
        (<Redirect to="/home" />)
        : (<Component {...props} />)
      }
    />
  )
}

export default PublicRoute;