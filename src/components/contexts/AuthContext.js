import React, { useState, useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';
import _ from 'lodash';

const Context = React.createContext();

export const AuthStore = ({ children }) => {
  const [cookies, setCookie] = useCookies(['auth_token']);
  const [authUser, setAuthUser] = useState(cookies['auth_token']);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (authUser && _.isEmpty(cookies)) {
      setCookie('auth_token', authUser.token);
      setUserInfo(authUser.info);
    }
  }, [authUser])

  useEffect(() => {
    if (!_.isEmpty(cookies)) {
      const getData = async () => {
        const response = await fetch('https://forked-student-dashboard.herokuapp.com/user', {
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          body: JSON.stringify({ token: authUser }),
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        console.log(data)
        setUserInfo(data);
      }
      getData();
    }
  }, [])

  console.log(authUser)
  console.log(userInfo)

  return (
    <Context.Provider
      value={[authUser, setAuthUser, userInfo, setUserInfo]}
    >
      {children}
    </Context.Provider>
  )
}

export default Context;