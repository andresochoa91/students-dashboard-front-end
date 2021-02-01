import React, { useEffect, useState } from 'react';
import { Table, Divider, Row, Col } from 'antd';
import styled from 'styled-components';


const TrackingReport = () => {

  const [ sortedInfo, setSortedInfo ] = useState(); 
  const [ students, setStudents ] = useState([]);

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  const Square = styled.div`
    height: 25px;
    width: 25px;
    background-color: ${ props => props.squareColor };
    borderColor: #f00;
  `;

  const SquareDescription = styled.p`
    margin: 0;
    padding: 0;
  `;

  const DivMargin = styled.div`
    margin-bottom: 20px;
  `;

  useEffect(() => {
    fetch('https://forked-student-dashboard.herokuapp.com/students')
    .then(response => response.json())
    .then(data => {
      setStudents(data);
    })
    .catch(console.error);
  }, []);

  console.log(students);

  const data = students.map((student) => {
    return {
      key: student.student_id,
      name: `${student.first_name} ${student.last_name}`,
      course: student.student_course.course.course_name,
      assignments: (
        <Square 
          squareColor={ () => {
            const studentWeeklyProgress = Math.floor(student.student_weekly_progresses.reduce((acc, progress) => (
              (acc + progress.assignment_progress)
            ), 0) / student.student_weekly_progresses.length);
            return (
              studentWeeklyProgress === 3 ? "#0f0" : 
              studentWeeklyProgress === 2 ? "#ff0" : "#f00" 
            ) 
          }}
        />
      ),
      githubLink: (
        <Square 
          squareColor={ () => {
            const studentWeeklyProgress = student.student_weekly_progresses.reduce((acc, progress) => (
              (acc + (progress.assignment_submission !== "" ? 1 : 0))
            ), 0) / student.student_weekly_progresses.length;
            return (
              studentWeeklyProgress >= 1 ? "#0f0" : 
              studentWeeklyProgress > 0 ? "#ff0" : "#f00" 
            ) 
          }}
        />
      ),
      status: (
        <Square 
          squareColor={ () => {
            const studentWeeklyProgress = Math.floor(student.student_weekly_progresses.reduce((acc, progress) => (
              (acc + progress.total_progress)
            ), 0) / student.student_weekly_progresses.length);
            return (
              studentWeeklyProgress === 3 ? "#0f0" : 
              studentWeeklyProgress === 2 ? "#ff0" : "#f00" 
            ) 
          }}
        />
      ),
    };
  });

  let sI = sortedInfo;
  sI = sortedInfo || {};
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortOrder: sI.columnKey === 'name' && sI.order,
      ellipsis: true,
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      ellipsis: true,
    },
    // {
    //   title: 'Units',
    //   dataIndex: 'units',
    //   key: 'units',
    //   ellipsis: true,
    // },
    {
      title: 'Assignments',
      dataIndex: 'assignments',
      key: 'assignments',
      ellipsis: true,
    },
    {
      title: 'Github Link',
      dataIndex: 'githubLink',
      key: 'githubLink',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
    },
  ];

  return (
    <>
      <DivMargin>
        <Row justify="end">
          <Col span={3}>
            <SquareDescription>Complete</SquareDescription> 
            <Square squareColor="#0f0"/>
          </Col>
          <Col span={3}>
            <SquareDescription>In Progress</SquareDescription> 
            <Square squareColor="#ff0" />
          </Col>
          <Col span={3}>
            <SquareDescription>Not Started</SquareDescription> 
            <Square squareColor="#f00"/>
          </Col>
        </Row>

      </DivMargin>

      <Table 
        columns={columns} 
        dataSource={data} 
        onChange={handleChange} 
        // expandable={{
        //   expandedRowRender: () => <p style={{ margin: 0 }}>Hello</p>,
        //   rowExpandable: record => record.name !== 'Not Expandable',
        // }}
      />
    </>
  );
};

export default TrackingReport;
