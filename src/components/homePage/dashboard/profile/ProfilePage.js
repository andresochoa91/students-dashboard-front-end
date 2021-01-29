import React, {useEffect } from 'react';
import { Card, Row, Col, Space } from 'antd';
import AccountOverview from "./AccountOverview";
import ChangePass from './ChangePass';
import Students from '../../../staff/Students';
import AO2 from './AO2';

import TodoList from "../studentDashboard/todoList/TodoList";
import SmallCalendar from "../studentDashboard/smallCalendar/SmallCalendar";



const ProfilePage = ()=>{
    // const Dashboard = ({ history, menuKey, selectedKey, setSelectedKey }) => {
    //     const { calendarKey, dashboardKey } = menuKey;
    
    //     useEffect(() => {
    //         setSelectedKey(dashboardKey);
    //     }, [])
    
    return(
        
        <div> 
          <Row gutter={[16, 24]}>
         <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
          <Space direction="vertical">
                <AO2 />
                <ChangePass />
           </Space>
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
               
                <TodoList />
                <SmallCalendar
                    // history={history}
                />
            </Space>
        </Col>
    </Row>
       <br/>
       <Students />
        </div>
    )
};
// }

export default ProfilePage