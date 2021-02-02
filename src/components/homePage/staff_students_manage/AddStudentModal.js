import React, {useState} from "react";
import { Form, Input, Button,  Menu, Dropdown, Checkbox, Modal} from 'antd';
import { DownOutlined } from '@ant-design/icons';

const ModalStudent = ({courses, setStudentAdded}) => {

    const initialStudent = {
        username: '',
        email: ''
    }

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [studentAdd, setStudentAdd] = useState(initialStudent);
    const [selectedMenuItem, setSelectedMenuItem] = useState([]);
    // const [email, setEmail] = useState('');

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

    const getUsername = (e) => (
        setStudentAdd({
            username: e.target.value.split('@', 1)[0],
            email: e.target.value,
        })
    )
      console.log(studentAdd);

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
    
    const handleOk = (e) => {
        e.preventDefault()
        setIsModalVisible(false);
        
        fetch('https://forked-student-dashboard.herokuapp.com/student_courses/create_student_and_course', {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: studentAdd.username,
                email: studentAdd.email,
                course_id: selectedMenuItem, 
            }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setStudentAdded(true);
        })
        .catch(err => console.error(err));
        
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

    console.log(courses)
    //Choose course
    // Dropdawn menu
    const menu = (
        <Menu onClick={(e) => setSelectedMenuItem(e.key)}
            >
            {courses.map( course => (
                <Menu.Item key={course.id} >
                    <Checkbox 
                        onChange={onChange}
                    >
                        {course.course_name}
                    </Checkbox>
                </Menu.Item>
            ))
            }
        </Menu>
    );

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    console.log(selectedMenuItem);
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
                validateMessages={validateMessages}
                // onFinish={onFinish}
            >
                <Form.Item style={{margin: '50px'}} rules={[{ required: true }]}>
                    <Dropdown overlay={menu} trigger={['click']} >
                        <Button onClick={e => e.preventDefault()}> 
                            Choose Course <DownOutlined />
                        </Button> 
                    </Dropdown>
                </Form.Item>

                {/* <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item> */}
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
                    <Input 
                        onChange={e =>getUsername(e)}
                    />
                </Form.Item>
            </Form>
        </Modal>
        </>
    )
}

export default ModalStudent;