import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className='App'>
      <header className='App-header'>
        <h1>To-Do List</h1>
        <div>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => addNewTask()}>Add</button>
        </div>
      </header>
      <div className='Render-tasks'>
        {
          tasks.map((task, index) => 
            <div key={`task-${index}`}>
              <input type='checkbox'  onChange={() => console.log('1')} checked={task.isCheck} />
              <span>{task.text}</span>
            </div>

          )
        }
      </div>
    </div>
  );
};

export default App;
