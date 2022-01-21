import React from 'react';
import TaskComponent from '../TaskComponent/TaskComponent';
import './ComponentStyle.scss';

const ContainerTaskComponent = ({ tasks, setTasks, setCurrentTask }) => {
  tasks.sort((a, b) => a.isCheck - b.isCheck);

  return (
    <div className="Tasks-container">
      {tasks.map((task, index) => (
        <TaskComponent
          key={`task-${index}`}
          setTasks={setTasks}
          task={task}
          index={index}
          setCurrentTask={setCurrentTask}
        />
      ))}
    </div>
  );
};

export default ContainerTaskComponent;
