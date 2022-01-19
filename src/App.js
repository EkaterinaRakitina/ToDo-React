import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskComponent from './components/TaskComponent/TaskComponent';
import EditTaskComponent from './components/EditTaskComponent/EditTaskComponent';
import './App.scss';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [currentTask, setCurrentTask] = useState(-1);

  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then((res) => {
      setTasks(res.data.data);
    });
  }, []);

  const addNewTask = async () => {
    await axios
      .post('http://localhost:8000/createTask', {
        text,
        isCheck: false,
      })
      .then((res) => {
        setText('');
        setTasks(res.data.data);
      });
  };

  const editTask = (index) => {
    setCurrentTask(index);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <div>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => addNewTask()}>Add</button>
        </div>
      </header>
      {tasks.map((task, index) => (
        <div className="Task-container" key={`task-${index}`}>
          {currentTask !== index && (
            <TaskComponent
              setTasks={setTasks}
              task={task}
              setCurrentTask={setCurrentTask}
              editTask={editTask}
              index={index}
            />
          )}

          {currentTask === index && (
            <EditTaskComponent
              task={task}
              setTasks={setTasks}
              setCurrentTask={setCurrentTask}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
