import React, { useContext } from "react";
import MultiPurposeModal from "../../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import UserContext from "../../../../contexts/UserContext";

const DeleteUnit = ({ unit }) => {
  const [authToken] = useContext(UserContext);

  const handleDelete = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_GET_UNITS}/${unit.id}`, {
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
      addTitle="Delete Unit"
      typeModal="Delete"
    >
      {`Are you sure you want to delete "${unit.unit_name}"?`}
    </MultiPurposeModal>
  );
};

export default DeleteUnit;
