import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Typography, Input } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;
const { Search } = Input;


const TrackingReport = () => {

  const [ sortedInfo, setSortedInfo ] = useState(); 
  const [ filteredInfo, setFilteredInfo ] = useState(); 
  const [ students, setStudents ] = useState([]);
  const [ courses, setCourses ] = useState([]);

  const rightNow = new Date();

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
    setFilteredInfo(filters);
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
    margin: 30px;
  `;



  useEffect(() => {
    fetch('https://forked-student-dashboard.herokuapp.com/students')
    .then(response => response.json())
    .then(data => {
      setStudents(data);
      const courses = [];
      data.forEach((student) => {
        const course = student.student_course.course.course_name
        if (!courses.includes(course)) {
          courses.push(course);
        }
      })
      setCourses(courses);
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
      children: [
        {
          key: 112,
          course: 'John Brown'
        },
        {
          key: 111,
          course: 'John Brown'
        }
      ]
    };
  });

  let sI = sortedInfo;
  let fI = filteredInfo;
  sI = sortedInfo || {};
  fI = filteredInfo || {};
  
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
      filters: courses.map((course) => {
        const st = {
          text: course,
          value: course,
          filteredValue: fI.course || null,
          onFilter: (value, record) => record.course.includes(value),
        }
        return st;
      })
      
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
    <DivMargin>
      <DivMargin>
        <Row>
          <Col span={8}>
            <Text strong>CTD Student's Tracking Report</Text>
          </Col>
          <Col span={4} offset={8} justify="end">
            <Text strong>Date: </Text>
            <Text>{ `${rightNow.getMonth() + 1}/${rightNow.getDate()}/${rightNow.getFullYear()}` }</Text>
          </Col>
        </Row>
      </DivMargin>
      <DivMargin>
        <Row>
          <Col span={5}>
            <Search placeholder="Search Student" /* onSearch={onSearch} */ enterButton />          
          </Col>
        </Row>
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
    </DivMargin>
  );
};

export default TrackingReport;
