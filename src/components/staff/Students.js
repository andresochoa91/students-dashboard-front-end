import React, { useState } from 'react';
import { Tabs, Input, Row, Col, Button, Modal, Table, Dropdown, Menu, Checkbox, Form, Space} from 'antd';
import { PlusOutlined, FolderAddOutlined, DownOutlined } from '@ant-design/icons';
import Confirm from "./Confirm";
import Move from "./Move";
import Edit from "./Edit";
import StudentTable from './StudentTable'





 //table headings
 const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      editable: true,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Course',
      dataIndex: 'course',
    },

    {
    title: 'Actions',
    render: () => (<Dropdown overlay={menu} trigger={['click']}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Actions <DownOutlined />
    </a>
  </Dropdown>),
    
    },

    
  ];

  //for dropdown
  const menu = (
  <Menu>
    <Menu.Item key="0"> <Edit /> </Menu.Item> 
        {/* may not need the edit */}
    <Menu.Item key="1"> <Move /></Menu.Item>
    <Menu.Item key="2"><Confirm /></Menu.Item> 
  </Menu>
  );

  //for dropdown in modal
  const menuB = (
    <Menu>
        <Menu.Item key="0">
        <Checkbox onChange={onChange}>Pirana</Checkbox>
        </Menu.Item>
        <Menu.Item key="1">
        <Checkbox onChange={onChange}>High Noon</Checkbox>
        </Menu.Item>
        <Menu.Item key="2">
        <Checkbox onChange={onChange}>Catarina</Checkbox>
        </Menu.Item>
        <Menu.Item key="3">
        <Checkbox onChange={onChange}>Phoenix</Checkbox>
       </Menu.Item>

    </Menu>
  );
    //checkbox in menuB
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
      }

//datasource here or diff file? need to connect to airtable
const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
    key: i,
    name: `Edward King ${i}`,
    id: `${i}`,
    email: `London, Park Lane no. ${i}`,
    course: 'sunrise',
    });
};

    //for form inside modal
        const onFinish = (values) => {
          console.log(values);
        };
    

    //form layout in modal(could this go into styles file?)
    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 14,
        },
      };

     
      
const Students = (props) => {
    const { TabPane } = Tabs;
    //for input
    const { Search } = Input;
    const onSearch = value => console.log(value);

    //modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
//MF: need to add process logic not just close modal
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    //table 
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Check here to configure the default column
    const [loading, setLoading] = useState(false);
//    const [hasSelected, setHasSelected] = useState(false)

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
          setSelectedRowKeys([]);
          setLoading(false)
        }, 1000);
    };

    // const onSelectChange = (selectedRowKeys, selectedRows) => {
    //   'selectedRowKeys changed: ';
    //     setSelectedRowKeys([]);
       
    // };
    // console.log(selectedRowKeys)
    //MF: not selecting 
    const rowSelection = {
        // selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          
    };

    const hasSelected = selectedRowKeys.length > 0;
      console.log(rowSelection);
      
      //props passed to confirm.js
      const {
          deleteRow,
      }= props
     
    return(
        
        
        <div>
            <div className="card-container">
                <Tabs type="card">
                    <TabPane tab="Students" key="4">
                        <Row gutter={[16, 16]}>
                            <Col span={8}>
                                <h3 style={{fontWeight: "bold"}}>Students in this course</h3>
                                <Search
                                placeholder="input search text"
                                allowClear
                                onSearch={onSearch}
                                style={{ width: 200, margin: '0' }}
                            />
                            </Col>
                            
                            <Col span={16} >
                             
                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <p>Add Student</p>
                                    <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={showModal} />
                                    <p>Track Students</p>
                                    <Button type="primary" shape="circle" icon={<FolderAddOutlined />} />              
                                </div>
                                
                            </Col>
                           
                        </Row>
                        
                        {/* <Row>
                           
                        </Row> */}

                        {/* Modal to add Student */}
                        <Modal title="Add student to course" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okText="Add"  width={700}>
                            <Dropdown overlay={menuB}>
                                <Button>
                                    Choose Course <DownOutlined />
                                </Button>
                            </Dropdown>
                            <Form {...layout} name="nest-messages" onFinish={onFinish} >
                                <Form.Item
                                    name={['user', 'name']}
                                    label="Name"
                                    rules={[
                                    {
                                        required: true,
                                    },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name={['user', 'email']}
                                    label="Email"
                                    rules={[
                                    {
                                        type: 'email',
                                    },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                           </Form>
                        </Modal>
                    </TabPane>
                </Tabs>
             <br />   
            </div>
                <div style={{ marginBottom: 16 }}>
                    <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                        Reload
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                 </div>
                
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} deleteRow={deleteRow} />
{/* 
            <StudentTable /> */}
        </div>
       
    )
};


export default Students