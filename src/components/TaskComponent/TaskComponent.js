import React from 'react';
import axios from 'axios';
import deleteIcon from '../../img/delete.svg';
import editIcon from '../../img/edit.svg';
import './ComponentStyle.scss';

const TaskComponent = ({ setTasks, task, editTask, index }) => {
  const { _id, isCheck, text } = task;

  const onChangeCheckbox = () => {
    axios
      .patch(`http://localhost:8000/updateTask?id=${_id}`, {
        isCheck: !isCheck
      })
      .then((res) => {
        setTasks(res.data.data);
      });
  };

  const deleteTask = () => {
    axios.delete(`http://localhost:8000/deleteTask?id=${_id}`).then((res) => {
      setTasks(res.data.data);
    });
  };

  return (
    <div className="Task-container">
      <input
        type="checkbox"
        onChange={() => onChangeCheckbox()}
        checked={isCheck}
      />
      <span>{text}</span>
      <img src={editIcon} alt="EditIcon"  onClick={() => editTask(index)} />
      <img src={deleteIcon} alt="DeleteIcon" onClick={() => deleteTask()} />
    </div>
  );
};

export default TaskComponent;
