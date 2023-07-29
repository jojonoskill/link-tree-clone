import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import React from 'react';
import Register from './pages/Register'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardRedirect from './pages/DashboardRedirect';
import { useLoginState } from './context/UserState';
import Home from './pages/Home';
import LinkTree from './pages/LinkTree';

function App() {
  const {user, setUser} = useLoginState();



  return (
    <div className="App">

      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />'
        <Route exact path='/dashboard' element={<DashboardRedirect/>}/>
        <Route exact path='/dashboard/:username' element={<Dashboard/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Navigate to='/home' replace/>} />
        <Route path='/linktree/:username' element={<LinkTree/>}/>
      </Routes>
    </div>
  );
}

export default App;
