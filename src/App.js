import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskComponent from './components/TaskComponent/TaskComponent';
import './App.scss';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

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

  console.log(tasks);

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
      <div className="Content-page">
        {tasks.map((task, index) => (
          <div key={`task-${index}`}>
            <TaskComponent
              setTasks={setTasks}
              task={task}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
