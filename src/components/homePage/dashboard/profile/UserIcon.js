import { Menu, Dropdown } from 'antd';
import { UserCircle} from '"@styled-icons/boxicons-solid/UserCircle";

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        Profile
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Notifications
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Log Out
      </a>
    </Menu.Item>
   
  </Menu>
);

ReactDOM.render(
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      <UserCircle style={{ width: "25px" }} />
    </a>
  </Dropdown>,
  mountNode,
);