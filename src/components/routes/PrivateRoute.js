import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authUser, setAuthUser] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => authUser ?
        (<Component {...props} />)
        : (<Redirect to="/" />)
      }
    />
  )
}

export default PrivateRoute;