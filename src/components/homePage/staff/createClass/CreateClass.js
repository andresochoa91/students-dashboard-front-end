import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import _ from "lodash";
import {
  // Card,
  Tabs,
  Row,
  Col,
} from "antd";

import * as ROUTES from "../../../../constants/routes";
import { StyledSectionStaff, StyledDiv } from "../../assignments/styles";
import CreateAssignments from "../../assignments/staff/CreateAssignments";
import Courses from "../../assignments/staff/courses/Courses";
import Units from "../../assignments/staff/units/Units";
import Lessons from "../../assignments/staff/lessons/Lessons";
import Resources from "../../assignments/staff/materials/Resources";
import PrivateRoute from "../../../routes/PrivateRoute";

const { TabPane } = Tabs;

const CreateClass = ({ match, history }) => {
  // const [state, setState] = useState({
  // 	key: 'tab1',
  // 	noTitleKey: 'app',
  // })

  // const { key, noTitleKey } = state;

  // const onTabChange = (key, type) => {
  // 	console.log(key, type);
  // 	setState({ [type]: key });
  // };

  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ROOT}/courses`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch(console.error);

    fetch(process.env.REACT_APP_GET_UNITS)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUnits(data);
      })
      .catch(console.error);

    fetch(process.env.REACT_APP_GET_LESSONS)
      .then((response) => response.json())
      .then((data) => {
        setLessons(data.lessons);
      })
      .catch(console.error);

    fetch(process.env.REACT_APP_GET_RESOURCES)
      .then((response) => response.json())
      .then((data) => {
        setResources(data.sources);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="container-fluid">
      <Row gutter={[16, 24]}>
        <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={22}>
          <StyledDiv>
            <StyledSectionStaff>
              <div className="card-container">
                <Tabs
                  type="card"
                  defaultActiveKey={`${history.location.pathname}`}
                  // onChange={key =>
                  // 	console.log(key)
                  // }
                  // tabBarGutter={0}
                >
                  {/* <TabPane tab={<Link to={`${match.path}${ROUTES.CREATE_ANNOUNCEMENTS}`}>Announcements</Link>} key="/home/classes/announcements">
										<div className="card-content">
											<PrivateRoute
												exact
												path={`${match.path}${ROUTES.ASSIGNMENTS}`}
												history={history}
												component={CreateAssignments}
											/>
										</div>
									</TabPane> */}

                  <TabPane
                    tab={
                      <Link
                        style={{ padding: "15px 15px" }}
                        to={`${match.path}${ROUTES.CREATE_COURSES}`}
                      >
                        Courses
                      </Link>
                    }
                    key="/home/classes/courses"
                  >
                    <div className="card-content">
                      <PrivateRoute
                        exact
                        path={`${match.path}${ROUTES.CREATE_COURSES}`}
                        component={Courses}
                        courses={courses}
                      />
                    </div>
                  </TabPane>

                  <TabPane
                    tab={
                      <Link
                        style={{ padding: "15px 15px" }}
                        to={`${match.path}${ROUTES.CREATE_UNITS}`}
                      >
                        Units
                      </Link>
                    }
                    key="/home/classes/units"
                  >
                    <div className="card-content">
                      <PrivateRoute
                        exact
                        path={`${match.path}${ROUTES.CREATE_UNITS}`}
                        component={Units}
                        units={units}
                      />
                    </div>
                  </TabPane>

                  <TabPane
                    tab={
                      <Link
                        style={{ padding: "15px 15px" }}
                        to={`${match.path}${ROUTES.CREATE_LESSONS}`}
                      >
                        Lessons
                      </Link>
                    }
                    key="/home/classes/lessons"
                  >
                    <div className="card-content">
                      <PrivateRoute
                        exact
                        path={`${match.path}${ROUTES.CREATE_LESSONS}`}
                        component={Lessons}
                        lessons={lessons}
                      />
                    </div>
                  </TabPane>

                  <TabPane
                    tab={
                      <Link
                        style={{ padding: "15px 15px" }}
                        to={`${match.path}${ROUTES.CREATE_RESOURCES}`}
                      >
                        Resources
                      </Link>
                    }
                    key="/home/classes/resources"
                  >
                    <div className="card-content">
                      <PrivateRoute
                        exact
                        path={`${match.path}${ROUTES.CREATE_RESOURCES}`}
                        component={Resources}
                        resources={resources}
                      />
                    </div>
                  </TabPane>

                  <TabPane
                    tab={
                      <Link
                        style={{ padding: "15px 15px" }}
                        to={`${match.path}${ROUTES.ASSIGNMENTS}${ROUTES.INSTRUCTIONS}`}
                      >
                        Assignments
                      </Link>
                    }
                    key="/home/classes/assignments/instructions"
                  >
                    <div className="card-content">
                      <PrivateRoute
                        path={`${match.path}${ROUTES.ASSIGNMENTS}`}
                        match={match}
                        component={CreateAssignments}
                      />
                    </div>
                  </TabPane>

                  {/* <TabPane tab={<Link to={`${match.path}${ROUTES.STUDENTS}`}>Students</Link>} key="/home/classes/students">
										<div className="card-content">
											<PrivateRoute
												exact
												path={`${match.path}${ROUTES.ASSIGNMENTS}`}
												component={CreateAssignments}
											/>
										</div>
									</TabPane> */}

                  {/* <TabPane tab={<Link to={`${match.path}${ROUTES.ADD_MENTORS}`}>Mentors</Link>} key="/home/classes/mentors">
										<div className="card-content">
											<PrivateRoute
												exact
												path={`${match.path}${ROUTES.ASSIGNMENTS}`}
												component={CreateAssignments}
											/>
										</div>
									</TabPane> */}
                </Tabs>
              </div>
            </StyledSectionStaff>
          </StyledDiv>
        </Col>
      </Row>
    </div>
  );
};

export default CreateClass;
