import React from "react";
import { Row, Col, Space } from "antd";
import MentorsHeader from "../mentorsHeader/MentorsHeader";
import MentorsTable from "../mentorsTable/MentorsTable";

const MentorsOnStaff = () => {
  return (
    <div className="container-fluid">
      <Row gutter={[16, 24]}>
        <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
          <Space direction="vertical">
            <MentorsHeader />
            <MentorsTable />
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
        ></Col>
      </Row>
    </div>
  );
};

export default MentorsOnStaff;
