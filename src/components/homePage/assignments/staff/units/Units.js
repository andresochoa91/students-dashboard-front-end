import React, { useState, useContext } from "react";
import { Table, Spin } from "antd";
import MultiPurposeModal from "../../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import { Input } from "antd";
import UserContext from "../../../../contexts/UserContext";
import TextEditor from "../../../textEditor/TextEditor";
import EditUnit from "./EditUnit";
import DeleteUnit from "./DeleteUnit";
import LessonsUnit from "./LessonsUnit";

const Units = ({ units }) => {
  const [authToken] = useContext(UserContext);
  const [unitName, setUnitName] = useState("");
  const [unitDescription, setUnitDescription] = useState("");

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
      width: "45%",
    },
    {
      title: "",
      dataIndex: "lessons",
      key: "lessons",
      ellipsis: true,
      width: "15%",
    },
    {
      title: "",
      dataIndex: "editUnit",
      key: "editUnit",
      ellipsis: true,
      width: "12%",
    },
    {
      title: "",
      dataIndex: "deleteUnit",
      key: "deleteUnit",
      ellipsis: true,
      width: "15%",
    },
  ];

  const data = units.map((unit) => {
    return {
      key: unit.id,
      name: unit.name,
      description: (
        <div dangerouslySetInnerHTML={{ __html: unit.description }} />
      ),
      lessons: <LessonsUnit unit={unit} />,
      editUnit: <EditUnit unit={unit} />,
      deleteUnit: <DeleteUnit unit={unit} />,
    };
  });

  const handleOk = (event) => {
    event.preventDefault();
    fetch(process.env.REACT_APP_GET_UNITS, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        name: unitName,
        description: unitDescription,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        // console.log(data);
        window.location.reload();
      })
      .catch(console.error);
  };

  return (
    <>
      {units.length ? (
        <>
          <MultiPurposeModal handleOk={handleOk} addTitle="Add Unit">
            <label>Unit Name: </label>
            <Input
              type="text"
              name="unitName"
              value={unitName}
              onChange={(event) => {
                event.preventDefault();
                setUnitName(event.target.value);
              }}
            />
            <br />
            <br />
            <label>Unit Description: </label>
            <TextEditor text={unitDescription} setText={setUnitDescription} />

            <br />
            {/* <Button type="primary" htmlType="submit" >
                                    Create Course
                                </Button> */}
          </MultiPurposeModal>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ y: 600 }}
            expandIconColumnIndex={2}
          />
        </>
      ) : (
        <Spin />
      )}
    </>
  );
};

export default Units;
