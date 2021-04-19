import React, { useContext } from "react";
import MultiPurposeModal from "../../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import UserContext from "../../../../contexts/UserContext";

const DeleteMaterial = ({ material }) => {
  const [authToken] = useContext(UserContext);

  const handleDelete = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_GET_RESOURCES}/${material.id}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      })
      .catch(console.error);
  };
  return (
    <MultiPurposeModal
      handleOk={handleDelete}
      addTitle="Delete material"
      typeModal="Delete"
    >
      {`Are you sure you want to delete "${material.source_title}"?`}
    </MultiPurposeModal>
  );
};

export default DeleteMaterial;
