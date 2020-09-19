import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
import TaskManager from './containers/TaskManager'


const App = () => {

useEffect(() => {
if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
  window.location.href = window.location.origin
}

}, [])

  return (
    <BrowserRouter>
        <TaskManager />
    </BrowserRouter>
  );
}

export default App;
