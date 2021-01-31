import React from 'react';
import { Switch } from "react-router-dom";
import { Layout } from "antd";

import * as ROUTES from "../../../../constants/routes";
import PrivateRoute from "../../../routes/PrivateRoute";
import Dashboard from "../../dashboard/Dashboard";
import FullCalendarDashboard from "../../fullCalendar/FullCalendarDashboard";
import TrackingReport from '../../dashboard/staffDashboard/studentsTrackingReport/TrackingReport';

const { Content } = Layout;

const StaffHomeContent = ({ keys, selectedKey, setSelectedKey, match }) => {

  return (
    <Content style={{ margin: "0 16px" }}>
      <div className="site-layout-background">
        <Switch>
          <PrivateRoute
            path={`${match.path}${ROUTES.DASHBOARD}`}
            component={Dashboard}
            // menuKey={{ dashboardKey: keys[0], assignmentsKey: keys[2], calendarKey: keys[3] }}
            menuKey={{ dashboardKey: keys['Dashboard'], calendarKey: keys['Calendar'] }}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            match={ match }
          />
          <PrivateRoute
            path={`${match.path}${ROUTES.CALENDAR}`}
            menuKey={keys['Calendar']}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            component={FullCalendarDashboard}
          />
          <PrivateRoute 
            path={ `${match.path}${ROUTES.STUDENTS}` }
            component={ TrackingReport }
          />
        </Switch>
      </div>
    </Content>
  )
}

export default StaffHomeContent;