import React, { useState } from 'react';
import axios from 'axios';
import doneIcon from '../../img/done.svg';
import canselIcon from '../../img/cancel.svg';
import './ComponentStyle.scss';

const EditTaskComponent = ({ task, setTasks, setCurrentTask }) => {
  const { _id, isCheck, text } = task;
  const [inputValue, setInputValue] = useState(text);

  const cancelFunction = () => {
    setCurrentTask(-1);
  };

  const saveResultTask = () => {
    axios
      .patch(`http://localhost:8000/updateTask?id=${_id}`, {
        text: inputValue,
        isCheck,
      })
      .then((res) => {
        setTasks(res.data.data);
      });

    cancelFunction();
  };

  return (
    <div className="Edit-Task-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <img src={doneIcon} alt="DoneIcon" onClick={() => saveResultTask()} />
      <img src={canselIcon} alt="CancelIcon" onClick={() => cancelFunction()} />
    </div>
  );
};

export default EditTaskComponent;
