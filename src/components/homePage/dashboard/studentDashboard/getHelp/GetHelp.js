import React from "react";
import { Row, Col, Divider, Card, Typography } from "antd";
import { MessageOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import MentorForm from "../mentorForm/MentorForm";
import { StyledDiv } from "./styles";

const GetHelp = () => {
    return (
        <>
            <Card type="inner" hoverable className="cards-border">
                <Typography.Title level={4} className="left">
                    Quick Links
                </Typography.Title>

                <Row gutter={[16, 16]}>
                    <StyledDiv>
                        <Col span={12} style={{ borderRight: "1px solid #ccc" }}>
                            <Typography.Title level={5} className="left">
                                <CustomerServiceOutlined />
                                Need Help?
                            </Typography.Title>
                            Contact
                            <a
                                href="https://www.codethedream.org/contact-us/"
                                target="_blank">
                                {" "}
                                here{" "}
                            </a>
                            the CTD staff for assistance
                        </Col>

                        <Col span={12} style={{ paddingLeft: 60 }}>
                            <Typography.Title level={5}>
                                <MessageOutlined />
                                Mentor Session
                            </Typography.Title>
                            Schedule a mentor session <MentorForm />
                        </Col>
                    </StyledDiv>
                </Row>
            </Card>
        </>
    );
};

export default GetHelp;
