/** @format */

import React, { useState, useRef, useEffect, useContext } from "react";
import {
    Card,
    Row,
    Col,
    Space,
    Descriptions,
    Typography,
    Button,
    Input,
    Form,
    Tooltip,
    Checkbox,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import LoadPic from "./LoadPic";
import UserContext from "../../../contexts/UserContext";
import { StyledDivSummary } from "../../assignments/styles";

const { Text, Paragraph } = Typography;
const color = "volcano";
{
    /*tooltip color*/
}

const AO2 = () => {
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [authToken, setAuthToken, userInfo, setUserInfo] = useContext(UserContext);
    const [size, setSize] = useState("large");
    const color = "volcano";
    {
        /*tooltip color*/
    }

    const onFinish = async (values) => {
        console.log("Success:", values);
        setUserInfo((prevState) => {
            return { ...prevState, values };
        });
        const response = await fetch(
            "https://forked-student-dashboard.herokuapp.com/students",
            {
                method: "PUT",
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authToken,
                },
                body: JSON.stringify(values),
            }
        );
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    // useEffect(()=>{
    // console.log(userInfo.student.last_name, "happy")

    // },[])
    //     const editButton = () => {
    //     setIsInEditMode(true);

    //     console.log('change');
    // };
    return (
        <>
            <Card>
                <Typography.Title level={4}>
                    Profile
                    <Tooltip
                        color={color}
                        title="edit your name and picture"
                        placement="rightTop">
                        <EditOutlined style={{ fontSize: 12 }} />
                    </Tooltip>
                </Typography.Title>
                <Row>
                    <Space size={size}>
                        <Col>
                            <LoadPic />
                        </Col>
                        {/* need a left border vertical here */}
                        <Col>
                            {/* id feeds in from the database need an api call */}
                            <Text strong>ID:{userInfo.id}</Text>
                            <Form
                                layout="inline"
                                name="basic"
                                initialValues={{
                                    last_name: userInfo.student.last_name,
                                    first_name: userInfo.student.first_name,
                                    course_name:
                                        userInfo.student.student_course.course
                                            .course_name,
                                    email: userInfo.email,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}>
                                <Form.Item
                                    label={<strong>Last Name</strong>}
                                    name="last_name"
                                    // rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input bordered={false} />
                                </Form.Item>
                                <Form.Item
                                    name="course_name"
                                    label={<strong>Class</strong>}
                                    // rules={[ { required: true, },]}
                                    // hidden={true}
                                >
                                    <Input bordered={false} />
                                </Form.Item>

                                <Form.Item
                                    label={<strong>First Name</strong>}
                                    name="first_name"
                                    // rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input bordered={false} />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    label={<strong>Email</strong>}
                                    // rules={[ { required: true, },]}
                                    // hidden={true}
                                >
                                    <Input bordered={false} />
                                </Form.Item>

                                <StyledDivSummary>
                                    <Button type="primary" htmlType="submit">
                                        Edit
                                    </Button>
                                </StyledDivSummary>
                            </Form>
                        </Col>
                    </Space>
                </Row>
            </Card>
        </>
    );
};

export default AO2;
