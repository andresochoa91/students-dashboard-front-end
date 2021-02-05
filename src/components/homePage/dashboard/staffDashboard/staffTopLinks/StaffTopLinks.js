/** @format */

import React from "react";
import { Row, Col, Space, Card } from "antd";
import styled from "styled-components";
import { UnlockOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import * as ROUTES from '../../../../../constants/routes';
import { Link } from 'react-router-dom';

const StaffTopLinks = ({ match }) => {
    // const Container = styled.div`
    //     width: 100%;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     padding: 15px;
    //     border-radius: 6px;
    //     background-color: white;
    //     height: 160px;
    //     .ant-card {
    //         width: 100%;
    //         display: flex;
    //         justify-content: space-between;
    //         align-items: center;
    //         border: 1px solid red;
    //     }

    //     .ant-card-body {
    //         padding: 0;
    //     }
    // `;

    const ButtonOne = styled.button`
        width: 100%;
        height: 103px;
        border-style: none;
        background: #c8e4ff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        padding: 15px;
        margin: 15px;
    `;

    const ButtonTwo = styled.button`
        width: 100%;
        height: 103px;
        border-style: none;
        background: #ffd95e;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        padding: 15px;
        margin: 15px;
    `;

    const ButtonThree = styled.button`
        width: 100%;
        height: 103px;
        border-style: none;
        background: #1890ff;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 6px;
        padding: 15px;
        margin: 15px;
    `;

    return (
        <>
            <Space direction="vertical">
                <Card type="inner" hoverable className="cards-border">
                    <Row>
                        <Col xs={24} xl={8}>
                            <Link to={`${match.path}${ROUTES.STUDENTS}`}>
                            <ButtonOne>
                                <h3>
                                <strong>
                                    <TeamOutlined /> Students
                                </strong>
                                </h3>
                                Manage & Tracking Report
                            </ButtonOne>
                            </Link>
                        </Col>

                        <Col xs={24} xl={8}>
                            <ButtonTwo>
                                <h3>
                                    {" "}
                                    <strong>
                                        <UserOutlined /> Mentors
                                    </strong>
                                </h3>
                                Manage & Tracking Report
                            </ButtonTwo>
                        </Col>
                        <Col xs={24} xl={8}>
                            <ButtonThree>
                                <h3>
                                    <strong>
                                        <UnlockOutlined /> Staff Admin
                                    </strong>
                                </h3>
                                Manage & Authorization
                            </ButtonThree>
                        </Col>
                    </Row>
                </Card>
            </Space>
        </>
    );
};
export default StaffTopLinks;
