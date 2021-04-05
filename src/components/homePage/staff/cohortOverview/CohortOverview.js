import React, { useState, useEffect, useContext, useCallback } from "react";
import { Card, Row, Col, Space, Input, Spin } from "antd";
//import { useHistory } from "react-router-dom";
import styled from "styled-components";
import TextEditor from "../../textEditor/TextEditor";
import UserContext from "../../../contexts/UserContext";
import MultiPurposeModal from "../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";

const CohortOverView = (props) => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [authToken] = useContext(UserContext);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(`${process.env.REACT_APP_API_ROOT}/courses`);
      response = await response.json();
      setCourses(response);
      console.log(response);
    }
    fetchMyAPI();
  }, []);

  //   const fetchMyAPI = useCallback(async () => {
  //     let response = await fetch(`${process.env.REACT_APP_API_ROOT}/courses`);
  //     response = await response.json();
  //     setCourses(response);
  //   }, []);

  //add MultiPurposeModal to hadle Edit or Delete
  const handleEdit = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_GET_COURSES, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        course_name: courseName,
        description: courseDescription,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // console.log(data);
        window.location.reload();
      })
      .catch(console.error);
  };

  //   useEffect(() => {
  //     fetchMyAPI();
  //   }, []);

  const url = props.location.pathname;
  const cohortName = url.slice(13);
  console.log(cohortName);
  console.log(courses);

  const displayCohortInfo = () => {
    console.log("I am here!");
    for (let i = 0; i < courses.length; i++) {
      let name = courses[i].course_name;
      console.log(name);
      if (name === cohortName) {
        return (
          <Card
            type="inner"
            hoverable
            className="cards-border"
            style={{ margin: 3 }}
            key={cohortName}
          >
            <Col span={12}>
              <h3>
                <strong>{cohortName}</strong>
              </h3>
            </Col>
          </Card>
        );
      }
    }
  };

  return (
    <>
      {courses.length ? (
        <Card
          type="inner"
          hoverable
          className="cards-border"
          style={{ paddingTop: 10 }}
        >
          <MultiPurposeModal
            //how to add icon instead "add"?
            handleOk={handleEdit}
          >
            <label>Cohort Name: </label>
            <Input
              type="text"
              name="courseName"
              value={courseName}
              onChange={(event) => {
                event.preventDefault();
                setCourseName(event.target.value);
              }}
            />
            <br />
            <br />
            <label>Cohort Description: </label>

            <TextEditor
              text={courseDescription}
              setText={setCourseDescription}
            />

            <br />
            {/* <Button type="primary" htmlType="submit" >
                        Create Course
                    </Button> */}
          </MultiPurposeModal>
          <br></br>

          <Row gutter={[16, 16]}>{displayCohortInfo()}</Row>
        </Card>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default CohortOverView;
