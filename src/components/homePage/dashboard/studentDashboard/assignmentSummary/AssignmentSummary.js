import React from "react";
import { Link } from "react-router-dom";
import { Space, Card, Button, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

import FrontEnd from "../../../../../graphics/frontEnd.png";
import * as ROUTES from "../../../../../constants/routes";
import { StyledDivSummary, StyledDivBadge } from "../../../assignments/styles";


const AssignmentSummary = ({ setSelectedKey, menuKey }) => {
    console.log(menuKey)
    return (
        <>
            <Space direction="vertical">
                <Card type="inner" hoverable className="cards-border">
                    <Typography.Title level={4}>
                        You are starting Front End 1 Week 1
                    </Typography.Title>
                    <StyledDivBadge>
                        <div>
                            <img src={FrontEnd} alt="" ></img>
                        </div>
                        <br />
                        <div>
                            <Typography.Title level={5}>Summary</Typography.Title>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Proin malesuada feugiat tellus, eu feugiat nisi aliquet
                            in. Donec neque ligula, placerat in sollicitudin at,
                            tempus in nibh. Suspendisse ultrices, massa a laoreet
                            gravida, diam lacus tincidunt est, at congue turpis erat
                            in elit.
                        </div>
                    </StyledDivBadge>
                    <StyledDivSummary>
                        <Link
                            to={`${ROUTES.HOME}${ROUTES.ASSIGNMENTS}`}
                            onClick={() => setSelectedKey(menuKey)}>
                            <Button type="primary" icon={<DownloadOutlined />}>
                                Start the Assignment
                            </Button>
                        </Link>
                    </StyledDivSummary>
                </Card>
            </Space>
        </>
    );
};
export default AssignmentSummary;