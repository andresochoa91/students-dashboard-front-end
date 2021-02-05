import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import {
  Card,
  Tabs,
  Row,
  Col,

} from "antd";

import * as ROUTES from "../../../constants/routes";
import { StyledSectionStaff, StyledDiv } from "../assignments/styles";
import CreateAssignments from '../assignments/staff/CreateAssignments';
import PrivateRoute from '../../routes/PrivateRoute';

const { TabPane } = Tabs;

const CreateClass = ({ match }) => {

  const [state, setState] = useState({
    key: 'tab1',
    noTitleKey: 'app',
  })

  const { key, noTitleKey } = state;

  const onTabChange = (key, type) => {
    console.log(key, type);
    setState({ [type]: key });
  };

  return (
    <div className="container-fluid">
      <Row gutter={[16, 24]}>
        <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
          <StyledDiv>
            <StyledSectionStaff>
              <div className="card-container">
                <Tabs
                  type="card"
                  onChange={key =>
                    console.log(key)
                  }
                  tabBarGutter={10}
                >
                  <TabPane tab={<Link to={`${match.path}${ROUTES.CREATE_ANNOUNCEMENTS}`}>Announcements</Link>} key="1">
                    <div className="card-content">
                      <PrivateRoute
                        exact
                        path={`${match.path}${ROUTES.ASSIGNMENTS}`}
                        component={CreateAssignments}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={<Link to={`${match.path}${ROUTES.CREATE_UNITS}`}>Units</Link>} key="2">
                    <div className="card-content">
                      <PrivateRoute
                        exact
                        path={`${match.path}${ROUTES.ASSIGNMENTS}`}
                        component={CreateAssignments}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={<Link to={`${match.path}${ROUTES.ASSIGNMENTS}`}>Assignments</Link>} key="3">
                    <div className="card-content">
                      <PrivateRoute
                        path={`${match.path}${ROUTES.ASSIGNMENTS}`}
                        match={match}
                        component={CreateAssignments}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={<Link to={`${match.path}${ROUTES.STUDENTS}`}>Students</Link>} key="4">
                    <div className="card-content">
                      <PrivateRoute
                        exact
                        path={`${match.path}${ROUTES.ASSIGNMENTS}`}
                        component={CreateAssignments}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={<Link to={`${match.path}${ROUTES.ADD_MENTORS}`}>Mentors</Link>} key="5">
                    <div className="card-content">
                      <PrivateRoute
                        exact
                        path={`${match.path}${ROUTES.ASSIGNMENTS}`}
                        component={CreateAssignments}
                      />
                    </div>
                  </TabPane>
                </Tabs>

              </div>
            </StyledSectionStaff>
          </StyledDiv>
        </Col>
      </Row>
    </div>
  )
}

export default CreateClass;