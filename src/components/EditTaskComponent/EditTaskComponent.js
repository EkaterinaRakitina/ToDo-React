import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import doneIcon from '../../img/done.svg';
import canselIcon from '../../img/cancel.svg';
import './ComponentStyle.scss';

const EditTaskComponent = ({ task, setTasks, setCurrentTask }) => {
  const { _id, isCheck, text } = task;
  const [inputValue, setInputValue] = useState(text);
  const navigate = useNavigate();

  const saveResultTask = () => {
    axios
      .patch(`http://localhost:8000/updateTask?id=${_id}`, {
        text: inputValue,
        isCheck,
      })
      .then((res) => {
        setTasks(res.data.data);
      });

    goHome();
  };

  const goHome = () => {
    navigate(`/home`);
  };

  return (
    <div className="Edit-Task-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <img src={doneIcon} alt="DoneIcon" onClick={() => saveResultTask()} />
      <img src={canselIcon} alt="CancelIcon" onClick={() => goHome()} />
    </div>
  );
};

export default EditTaskComponent;
