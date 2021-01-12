import React, { useState, useContext } from 'react';
import { Menu, Row, Col, Avatar, Layout } from "antd";
import { Link } from "react-router-dom";

import {
  DashboardOutlined,
  NotificationOutlined,
  BookOutlined,
  CalendarOutlined,
  TeamOutlined,
  UserOutlined,
  DisconnectOutlined,
  FundProjectionScreenOutlined,
  SlackOutlined,
  YoutubeOutlined,
  RocketOutlined,
} from "@ant-design/icons";

import * as ROUTES from "../../../constants/routes";
import UserContext from '../../contexts/UserContext';


const { Sider } = Layout;
const { SubMenu } = Menu;


const SiderMenu = ({ match, keys, setSelectedKey, selectedKey }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, dispatchUser] = useContext(UserContext);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  console.log(userInfo)
  return (
    <Sider
      style={{ backgroundColor: "#12284C" }}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      breakpoint="md"
      collapsedWidth="0"
    >
      <Row type="flex">
        <Col span={24} align="center">
          <div className="username" style={{ paddingTop: "30px" }}>
            <Col span={24} align="center">
              <Avatar
                src={userInfo.length ? userInfo[0].Picture[0].thumbnails.large.url : null} //needs a loop to go through users?
                size={{
                  xs: 32,
                  sm: 40,
                  md: 40,
                  lg: 64,
                  xl: 80,
                  xxl: 80,
                }}
                // icon={<UserOutlined />}
              />
            </Col>
          </div>
        </Col>
        <Col span={24} align="center">
          <div className="username" style={{ paddingBottom: "30px" }}>
            {userInfo.length ? userInfo[0].Name : null}
            </div>
        </Col>
      </Row>
      <Menu
        theme="dark"
        style={{ backgroundColor: "#12284C" }}
        defaultSelectedKeys={selectedKey}
        mode="inline"
        selectedKeys={selectedKey}
        onClick={({ key }) => setSelectedKey(key)}>
        <Menu.Item key={keys[0]} icon={<DashboardOutlined />}>
          <Link to={`${match.path}${ROUTES.DASHBOARD}`}>
            Dashboard
                        </Link>
        </Menu.Item>
        <Menu.Item key={keys[1]} icon={<NotificationOutlined />}>
          News
                    </Menu.Item>
        <Menu.Item key={keys[2]} icon={<BookOutlined />}>
          <Link to={`${match.path}${ROUTES.ASSIGNMENTS}`}>
            Assignments
                        </Link>
        </Menu.Item>
        <Menu.Item key={keys[3]} icon={<CalendarOutlined />}>
          <Link to={`${match.path}${ROUTES.CALENDAR}`}>Calendar</Link>
        </Menu.Item>
        <Menu.Item key={keys[4]} icon={<UserOutlined />}>
          Mentors
                    </Menu.Item>
        <Menu.Item key={keys[5]} icon={<TeamOutlined />}>
          Classmates
                    </Menu.Item>
        <Menu.Item key={keys[6]} icon={<DisconnectOutlined />}>
          CTD
                    </Menu.Item>
        <SubMenu
          key="sub1"
          icon={<FundProjectionScreenOutlined />}
          title="Resources">
          <Menu.Item key={keys[7]} icon={<SlackOutlined />}>
            Slack Channel
                        </Menu.Item>
          <Menu.Item key={keys[8]} icon={<YoutubeOutlined />}>
            Treehouse
                        </Menu.Item>
        </SubMenu>
        <Menu.Item key={keys[9]} icon={<RocketOutlined />}>
          Students Projects
                    </Menu.Item>
      </Menu>
    </Sider>
  )
}

export default SiderMenu;