import React, { useContext } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
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

import * as ROUTES from "../../../../constants/routes";
import UserContext from '../../../contexts/UserContext';

const { SubMenu } = Menu;

const StaffSiderMenu = ({ match, keys, setSelectedKey, selectedKey }) => {
  const [authToken] = useContext(UserContext);

  console.log(keys)
  return (
    <Menu
      theme="dark"
      style={{ backgroundColor: "#12284C" }}
      defaultSelectedKeys={selectedKey}
      mode="inline"
      selectedKeys={selectedKey}
      onClick={({ key }) => setSelectedKey(key)}
    >
      {
        authToken ?
          <>
            <Menu.Item key={keys['Dashboard']} icon={<DashboardOutlined />}>
              <Link to={`${match.path}${ROUTES.DASHBOARD}`}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key={keys['Announcements']} icon={<NotificationOutlined />}>
              Announcements
        </Menu.Item>
            <SubMenu
              key="sub1"
              icon={<BookOutlined />}
              title="Classes"
            >
              <Menu.Item key={keys['Courses']} icon={<UserOutlined />}>
                Courses
          </Menu.Item>
              <Menu.Item key={keys['Assignments']} icon={<CalendarOutlined />}>
                Assignments
          </Menu.Item>
            </SubMenu>
            <Menu.Item key={keys['Students']} icon={<TeamOutlined />}>
              <Link to={`${match.path}${ROUTES.STUDENTS}`}>Students</Link>
        </Menu.Item>
            <Menu.Item key={keys['Mentors']} icon={<UserOutlined />}>
              Mentors
        </Menu.Item>
            <Menu.Item key={keys['Calendar']} icon={<CalendarOutlined />}>
              <Link to={`${match.path}${ROUTES.CALENDAR}`}>Calendar</Link>
            </Menu.Item>
            <Menu.Item key={keys['CTD']} icon={<DisconnectOutlined />}>
              CTD
        </Menu.Item>
            <SubMenu
              key="sub2"
              icon={<FundProjectionScreenOutlined />}
              title="Resources"
            >
              <Menu.Item key={keys['Slack_Channel']} icon={<SlackOutlined />}>
                Slack Channel
          </Menu.Item>
              <Menu.Item key={keys['Treehouse']} icon={<YoutubeOutlined />}>
                Treehouse
          </Menu.Item>
            </SubMenu>
            <Menu.Item key={keys['Projects']} icon={<RocketOutlined />}>
              Students Projects
        </Menu.Item>
          </> : null
      }
    </Menu>
  )
}

export default StaffSiderMenu;