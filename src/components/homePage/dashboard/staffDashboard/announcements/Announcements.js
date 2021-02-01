import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { NotificationOutlined } from "@ant-design/icons";

const Announcements = () => {
  const AnnouncementsButton = styled.button`
    color: #12284c;
    border-style: none;
    font-size: 1.2em;
    margin: 0 auto;
    padding: 16%;
    background: #fb5100;
    border-radius: 6px;
    width: 300px;
    text-align: center;
    display: block;

    a {
      color: #12284c;
    }
    &:hover {
      background-color: #f1f1f2;
      color: #ff5c35;
      border: 1px solid #c0c0c0;
    }
  `;

  return (
    <>
      <AnnouncementsButton>
        <Typography.Title level={4} className="left">
          <NotificationOutlined /> Announcements
        </Typography.Title>
        Announce somenthing
      </AnnouncementsButton>
    </>
  );
};
export default Announcements;
