import React, { useState } from 'react';
import { Table } from 'antd';


const TrackingReport = () => {

  const [ sortedInfo, setSortedInfo ] = useState(); 

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
  };

  const data = [
    {
      key: '1',
      name: 'John Brown',
      course: 'High Noon',
      units: '+',
      assignments: 1,
      githubLink: 1,
      status: 1
    },
    {
      key: '2',
      name: 'Jim Green',
      course: 'High Noon',
      units: '+',
      assignments: 1,
      githubLink: 1,
      status: 1
    },
    {
      key: '3',
      name: 'Joe Black',
      course: 'High Noon',
      units: '+',
      assignments: 1,
      githubLink: 1,
      status: 1
    },
    {
      key: '4',
      name: 'Jim Red',
      course: 'High Noon',
      units: '+',
      assignments: 1,
      githubLink: 1,
      status: 1
    },
  ];

  let sI = sortedInfo;
  sI = sortedInfo || {};
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sI.columnKey === 'name' && sI.order,
      ellipsis: true,
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      ellipsis: true,
    },
    {
      title: 'Units',
      dataIndex: 'units',
      key: 'units',
      ellipsis: true,
    },
    {
      title: 'Assignments',
      dataIndex: 'assignments',
      key: 'assignments',
      ellipsis: true,
    },
    {
      title: 'Github Link',
      dataIndex: 'githubLink',
      key: 'githubLink',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
    },
  ];

  return (
    <>
      <Table 
        columns={columns} 
        dataSource={data} 
        onChange={handleChange} 
        expandable={{
          expandedRowRender: () => <p style={{ margin: 0 }}>Hello</p>,
          rowExpandable: record => record.name !== 'Not Expandable',
        }}
      />
    </>
  );
}

export default TrackingReport;
