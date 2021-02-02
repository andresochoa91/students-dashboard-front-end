import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Typography, Input, Button } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;
const { Search } = Input;


const TrackingReport = () => {

  const [ sortedInfo, setSortedInfo ] = useState(); 
  const [ filteredInfo, setFilteredInfo ] = useState(); 
  const [ students, setStudents ] = useState([]);
  const [ currentStudents, setCurrentStudents ] = useState([]);
  const [ courses, setCourses ] = useState([]);
  const [ temporarySearch, setTemporarySearch ] = useState("");

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
      console.log(data);

      const students = data.map((student) => {
        const units = {};

        student.student_weekly_progresses.forEach((swp) => {
          
          const obj = {
            week: `Week ${swp.week_number}`,
            assignmentProgress: swp.assignment_progress,
            githubLink: swp.assignment_submission,
            status: swp.total_progress
          };

          if (!units[swp.week.unit.unit_name]) {
            units[swp.week.unit.unit_name] = [obj];
          } else {
            units[swp.week.unit.unit_name].push(obj);
          }
        })

        return {
          student_id: student.student_id,
          first_name: student.first_name,
          last_name: student.last_name,
          course_name: student.student_course.course.course_name,
          student_weekly_progresses: student.student_weekly_progresses,
          units
        }
      })

      setStudents(students);

      setCurrentStudents(students);
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

  const onSearch = (event) => {
    const name = event.toLowerCase();
    setTemporarySearch(event);
    setCurrentStudents(students.filter((student) =>  {
      const firstName = student.first_name.toLowerCase();
      const lastName = student.last_name.toLowerCase();
      const fullName = `${firstName} ${lastName}`;
      return firstName.includes(name) || lastName.includes(name) || fullName.includes(name);
    }));
  };

  const data = currentStudents.map((student) => {
    return {
      key: student.student_id,
      name: `${student.first_name} ${student.last_name}`,
      course: student.course_name,
      units: "Units",
      assignments: (
        <Square 
          squareColor={ () => {
            const studentWeeklyProgress = Math.floor(student.student_weekly_progresses.reduce((acc, progress) => (
              (acc + progress.assignment_progress)
            ), 0) / student.student_weekly_progresses.length);
            return (
              studentWeeklyProgress === 3 ? "#0f0" : 
              studentWeeklyProgress === 2 ? "#fc0" : "#f00" 
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
              studentWeeklyProgress > 0 ? "#fc0" : "#f00" 
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
              studentWeeklyProgress === 2 ? "#fc0" : "#f00" 
            ) 
          }}
        />
      ),
      children: [
        {
          key: 112,
          units: 'Web Basics 1',
          assignments: <Square squareColor="#f00" />,
          githubLink: <Square squareColor="#f00" />,
          status: <Square squareColor="#f00" />,
          children: [
            {
              key: 123,
              units: "Week 1",
              assignments: <Square squareColor="#f00" />,
              githubLink: "https://www.github.com/assignment1",
              status: <Square squareColor="#f00" />,
            },
            {
              key: 124,
              units: "Week 2",
              assignments: <Square squareColor="#f00" />,
              githubLink: "https://www.github.com/assignment2",
              status: <Square squareColor="#f00" />,
            }
          ]
        },
        {
          key: 113,
          units: 'Web Basics 2',
          assignments: <Square squareColor="#f00" />,
          githubLink: <Square squareColor="#f00" />,
          status: <Square squareColor="#f00" />,
          children: [
            {
              key: 125,
              units: "Week 3",
              assignments: <Square squareColor="#f00" />,
              githubLink: "https://www.github.com/assignment3",
              status: <Square squareColor="#f00" />,
            },
            {
              key: 126,
              units: "Week 4",
              assignments: <Square squareColor="#f00" />,
              githubLink: "https://www.github.com/assignment4",
              status: <Square squareColor="#f00" />,
            }
          ]
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
    {
      title: 'Units',
      dataIndex: 'units',
      key: 'units',
      ellipsis: true,
    },
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
            <Search placeholder="Search Student" onSearch={onSearch} enterButton /> 
            {
              temporarySearch && (
                <div>
                  <br/>
                  <p>
                    { temporarySearch }&nbsp;
                    <Button 
                      type="danger" 
                      shape="circle"
                      onClick={ () => {
                        setTemporarySearch("") 
                        setCurrentStudents(students);
                      }}
                    >
                      x
                    </Button>
                  </p>         
                </div>
              )
            }
          </Col>
        </Row>
        <Row justify="end">
          <Col span={3}>
            <SquareDescription>Complete</SquareDescription> 
            <Square squareColor="#0f0"/>
          </Col>
          <Col span={3}>
            <SquareDescription>In Progress</SquareDescription> 
            <Square squareColor="#fc0" />
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
        expandIconColumnIndex={2}
        // expandable={{
        //   expandedRowRender: () => <p style={{ margin: 0 }}>Hello</p>,
        //   rowExpandable: record => record.name !== 'Not Expandable',
        // }}
      />
    </DivMargin>
  );
};

export default TrackingReport;
