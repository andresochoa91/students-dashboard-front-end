import React, {useState, useEffect} from "react";
import { Table, Form, Input, Button,  Menu, Dropdown, Row, Col, Modal, Checkbox} from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styled from "styled-components";


const ActionButton = ({students, selectedRowKeys, courses}) => {

    const initialStudent = {
        name: '',
        email: ''
    }

    //Move Modal
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

    const handleOk = () => {
        setIsEditVisible(false);
    };
    
    const handleCancel = () => {
        setIsEditVisible(false);
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

    
    // function handleDelete(e) {
    //     console.log('click', e);
    // }

    const getStudentInfo = () => {
        students.map( student => {
            if (student.student_id === selectedRowKeys[0]) {
                setStudentEdit({
                    name: student.first_name + ' ' + student.last_name,
                    email: student.user.email,
                })
            }
        });
    };


    
    console.log(studentEdit)

    function handleAdd(e) {
        console.log('click', e);
        setIsAddVisible(true);
    }

    function handleMove(e) {
        setIsMoveVisible(true);
    }
    function handleEdit(e) {
        setIsEditVisible(true);
        getStudentInfo();
        
    }
    function handleDelete(e) {
        setIsDeleteVisible(true);
    }
  

    const handleAddOk = () => {
        setIsAddVisible(false);
    };

    const handleMoveOk = () => {
        setIsMoveVisible(false);
    };
    const handleEditOk = () => {
        setIsEditVisible(false);
    };
    const handleDeleteOk = () => {
        setIsDeleteVisible(false);
    };
  
    const handleAddCancel = () => {
        setIsAddVisible(false);
    };

    const handleMoveCancel = () => {
        setIsMoveVisible(false);
    };
    const handleEditCancel = () => {
        setIsEditVisible(false);
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

                    <Form.Item label="Name" rules={[{ required: true }]}>
                        <Input value={studentEdit.name}/>
                    </Form.Item>
                    <Form.Item label="Email" rules={[{ type: 'email' }]}>
                        <Input value={studentEdit.email}/>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal title="Delete Student(s)" visible={isDeleteVisible} onOk={handleDeleteOk} onCancel={handleDeleteCancel} okText='Remove'>
                <p>Are you sure you want to remove this student from the class?</p>
            </Modal>
      </>
    );
}

export default ActionButton;