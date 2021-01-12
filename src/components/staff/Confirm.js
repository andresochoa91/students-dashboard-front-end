import React from 'react';
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const Confirms = () => {
function showConfirm() {
  confirm({
    title: 'Delete Student(s)',
    icon: <ExclamationCircleOutlined />,
    content: 'Are you sure you want to remove this student from the class?',
    okText: 'Remove',
    
    onOk() {//in here put the function when button is clicked
      
      console.log('Ok');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}
return (

    // <Space>
    <Button danger onClick={showConfirm}>Delete</Button>
    // </Space>

)

}

export default Confirms