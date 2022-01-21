import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import deleteIcon from '../../img/delete.svg';
import editIcon from '../../img/edit.svg';
import './ComponentStyle.scss';

const TaskComponent = ({ setTasks, task, setCurrentTask, index }) => {
  const { _id, isCheck, text } = task;
  const navigate = useNavigate();

  const onChangeCheckbox = () => {
    axios
      .patch(`http://localhost:8000/updateTask?id=${_id}`, {
        isCheck: !isCheck,
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

  const editTask = () => {
    setCurrentTask(task);
    navigate(`/edit/${_id}`);
  };

  return (
    <div className="Task-container" key={`task-${index}`}>
      <div>
        <input
          type="checkbox"
          onChange={() => onChangeCheckbox()}
          checked={isCheck}
        />
        <span>{text}</span>
      </div>
      <div>
        {!isCheck && <img src={editIcon} alt="EditIcon" onClick={() => editTask()} />}
        <img src={deleteIcon} alt="DeleteIcon" onClick={() => deleteTask()} />
      </div>
    </div>
  );
};

export default TaskComponent;
