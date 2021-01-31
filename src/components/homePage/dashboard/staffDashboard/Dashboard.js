import React, { useEffect } from "react";
import { Row, Col, Space } from "antd";

import SmallCalendar from "./smallCalendar/SmallCalendar";
import HomeButtons from "./homeButtons/HomeButtons";
import StaffTopLinks from "./staffTopLinks/StaffTopLinks";
import CurrentCourses from "./currentCourses/CurrentCourses";
import Announcements from "./announcements/Announcements";

const Dashboard = ({ history, menuKey, selectedKey, setSelectedKey }) => {
  const { calendarKey, dashboardKey } = menuKey;
  console.log(setSelectedKey)
  useEffect(() => {
    setSelectedKey(dashboardKey);
  }, []);

  return (
    <div className="container-fluid">
      <Row gutter={[16, 24]}>
        <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
          <Space direction="vertical">
            <StaffTopLinks />

            <CurrentCourses />
          </Space>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={10}
          xl={8}
          xxl={6}
          className="site-layout-right"
        >
          <Space direction="vertical">
            <Announcements />
            <HomeButtons />
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

export default Dashboard;
