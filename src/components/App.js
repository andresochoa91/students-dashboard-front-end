import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { AuthStore } from './contexts/AuthContext';
import { UserStore } from './contexts/UserContext';
import { CalendarStore } from "./contexts/CalendarContext";


import * as ROUTES from '../constants/routes';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import LandingPage from './landingPage/LandingPage';
import HomePage from './homePage/HomePage';
import GlobalStyles from '../styles/Global';
import 'antd/dist/antd.css';


const App = () => {

  useEffect(() => {
    fetch("http://localhost:3000", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => response.json())
    .then(console.log)
    .catch(console.error);
  }, []);
  
  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthStore>
          <UserStore>
            <CalendarStore>
              <GlobalStyles />
              <Switch>
                <Route path={ROUTES.HOME} exact render={() => <Redirect to={`${ROUTES.HOME}${ROUTES.DASHBOARD}`} />} />
                <PrivateRoute path={ROUTES.HOME} component={HomePage} />
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
              </Switch>
            </CalendarStore>
          </UserStore>
        </AuthStore>
      </CookiesProvider>
    </BrowserRouter>
  )
};

export default App;
