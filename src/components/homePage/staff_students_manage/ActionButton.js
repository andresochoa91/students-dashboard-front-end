import React, {useState, useEffect} from "react";
import { Table, Form, Input, Button,  Menu, Dropdown, Row, Col, Modal, Checkbox} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from "styled-components";


const ActionButton = ({students, selectedStudents, courses}) => {

    const initialStudent = {
        name: '',
        email: '',
        id: '',
        enrolled: '',
    }

    const [isAddVisible, setIsAddVisible] = useState(false);
    const [isMoveVisible, setIsMoveVisible] = useState(false);
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [isDeleteVisible, setIsDeleteVisible] = useState(false);

    const [studentEdit, setStudentEdit] = useState(initialStudent);

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

    const onFinish = (fieldsValue: any) => {
        // Should format date value before submit.
        const values = {
          ...fieldsValue,
        };
        console.log('Received values of form: ', values);
    };

    // Dropdawn menu
    const menuEdit = (
        <Menu>
        <Menu.Item key="0" onClick={handleAdd}>
            Add to Course
        </Menu.Item>
        <Menu.Item key="1" onClick={handleEdit}>
            Edit
        </Menu.Item>
        <Menu.Item key="2" onClick={handleMove}>
            Move
        </Menu.Item>
        <Menu.Item key="3" onClick={handleDelete}>
            Delete
        </Menu.Item>
        </Menu>
    );

    // Dropdawn menu
    const menu = (
        <Menu>
            {courses.map( course => (
                <Menu.Item key={course.id} >
                    <Checkbox onChange={onChange}>{course.course_name}</Checkbox>
                </Menu.Item>
            ))
            }
        </Menu>
    );

    // function handleMenuClick(e) {
    //     console.log('click', e);
    // }

    // function handleEdit(e) {
    //     console.log('click', e);
    //     setIsEditVisible(true);
    // }

    const getStudentInfo = () => {
        students.map( student => {
            if (student.student_id === selectedStudents[0]) {
                setStudentEdit({
                    name: student.first_name + ' ' + student.last_name,
                    email: student.user.email,
                    id: student.student_id,
                    enrolled: student.enrolled,
                })
            }
        });
    };


    
    console.log(studentEdit)

    //add 
    function handleAdd(e) {
        console.log('click', e);
        setIsAddVisible(true);
    }
    const handleAddOk = () => {
        setIsAddVisible(false);
    };
    const handleAddCancel = () => {
        setIsAddVisible(false);
    };

    //edit

    function getFirstLastName(e) {
        setStudentEdit({
            ...studentEdit,
            name: e.target.value
        })
    }

    function getEmail(e) {
        setStudentEdit({
            ...studentEdit,
            email: e.target.value
        })
    }

    function handleEdit(e) {
        setIsEditVisible(true);
        getStudentInfo();
    }
    const handleEditOk = () => {
        setIsEditVisible(false);
        //get changed first and last name
        var first_name= studentEdit.name.split(' ', 1)[0];
        var last_name= studentEdit.name.split(' ')[1];
        console.log(first_name);
        console.log(last_name);
        //get changed Email
        var email= studentEdit.email;
        console.log(email);

        fetch(`https://forked-student-dashboard.herokuapp.com/students/${studentEdit.id}`, {
            method: 'PUT',
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                enrolled: studentEdit.enrolled,
            }) 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // setStudentAdded(true);
            //cleans input fields 
            studentEdit(initialStudent);
        })
        .catch(err => console.error(err));
    };
    const handleEditCancel = () => {
        setIsEditVisible(false);
    };

    //move
    function handleMove(e) {
        setIsMoveVisible(true);
    }
    const handleMoveOk = () => {
        setIsMoveVisible(false);
    };
    const handleMoveCancel = () => {
        setIsMoveVisible(false);
    };

    //delete
    function handleDelete(e) {
        setIsDeleteVisible(true);
    }
    const handleDeleteOk = () => {
        setIsDeleteVisible(false);
    };
    const handleDeleteCancel = () => {
        setIsDeleteVisible(false);
    };

    //checkbox
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    return ( 
        <>
            <Dropdown overlay={menuEdit} trigger={['click']} >
                <Button type="primary" onClick={e => e.preventDefault()}> 
                    Actions <DownOutlined />
                </Button> 
            </Dropdown>
            
            <Modal width={400} 
                title="Add Student to Course" 
                visible={isAddVisible} 
                onOk={handleAddOk} 
                onCancel={handleAddCancel} 
                okText='Add'
            >
                 <Row>
                    <Col>
                        <Dropdown overlay={menu} trigger={['click']} >
                        <Button onClick={e => e.preventDefault()}> 
                        Choose Course <DownOutlined />
                        </Button> 
                        </Dropdown>
                    </Col>
                </Row>
            </Modal>
            
            <Modal width={400} 
                title="Move Student(s) from Course" 
                visible={isMoveVisible} 
                onOk={handleMoveOk} 
                onCancel={handleMoveCancel} 
                okText='Move'
            >
                 <Row>
                    <Col>
                        <Dropdown overlay={menu} trigger={['click']} >
                        <Button onClick={e => e.preventDefault()}> 
                        Choose Course <DownOutlined />
                        </Button> 
                        </Dropdown>
                    </Col>
                </Row>
            </Modal>

            <Modal 
                width={700}
                title="Edit Student" 
                visible={isEditVisible} 
                onOk={handleEditOk} 
                onCancel={handleEditCancel}
                okText="Add"
                cancelText="Cancel"
            >
                <Form 
                    {...layout} 
                    // name="nest-messages" 
                    validateMessages={validateMessages}
                    // onFinish={onFinish}
                >
                    {/* <Form.Item style={{margin: '50px'}} rules={[{ required: true }]}>
                        <Dropdown overlay={menu} trigger={['click']} >
                            <Button onClick={e => e.preventDefault()}> 
                                Choose Course <DownOutlined />
                            </Button> 
                        </Dropdown>
                    </Form.Item> */}

                    <Form.Item label="Name" rules={[{ required: true }]}>
                        <Input value={studentEdit.name} onChange={e =>getFirstLastName(e)}/>
                    </Form.Item>
                    <Form.Item label="Email" rules={[{ type: 'email' }]}>
                        <Input value={studentEdit.email} onChange={e =>getEmail(e)}/>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal 
                title="Delete Student(s)" 
                visible={isDeleteVisible} 
                onOk={handleDeleteOk} 
                onCancel={handleDeleteCancel} 
                okText='Remove'
            >
                <p>Are you sure you want to remove this student from the class?</p>
            </Modal>
      </>
    );
}

export default ActionButton;