import React, { useEffect, useState } from 'react';
import { Select, DatePicker, Steps } from 'antd';
import { Link, Switch } from "react-router-dom";

import _ from "lodash";
import {
  FileDoneOutlined,
  YoutubeOutlined,
  GithubOutlined,
  SmileOutlined,
} from "@ant-design/icons";

import * as ROUTES from "../../../../constants/routes";
import PrivateRoute from '../../../routes/PrivateRoute';
import CreateInstructions from './createInstructions/CreateInstructions';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Step } = Steps;

const CreateAssignments = ({ match }) => {
  const [stepStatus, setStepStatus] = useState({})
  // const [stepStatus, setStepStatus] = useState([])
  const [current, setCurrent] = useState(-1);
  const [step, setStep] = useState(-1);
  const [info, setInfo] = useState();
  const [courses, setCourse] = useState();
  const [units, setUnits] = useState();
  const [lessons, setLessons] = useState();
  const [dueDate, setDueDate] = useState();

  const steps = [
    {
      title: "Instructions",
      link: `${match.path}${ROUTES.INSTRUCTIONS}`,
      icon: <FileDoneOutlined />,
    },
    {
      title: "Resources",
      link: `${match.path}${ROUTES.VIDEOS}`,
      icon: <YoutubeOutlined />,
    },
    {
      title: "Github Link",
      link: `${match.path}${ROUTES.SUBMISSION}`,
      icon: <GithubOutlined />,
    },
    {
      title: "Done",
      link: `${match.path}${ROUTES.DONE}`,
      icon: <SmileOutlined />,
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(process.env.REACT_APP_GET_STAFF_ASSIGNMENTS);
      const data = await res.json();
      setInfo(data);
    }

    getData();
  }, [])

  console.log(info)

  const handleCourseChange = (course) => {
    setCourse(course);
    setUnits(info[course].units)
  }

  const handleUnitChange = (unit) => {
    setLessons(units[unit].weeks);
  }

  const handleLessonChange = (lesson) => {
    console.log(`selected ${lesson}`);
    setDueDate(lessons[lesson])
  }

  return (
    <>
      <h4><strong>Assignments</strong></h4>
      <Select defaultValue="Choose Course" style={{ width: 120 }} onChange={handleCourseChange} loading={info ? false : true}>
        {
          info ? info.map((course, index) => {
            return (
              <Option key={course.course_name} value={index}>{course.course_name}</Option>
            )
          })
            : null
        }
      </Select>
      <Select defaultValue="Choose Unit" style={{ width: 120 }} onChange={handleUnitChange} disabled={units ? false : true}>
        {
          units ? units.map((unit, index) => {
            return (
              <Option key={unit.unit_name} value={index}>{unit.unit_name}</Option>
            )
          }) : null
        }
      </Select>
      <Select defaultValue="Choose Week" style={{ width: 120 }} onChange={handleLessonChange} disabled={lessons ? false : true}>
        {
          lessons ? lessons.map((week, index) => {
            return (
              <Option key={`${index}.${week.lesson.lesson_name}`} value={index}>{week.lesson.lesson_name}</Option>
            )
          }) : null
        }
      </Select>
      <RangePicker disabled={dueDate ? false : true} />
      <Steps current={current}>
        {steps.map((item, index) => (
          index === 3 ?
            <Step
              id={index}
              key={item.title}
              status={stepStatus[2] === 2 ? 'finish' : null}
              title={stepStatus[2] === 2 ?
                <Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link> :
                item.title
              }
              icon={index !== 3 ? null : <SmileOutlined />}
            /> :
            <Step
              id={index}
              key={item.title}
              status={stepStatus[index] === 2 ? 'finish' : null}
              title={<Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link>}
              icon={index !== 3 ? null : <SmileOutlined />}
            />
        ))}
        {/* {!_.isEmpty(stepStatus) ? steps.map((item, index) => (
          index === 3 ?
            <Step
              id={index}
              key={item.title}
              status={stepStatus[2] === 2 ? 'finish' : null}
              title={stepStatus[2] === 2 ?
                <Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link> :
                item.title
              }
              icon={index !== 3 ? null : <SmileOutlined />}
            /> :
            <Step
              id={index}
              key={item.title}
              status={stepStatus[index] === 2 ? 'finish' : null}
              title={<Link to={item.link} style={{ color: "inherit" }}>{item.title}</Link>}
              icon={index !== 3 ? null : <SmileOutlined />}
            />
        )) : null} */}
      </Steps>
      <Switch>
        <PrivateRoute
          path={`${match.path}${ROUTES.ASSIGNMENTS}${ROUTES.INSTRUCTIONS}`}
          component={CreateInstructions}
        />
      </Switch>

    </>
  )
}

export default CreateAssignments;