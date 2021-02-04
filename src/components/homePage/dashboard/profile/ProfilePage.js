import React, {useEffect } from 'react';
import { Card, Row, Col, Space } from 'antd';
import ChangePass from './ChangePass';
import Students from '../../../staff/Students';
import AO3 from './AO3';

import TodoList from "../studentDashboard/todoList/TodoList";
import SmallCalendar from "../studentDashboard/smallCalendar/SmallCalendar";



const ProfilePage = ()=>{
    
    
    return(
        
        <div> 
          <Row gutter={[16, 24]}>
         <Col xs={24} sm={24} md={24} lg={14} xl={16} xxl={18}>
          <Space direction="vertical">
                <AO3 />
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
                    
                />
            </Space>
        </Col>
    </Row>
      
        </div>
    )
};
// }

export default ProfilePage