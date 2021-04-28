import React, { useState, useEffect, useContext } from "react";
import MultiPurposeModal from "../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import { Card, Row, Col, Space, Input, Spin } from "antd";
import styled from "styled-components";
import TextEditor from "../../textEditor/TextEditor";

const CohortDescription = (props) => {
  const TextField = styled.div`
    width: auto;
    height: 95px;
    padding: 20px 20px 20px 0px;
    text-align: left;
  `;
console.log(props.description)
  //add MultiPurposeModal to hadle Edit or Delete
  return (
    <>
      <Row>
        <Col span={22}>
          <TextField>
            <h1>
              <strong>{props.name} Overview </strong>
            </h1>
            {props.description}
          </TextField>
        </Col>
        <Col span={1}>
          <MultiPurposeModal>
            <label>Cohort Name: </label>
            <Input
              type="text"
              name="unitName"
              value={props.name}
              // onChange={(event) => {
              //   event.preventDefault();
              //   setUnitName(event.target.value);
              // }}
            />
            <br />
            <br />
            <label>Cohort Description: </label>
            <TextEditor />

            <br />
            {/* <Button type="primary" htmlType="submit" >
                                    Create Course
                                </Button> */}
          </MultiPurposeModal>
        </Col>
      </Row>
    </>
  );
};

export default CohortDescription;
