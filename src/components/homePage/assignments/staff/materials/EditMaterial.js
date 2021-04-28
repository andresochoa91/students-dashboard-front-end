import React, { useState, useContext } from "react";
import MultiPurposeModal from "../../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import { Input } from "antd";
import UserContext from "../../../../contexts/UserContext";

const EditMaterial = ({ material }) => {
  const [authToken] = useContext(UserContext);
  const [materialName, setMaterialName] = useState(material.source_title);
  const [link, setLink] = useState(material.link);

  const handleEdit = (event) => {
    event.preventDefault();
    console.log(material, material.id, material.source_title);
    console.log(materialName, link);
    fetch(`${process.env.REACT_APP_GET_MATERIALS}/${material.id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        source_title: materialName,
        link: link,
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
      addTitle="Edit Material"
      typeModal="Edit"
    >
      <label> Material Title: </label>
      <Input
        type="text"
        name="materialName"
        value={materialName}
        onChange={(event) => {
          event.preventDefault();
          setMaterialName(event.target.value);
          console.log(event.target.value);
        }}
      />
      <br />
      <br />
      <label> Link: </label>
      <Input text={link} setText={setLink} />
      <br />
    </MultiPurposeModal>
  );
};

export default EditMaterial;
