import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import EditTaskComponent from './components/EditTaskComponent/EditTaskComponent';
import ContainerTaskComponent from './components/ContainerTaskComponent/ContainerTaskComponent';
import './App.scss';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [currentTask, setCurrentTask] = useState({});

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
          <Routes>
            <Route
              path="/home"
              element={
                <ContainerTaskComponent tasks={tasks} setTasks={setTasks} setCurrentTask={setCurrentTask} />
              }
            />
            <Route
              path="/edit/:id"
              element={<EditTaskComponent task={currentTask} setTasks={setTasks} />}
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
    </div>
  );
};

export default App;
