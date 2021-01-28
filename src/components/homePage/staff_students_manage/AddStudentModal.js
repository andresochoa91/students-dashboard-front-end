import React, {useState} from "react";
import { DatePicker, TimePicker, Form, Input, Button,  Menu, Dropdown, Checkbox, Row, Col, Modal} from 'antd';
import { DownOutlined } from '@ant-design/icons';

const ModalStudent = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const layout = {
        labelCol: { 
            xs: { span: 24 },
            sm: { span: 8 },
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

    const config = {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };

    
    const onFinish = (fieldsValue: any) => {
        // Should format date value before submit.
        const values = {
          ...fieldsValue,
          'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
          'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
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

    function handleMenuClick(e) {
        console.log('click', e);
    }

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
        <Row >
        <Col style={{paddingBottom:'20px'}}>
            <Dropdown overlay={menu} trigger={['click']} >
            <Button onClick={e => e.preventDefault()}> 
            Choose Course <DownOutlined />
            </Button> 
            </Dropdown>
        </Col>
        </Row>
        <Row >
            <Col 
                // style={{paddingLeft:'20px'}} 
                xs={{ span: 24, margin:'auto'}}
                sm={{ span: 24, margin:'auto'}}
                md={{ span: 8, paddingLeft:'20px'}}
                lg={{ span: 8, paddingLeft:'20px'}}
                // xs={24}
                // sm={24}
                // md={8}
                // lg={8}
            >

            </Col>
                
            <Col 
                // xs={{ span: 24, margin:'auto'}}
                // sm={{ span: 24, margin:'auto'}}
                // md={{ span: 16, paddingLeft:'20px'}}
                // lg={{ span: 16, paddingLeft:'20px'}}
                style={{paddingRight:'20px'}} 
                xs={24}
                sm={24}
                md={16}
                lg={16}
            >
                <Form 
                    {...layout} 
                    name="nest-messages" 
                    //  onFinish={onFinish} 
                    validateMessages={validateMessages}
                    onFinish={onFinish}
                >
                    <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="date-picker" label="DatePicker" {...config}>
                        <DatePicker />
                    </Form.Item>
                    <Form.Item name="time-picker" label="TimePicker" {...config}>
                        <TimePicker />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        </Modal>
        </>
    )
}

export default ModalStudent;