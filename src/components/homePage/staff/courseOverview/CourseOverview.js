import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Space, Input, Spin } from "antd";
import { useHistory } from "react-router-dom";
//import styled from "styled-components";
import UserContext from "../../../contexts/UserContext";
//import CohortDescription from "./CohortDescription";
//import CohortCourseList from "./CohortCourseList";
import SmallCalendar from "../../dashboard/studentDashboard/smallCalendar/SmallCalendar";
import MeetingButton from "../../dashboard/staffDashboard/eventsButton/eventsStaffButton";
import MultiPurposeModal from "../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
//import CohortStudList from "./CohortStudentsList";

const CourseOverView = () => {
  // const [courses, setCourses] = useState([]);
  // const [authToken] = useContext(UserContext);

  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     let response = await fetch(`${process.env.REACT_APP_API_ROOT}/units`);
  //     response = await response.json();
  //     setCourses(response);
  //     console.log(response);
  //   }
  //   fetchMyAPI();
  // }, []);

  // const displayCohortInfo = () => {
  //   for (let i = 0; i < courses.length; i++) {
  //     let name = courses[i].course_name;
  //     let descr = courses[i].description;
  //     if (name === cohortName) {
  //       return (
  //         <>
  //           <Row>
  //             <Col span={16}>
  //               <Card
  //                 type="inner"
  //                 className="cards-border"
  //                 style={{ margin: 1 }}
  //                 key={cohortName}
  //               >
  //                 <CohortDescription name={name} description={descr} />
  //               </Card>
  //               <br></br>
  //               <Card>
  //                 <CohortCourseList />
  //               </Card>
  //             </Col>
  //             <Col span={1}></Col>
  //             <Col>
  //               <MeetingButton />
  //               <SmallCalendar />
  //             </Col>
  //           </Row>
  //           <br></br>
  //           <Row>
  //             <Card>
  //               <CohortStudList />
  //             </Card>
  //           </Row>
  //         </>
  //       );
  //     }
  //   }
  // };

  // return <>{courses.length ? <div>{displayCohortInfo()}</div> : <Spin />}</>;
  return (
    <MultiPurposeModal 
    addTitle="View"
    typeModal="View" 
    >
          <label> View: </label>
    </MultiPurposeModal>
 
 )

};

export default CourseOverView;
