import React, { useState } from 'react';
import { Tabs, Input, Row, Col, Button, Modal, Table, Dropdown, Menu, Checkbox, Form, Popconfirm, Typography, InputNumber,  } from 'antd';
import { PlusOutlined, FolderAddOutlined, DownOutlined } from '@ant-design/icons';
import Confirm from "./Confirm";
import Move from "./Move";
import StyledDiv from './styles'


const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
    key: i.toString(),
    name: `Edward King ${i}`,
    id: `${i}`,
    email: `London, Park Lane no. ${i}`,
    course: 'sunrise',
    });
};

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  

const StudentTable = () =>{


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
//     render: () => (<Dropdown overlay={menu} trigger={['click']}>
//     <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
//       Actions <DownOutlined />
//     </a>
//   </Dropdown>),
    
    },

    {
        title: 'operation',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
          );
        },
    },
  ];
    
      const [form] = Form.useForm();
      const [data, setData] = useState(data);
      const [editingKey, setEditingKey] = useState('');
    
      const isEditing = (record) => record.key === editingKey;
    
      const edit = (record) => {
        form.setFieldsValue({
          name: '',
          age: '',
          address: '',
          ...record,
        });
        setEditingKey(record.key);
      };
    
      const cancel = () => {
        setEditingKey('');
      };
    

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
  
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

    const save = async (key) => {
      try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
  
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...row });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
    return(
        <Form form={form} component={false}>
        <Table 
        components={{
            body: {
              cell: EditableCell,
            },
          }}
         
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
         </Form>

    )
}

export default StudentTable