import React, { useState, useContext, useEffect } from "react";
import MultiPurposeModal from "../../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import { Input, Row, Col, Table, Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import UserContext from "../../../../contexts/UserContext";
// import TextEditor from '../../../textEditor/TextEditor';

const LessonsUnit = ({ unit }) => {
  const [lessonsToAdd, setLessonsToAdd] = useState([]);
  //const [currentUnits, setCurrentUnits] = useState({});

  useEffect(() => {
    const lessons = {};
    unit.lessons.forEach((lesson) => (lessons[lesson.lesson_name] = true));

    fetch(process.env.REACT_APP_GET_LESSONS)
      .then((response) => response.json())
      .then((data) => {
        setLessonsToAdd(
          data.lessons.filter((lesson) => !(lesson.lesson_name in lessons))
        );
      })
      .catch(console.error);
  }, [unit]);

 const handleAdd = (event) => {
// event.preventDefault();
// setLessonsToAdd = lessonsToAdd.filter (item = item.id != event.target.id)
  }

  const menu = (
    <Menu onClick={handleAdd}>
     {lessonsToAdd.map((lesson) => (
        <Menu.Item key={lesson.id}>
          <Row>
            <Col span={44}>
            <p>{lesson.lesson_name}</p>
            </Col>
         <Col span={1}>
         <MultiPurposeModal
            //handleOk={}
            typeModal="Add"
          >
            {`Are you sure you want to add "${lesson.lesson_name}" to ${unit.unit_name}?`}
          </MultiPurposeModal>
         </Col>
          </Row>
          
          
        </Menu.Item>
      ))}
    </Menu>
  );

  const columns = [
    {
      title: <strong>Lesson Name</strong>,
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: "50%",
    },
    
    {
      title: "",
      dataIndex: "deleteLesson",
      key: "deleteLesson",
      ellipsis: true,
      // width: "13%"
    },
  ];

  
   const data = unit.lessons.map((lesson) => {
    return {
       key: lesson.id,
       name: lesson.lesson_name,
     
      deleteLesson: <Button danger>Delete Lesson</Button>,
    };
  });
  

  console.log(unit.lessons);

  return (
    <MultiPurposeModal
      // handleOk={ (event) => handleEdit(event) }
      addTitle={`Lessons of ${unit.unit_name}`}
      typeModal="Lessons"
      width={200}
    >
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Add Lesson
          <DownOutlined />
        </a>
      </Dropdown>

      <Table
        columns={columns}
        dataSource={data}
        scroll={{ y: 600 }}
        expandIconColumnIndex={2}
      />
    </MultiPurposeModal>
  );
};

export default LessonsUnit;
