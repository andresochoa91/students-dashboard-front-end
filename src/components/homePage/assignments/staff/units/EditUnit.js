import React, { useState, useContext } from "react";
import MultiPurposeModal from "../../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import { Input } from "antd";
import UserContext from "../../../../contexts/UserContext";
import TextEditor from "../../../textEditor/TextEditor";

const EditUnit = ({ unit }) => {
  const [authToken] = useContext(UserContext);
  const [unitName, setUnitName] = useState(unit.unit_name);
  const [unitDescription, setUnitDescription] = useState(unit.description);

  const handleEdit = (event) => {
    event.preventDefault();
    console.log(unit.id);

    fetch(`${process.env.REACT_APP_GET_UNITS}/${unit.id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        unit_name: unitName,
        description: unitDescription,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      })
      .catch(console.error);
  };

  return (
    <MultiPurposeModal
      handleOk={handleEdit}
      addTitle="Edit Unit"
      typeModal="Edit"
    >
      <label> Unit Name: </label>
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
      <label> Unit Description: </label>
      <TextEditor text={unitDescription} setText={setUnitDescription} />
      <br />
    </MultiPurposeModal>
  );
};

export default EditUnit;
