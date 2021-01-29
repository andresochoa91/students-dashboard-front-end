import React, {useState} from "react";
import { Form, Input, Button,  Menu, Dropdown, Checkbox, Modal} from 'antd';
import { DownOutlined } from '@ant-design/icons';

const ModalStudent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const layout = {
        labelCol: { 
            xs: { span: 4 },
            sm: { span: 4 },
        },
        wrapperCol: { 
            xs: { span: 24 },
            sm: { span: 16 }, 
        },
    };
      
      const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
            number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onFinish = (fieldsValue: any) => {
        // Should format date value before submit.
        const values = {
          ...fieldsValue,
        };
        console.log('Received values of form: ', values);
    };

    //Choose course
    // Dropdawn menu
    const menu = (
        <Menu>
            <Menu.Item key="0" >
                <Checkbox onChange={onChange}>Pirana</Checkbox>
            </Menu.Item>
            <Menu.Item key="1">
                <Checkbox onChange={onChange}>High Noon</Checkbox>
            </Menu.Item>
            <Menu.Item key="3">
                <Checkbox onChange={onChange}>Catarina</Checkbox>
            </Menu.Item>
            <Menu.Item key="4">
                <Checkbox onChange={onChange}>Phoenix</Checkbox>
            </Menu.Item>
        </Menu>
    );

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    return (
        <>
        <Button type="primary" shape="circle" onClick={showModal}> + </Button>
        <Modal 
            width={700}
            title="Add Student" 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
            okText="Add"
            cancelText="Cancel"
        >
            <Form 
                {...layout} 
                name="nest-messages" 
                //  onFinish={onFinish} 
                validateMessages={validateMessages}
                onFinish={onFinish}
            >
                <Form.Item style={{margin: '50px'}} rules={[{ required: true }]}>
                    <Dropdown overlay={menu} trigger={['click']} >
                        <Button onClick={e => e.preventDefault()}> 
                            Choose Course <DownOutlined />
                        </Button> 
                    </Dropdown>
                </Form.Item>

                <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}

export default ModalStudent;