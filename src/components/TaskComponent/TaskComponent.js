import React from 'react';
import axios from 'axios';
import './ComponentStyle.scss';

const TaskComponent = ({ setTasks, task }) => {
  const { _id, isCheck, text } = task;
  const onChangeCheckbox = () => {
    axios
      .patch('http://localhost:8000/updateTask', {
        _id,
        isCheck: !isCheck,
      })
      .then((res) => {
        setTasks(res.data.data);
      });
  };

  return (
    <div className="Task-container">
      <input
        type="checkbox"
        onChange={() => onChangeCheckbox()}
        isCheck={isCheck}
      />
      <span>{text}</span>
    </div>
  );
};

export default TaskComponent;
