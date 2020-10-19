
import React from 'react'
import { Modal, Button, Form, Input, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../index.css';


// class Login extends React.Component {
//   state = { visible: false };
//
//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };
//
//   handleOk = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };
//
//   handleCancel = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };
//
//   render() {
//     const onFinish = (values) => {
//     //     console.log('Received values of form: ', values);
//        };
//     return (
//       <>
//         // <Button type="primary" onClick={this.showModal}>
//         //   Log In
//         // </Button>
//         // <Modal
//         //   title="Log In"//MF:would the image of the logo go here?
//         //   visible={this.state.visible}
//         //   onOk={this.handleOk}
//         //   onCancel={this.handleCancel}
//         // >
//
//         <Form
//              name="normal_login"
//              className="login-form"
//              initialValues={{
//                remember: true,
//              }}
//              onFinish={onFinish}
//            >
//              <Form.Item
//                name="username"
//                rules={[
//                  {
//                    required: true,
//                    message: 'Please input your Username!',
//                  },
//                ]}
//              >
//                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
//              </Form.Item>
//              <Form.Item
//                name="password"
//                rules={[
//                  {
//                    required: true,
//                    message: 'Please input your Password!',
//                  },
//                ]}
//              >
//                <Input
//                  prefix={<LockOutlined className="site-form-item-icon" />}
//                  type="password"
//                  placeholder="Password"
//                />
//              </Form.Item>
//              <Form.Item>
//                <Form.Item name="remember" valuePropName="checked" noStyle>
//                  <Checkbox>Remember me</Checkbox>
//                </Form.Item>
//
//                <a className="login-form-forgot" href="">
//                  Forgot password
//                </a>
//              </Form.Item>
//
//              <Form.Item>
//                <Button type="primary" htmlType="submit" className="login-form-button">
//                  Log in
//                </Button>
//                Or <a href="">register now!</a>
//              </Form.Item>
//            </Form>
//
//          // </Modal>
//       </>
//     );
//   }
// }
// export default Login

//ReactDOM.render(<App />, mountNode);
// export default Login

// import React from "react";
// import { Form, Input, Button, Checkbox } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = () => {
  const [state, setState] = useState({username: null, password: null})
  const {username, password} = state;
  const onFinish = (values) => {
    setState({values})
  };

  return (
    <div className="col-4 contain">
    <h1 className="text-center pb-4">Welcome!</h1>
    <div className="col-10 mx-auto" Style="width: 350px;">
    <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="password"
          />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button button-hover">
            Login
          </Button>

        </Form.Item>
      </Form>
      </div>
    </div>
  );
};
export default Login

//ReactDOM.render(<Login />, mountNode); MF:normally on the index page but not sure where this would go


/* login */
 .login-form {
  max-width: 300px;
}
 .login-form-forgot {
  float: right;
}
 .ant-col-rtl .login-form-forgot {
  float: left;
}
 .login-form-button {
  width: 100%;
  color: #F1F1F2;
  background-color: #12284C;
  border: none;
  font-family: 'Montserrat', sans-serif;
}
.button-hover:hover{
  background-color: #F1F1F2 ;
  border: 1px, solid, #C0C0C0;
  color: #FF5C35
}
.contain{
  border: solid 2px #F1F1F2;
  border-radius: 5%;
  margin-top: 30%;
  margin-left: 10%;
  padding: 40px;
}
h1,h5 {
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
}

/* quick */

.lower{
margin-top: 40px;
border-radius: 10px;
border: 4px solid #F1F1F2;
width: 800px;
}
.pad{
  padding-left: 2.6rem;
}
.divider{
  border-left: 1px solid #F1F1F2;
  height: 100px;
  position: absolute;
  left: auto;
  margin-left: -3px;
  top: 55px;
}
.quick-icon{
  font-size: 24px;
}
