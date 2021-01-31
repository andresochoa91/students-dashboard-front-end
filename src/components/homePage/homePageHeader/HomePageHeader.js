import React from 'react';
import { Layout, Row, Col } from "antd";
import { UserCircle } from "@styled-icons/boxicons-solid/UserCircle";
import {
  SettingOutlined,
  BellOutlined
} from "@ant-design/icons";

import {
  HeaderPage,
  Logo,
  TopNav
} from "../styles/styles";
import logo from "../../../graphics/logo.png";

const { Header } = Layout;


const HomePageHeader = () => {
  return (
    <HeaderPage>
      <Header
        className="site-layout-background"
        style={{
          padding: "0",
          backgroundColor: "white",
          width: "100%",
        }}>
        <Row type="flex">
          <Col span={12}>
            <Logo>
              <img
                src={logo}
                className="ctd-logo"
                alt="Code the Dream Logo"></img>
            </Logo>
          </Col>
          <Col span={12} align="right">
            <TopNav className="top-nav">
              <BellOutlined />
              <SettingOutlined />
              <UserCircle style={{ width: "25px" }} />
            </TopNav>
          </Col>
        </Row>
      </Header>
    </HeaderPage>
  )
}

export default HomePageHeader;