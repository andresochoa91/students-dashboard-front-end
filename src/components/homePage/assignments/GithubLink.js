import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';

import { StyledDivGithub } from './styles';
import UserContext from "../../contexts/UserContext";

const ASSIGNMENTS = ['instructions_progress', 'resources_progress', 'assignment_progress'];

const GithubLink = ({ steps, setStep, setStepStatus, stepStatus, history, setDisabledState, lesson, progressData, step, clickedUnitKey, clickedLessonKey }) => {
  const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);

  const onFinish = async (values) => {
    const assignment = ASSIGNMENTS[step]
    const id = userInfo.student.student_id;
    const weekNumber = progressData[clickedUnitKey][clickedLessonKey].week;

    const res = await fetch(`${process.env.REACT_APP_UPDATE_PROGRESS}/student_weekly_progress/${id}/week_number/${weekNumber}`, {
      body: JSON.stringify({
        ...values,
        [assignment]: '2'
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    });

    setDisabledState(null);

    setStepStatus({ ...stepStatus, [step]: 2 })
    // Set step to next step
    setStep(step + 1);
    // Go to the next step component
    history.push(`${steps[step + 1].link}`);
  };

  return (
    <StyledDivGithub>
      <h4><strong>Assignment</strong></h4>
      <h4 style={{ marginBottom: '50px' }}>Your assignment for this week can be found <a href={lesson.assignment.link} target="_blank">here</a></h4>
      <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item>
          <h3><strong>Github Link</strong></h3>
        </Form.Item>
        <Form.Item
          name="assignment_submission"
          rules={[
            () => ({
              validator(rule, value) {
                if (!value) {
                  return Promise.reject('Please add your github link!');
                }
                const reg = /^((https?|ftp|smtp):\/\/)?(www.)?github+(\.com)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
                if (reg.test(value)) {
                  return Promise.resolve();
                }

                return Promise.reject('The link is not a github link');
              },
            }),
          ]}
        >
          <Input placeholder="Github link to submit" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
            </Button>
        </Form.Item>
      </Form>
    </StyledDivGithub >
  )
}

export default GithubLink;