import React from 'react';
import { Layout, Button} from 'antd';
import { CustomerServiceOutlined, CommentOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../index.css';


const {Content}=Layout
function Quick(){
  return(
    <div className="lower @shadow-2">
      <Content className ="d-flex justify-content-around">
        <div>
          <div className="d-flex pt-4">
            <CustomerServiceOutlined className="quick-icon"/>
            <h5 className="pl-3">Need Help?</h5>
          </div>
          <p className="pad pt-1"><a href="https://www.codethedream.org/contact-us/">Contact the CTD staff <br/> for assistance</a></p>
        </div>

        <div className="divider"></div>

        <div>
        <div className="d-flex pt-4">
          <CommentOutlined  className="quick-icon"/>
          <h5 className="pl-3">One on One Mentor <br/> Sessions</h5>
        </div>
        <p className="pad">Find an avaiable mentor here </p>
        <Button type="primary" onClick={this.props.showModal}>
          Open Modal
        </Button>
        </div>

      </Content>

    </div>

  )
}





export default Quick
