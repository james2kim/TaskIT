import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import TaskManager from './containers/TaskManager'

const App = () => {

  return (
    <BrowserRouter>
        <TaskManager />
    </BrowserRouter>
  );
}

export default App;
