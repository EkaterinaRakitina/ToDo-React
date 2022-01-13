import React, {useState, useEffect} from 'react';
import axios from 'axios';

import './App.scss';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(async() => {
    await axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    });
  }, [])
  
  console.log(tasks);

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <div>
          <input type="text" />
          <button>Add</button>
        </div>
      </header>
    </div>
  );
}

export default App;
