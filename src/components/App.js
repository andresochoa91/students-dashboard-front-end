import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { UserStore } from './contexts/UserContext';
import { CalendarStore } from "./contexts/CalendarContext";


import * as ROUTES from '../constants/routes';
import PrivateRoute from './routes/PrivateRoute';
import LandingPage from './landingPage/LandingPage';
import HomePage from './homePage/HomePage';
import GlobalStyles from '../styles/Global';
import 'antd/dist/antd.css';


const App = () => {

  useEffect(() => {
    fetch("https://forked-student-dashboard.herokuapp.com", {
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
      </CookiesProvider>
    </BrowserRouter>
  )
};

export default App;
