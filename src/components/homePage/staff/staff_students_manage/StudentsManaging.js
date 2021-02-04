import React, { useEffect } from "react";
import { Row, Col, Space } from "antd";

<<<<<<< HEAD:src/components/homePage/staff_students_manage/StudentsManaging.js
import Announcements from "../dashboard/staffDashboard/announcements/Announcements";
import SmallCalendar from "../dashboard/staffDashboard/smallCalendar/SmallCalendar";
// import HomeButtons from "../dashboard/staffDashboard/homeButtons/HomeButtons"; 

import EventsButton from "../dashboard/staffDashboard/eventsButton/eventsStaffButton";
import MeetingButton from "../dashboard/staffDashboard/meetingButton/meetingButton";

=======

import Announcements from "../../dashboard/staffDashboard/announcements/Announcements";
import SmallCalendar from "../../dashboard/staffDashboard/smallCalendar/SmallCalendar";
import HomeButtons from "../../dashboard/staffDashboard/homeButtons/HomeButtons";
>>>>>>> worked on createAssignments:src/components/homePage/staff/staff_students_manage/StudentsManaging.js
import Students from './Students'

const StudentsManaging = ({ history, menuKey, selectedKey, setSelectedKey }) => {
    const { calendarKey, studentsdKey } = menuKey;

    useEffect(() => {
        setSelectedKey(studentsdKey);
    }, [])

    return (
        <div className="container-fluid">
            <Row gutter={[16, 24]}>
                <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
                    <Students />
                </Col>
                <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={10}
                    xl={8}
                    xxl={6}
                    className="site-layout-right">
                    <Space direction="vertical">
                        <Announcements />
                        {/* <HomeButtons /> */}
                        <EventsButton />
                        <MeetingButton />
                        <SmallCalendar
                            history={history}
                            menuKey={calendarKey}
                            selectedKey={selectedKey}
                            setSelectedKey={setSelectedKey}
                        />
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default StudentsManaging;
