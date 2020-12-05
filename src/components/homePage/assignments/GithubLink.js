import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
const layout = {
  labelCol: {
    span: 16,
  },
  wrapperCol: {
    span: 16,
  },
};

const GithubLink = ({ lesson }) => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div>
      <h4><strong>Assignment</strong></h4>
      <h4>Your assignment for this week can be found <a href={lesson.assignment.link} target="_blank">here</a></h4>
      <Form name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item>
          <h3><strong>Github Link</strong></h3>
        </Form.Item>
        <Form.Item
          name="link"
          rules={[
            {
              required: true,
              message: 'Please add your github link!',
            },
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
    </div>
  )
}

export default GithubLink;