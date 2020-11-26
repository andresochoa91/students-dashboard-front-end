import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { AuthStore } from './contexts/AuthContext';

import * as ROUTES from '../constants/routes';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import LandingPage from './landingPage/LandingPage';
import Sidebar from './homePage/HomePage';
import GlobalStyles from '../styles/Global';
import 'antd/dist/antd.css';

const App = () => {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <AuthStore>
          <GlobalStyles />
          <Switch>
            <PrivateRoute path={ROUTES.HOME} exact component={Sidebar} />
            <PublicRoute path={ROUTES.LANDING} exact component={LandingPage} />
          </Switch>
        </AuthStore>
      </CookiesProvider>
    </BrowserRouter>
  )
};

export default App;