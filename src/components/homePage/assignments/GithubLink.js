import React from 'react';
import { Form, Input, Button } from 'antd';

import { StyledDivGithub } from './styles';

const GithubLink = ({ lesson }) => {
  const onFinish = (values) => {
    console.log('Success:', values);
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
          name="link"
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