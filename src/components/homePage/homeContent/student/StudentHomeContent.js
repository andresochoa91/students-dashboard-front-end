import React from 'react';
import { Switch } from "react-router-dom";
import { Layout } from "antd";

<<<<<<< HEAD:src/components/homePage/homeContent/HomeContent.js
import * as ROUTES from "../../../constants/routes";
import PrivateRoute from "../../routes/PrivateRoute";
import Dashboard from "../dashboard/Dashboard";
import Assignments from "../assignments/Assignments";
import FullCalendarDashboard from "../fullCalendar/FullCalendarDashboard";
import ProfilePage from '../dashboard/profile/ProfilePage';
=======
import * as ROUTES from "../../../../constants/routes";
import PrivateRoute from "../../../routes/PrivateRoute";
import Dashboard from "../../dashboard/Dashboard";
import Assignments from "../../assignments/Assignments";
import FullCalendarDashboard from "../../fullCalendar/FullCalendarDashboard";
>>>>>>> 5b50a2656b61e5979f0c3e904bbfa887efc68bdc:src/components/homePage/homeContent/student/StudentHomeContent.js

const { Content } = Layout;

const StudentHomeContent = ({ keys, selectedKey, setSelectedKey, match }) => {
  return (
    <Content style={{ margin: "0 16px" }}>
      <div className="site-layout-background">
        <Switch>
          <PrivateRoute
            path={`${match.path}${ROUTES.DASHBOARD}`}
            component={Dashboard}
            menuKey={{ dashboardKey: keys['Dashboard'], assignmentsKey: keys['Assignments'], calendarKey: keys['Calendar'] }}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
          />
          <PrivateRoute
            path={`${match.path}${ROUTES.ASSIGNMENTS}`}
            menuKey={keys[2]}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            component={Assignments}
          />
          <PrivateRoute
            path={`${match.path}${ROUTES.CALENDAR}`}
            menuKey={keys[3]}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            component={FullCalendarDashboard}
          />
           <PrivateRoute
            path={`${match.path}${ROUTES.PROFILE}`}
            component={ProfilePage}
          />
        </Switch>
      </div>
    </Content>
  )
}

export default StudentHomeContent;