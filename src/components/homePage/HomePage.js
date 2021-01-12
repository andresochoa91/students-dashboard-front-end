import React, { useEffect, useState } from "react";
import { Layout } from 'antd';

import "./HomePage.css";
import SiderMenu from './siderMenu/SiderMenu';
import FooterHome from './footer/FooterHome';
import HomeContent from './homeContent/HomeContent';
import Breadcrumbs from './breadcrumbs/BreadCrumbs';
import HomePageHeader from './homePageHeader/HomePageHeader';

const HomePage = ({ match, history }) => {
    const KEYS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const [selectedKey, setSelectedKey] = useState([KEYS[0]]);
    const page = `${history.location.pathname
        .split("/")[2]
        .charAt(0)
        .toUpperCase()}${history.location.pathname.split("/")[2].slice(1)}`;

    useEffect(() => {
        switch (page) {
            case "Dashboard":
                return setSelectedKey(KEYS[0]);
            case "News":
                return setSelectedKey(KEYS[1]);
            case "Assignments":
                return setSelectedKey(KEYS[2]);
            case "Calendar":
                return setSelectedKey(KEYS[3]);
            case "Mentors":
                return setSelectedKey(KEYS[4]);
            case "Classmates":
                return setSelectedKey(KEYS[5]);
            case "CTD":
                return setSelectedKey(KEYS[6]);
            case "Slack_Channel":
                return setSelectedKey(KEYS[7]);
            case "Treehouse":
                return setSelectedKey(KEYS[8]);
            case "Projects":
                return setSelectedKey(KEYS[9]);
            default:
                return new Error();
        }
    }, []);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SiderMenu match={match} keys={KEYS} selectedKey={selectedKey} setSelectedKey={setSelectedKey} />
            <div className="container-fluid">
                <Layout className="site-layout">
                    <HomePageHeader match={match} history={history} />
                    <Breadcrumbs page={page} match={match} keys={KEYS} setSelectedKey={setSelectedKey} />
                    <HomeContent keys={KEYS} selectedKey={selectedKey} setSelectedKey={setSelectedKey} match={match} history={history} />
                    <FooterHome />
                </Layout>
            </div>
        </Layout>
    );
};

export default HomePage;
