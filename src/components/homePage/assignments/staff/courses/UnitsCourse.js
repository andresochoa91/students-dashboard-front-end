import React, { useState, useContext, useEffect } from "react";
import MultiPurposeModal from "../../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import { Input, Table, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
// import UserContext from "../../../../contexts/UserContext";
// import TextEditor from '../../../textEditor/TextEditor';

const UnitsCourse = ({ course }) => {
  const [unitsToAdd, setUnitsToAdd] = useState([]);
  // const [ currentUnits, setCurrentUnits ] = useState({});

  useEffect(() => {
    const units = {};
    course.units.forEach((unit) => (units[unit.unit_name] = true));

    fetch(process.env.REACT_APP_GET_UNITS)
      .then((response) => response.json())
      .then((data) => {
        setUnitsToAdd(data.filter((unit) => !(unit.unit_name in units)));
        //console.log(unitsToAdd);
      })
      .catch(console.error);
  }, [course]);

  const menu = (
    <Menu>
      {unitsToAdd.map((unit) => (
        <Menu.Item key={unit.id}>
          <p>{unit.unit_name}</p>
        </Menu.Item>
      ))}
    </Menu>
  );

  const columns = [
    {
      title: <strong>Unit Name</strong>,
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: "20%",
    },
    {
      title: <strong>Description</strong>,
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: "60%",
    },
    {
      title: "",
      dataIndex: "deleteUnit",
      key: "deleteUnit",
      ellipsis: true,
      // width: "13%"
    },
  ];

  const data = course.units.map((unit) => {
    const handleDelete = (e) => {
      e.preventDefault();
      // course.units.
    };

    return {
      key: unit.id,
      name: unit.unit_name,
      description: (
        <div dangerouslySetInnerHTML={{ __html: unit.description }} />
      ),
      deleteUnit: (
        <MultiPurposeModal
          handleOk={handleDelete}
          addTitle="Delete Unit"
          typeModal="Delete"
        >
          {`Are you sure you want to delete "${unit.unit_name}"?`}
        </MultiPurposeModal>
      ),
    };
  });

  //console.log(course.units);

  // const handleOk = (e) => {
  //   e.preventDefault();
  // };

  return (
    <MultiPurposeModal
      // handleOk={ handleOk }
      addTitle={`Units of ${course.course_name}`}
      typeModal="Units"
    >
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link">
          Add Unit
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

export default UnitsCourse;
