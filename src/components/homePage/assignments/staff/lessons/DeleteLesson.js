import React, { useContext } from "react";
import MultiPurposeModal from "../../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import UserContext from "../../../../contexts/UserContext";

const DeleteLesson = ({ lesson }) => {
  const [authToken] = useContext(UserContext);

  const handleDelete = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_GET_LESSONS}/${lesson.id}`, {
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
      addTitle="Delete lesson"
      typeModal="Delete"
    >
      {`Are you sure you want to delete "${lesson.lesson_name}"?`}
    </MultiPurposeModal>
  );
};

export default DeleteLesson;
