
import React, { useState, useContext } from "react";
import MultiPurposeModal from "../../../dashboard/staffDashboard/multiPurposeModal/MultiPurposeModal";
import { Input } from "antd";
import UserContext from "../../../../contexts/UserContext";
import TextEditor from "../../../textEditor/TextEditor";

const EditLesson = ({ lesson }) => {
  const [authToken] = useContext(UserContext);
  const [lessonName, setLessonName] = useState(lesson.lesson_name);
  const [lessonDescription, setLessonDescription] = useState(
    "" //Make description property
  );
  console.log(lesson);

  const handleEdit = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_API_ROOT}/lessons/${lesson.id}`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify({
        lesson_name: lessonName,
        description: lessonDescription,
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
      addTitle="Edit Lesson"
      typeModal="Edit"
    >
      <label> Lesson Name: </label>
      <Input
        type="text"
        name="lessonName"
        value={lessonName}
        onChange={(event) => {
          event.preventDefault();
          setLessonName(event.target.value);
        }}
      />
      <br />
      <br />
      {/* <label> Lesson Description: </label>
      <TextEditor text={lessonDescription} setText={setLessonDescription} />
      <br /> */}
    </MultiPurposeModal>
  );
};

export default EditLesson;

