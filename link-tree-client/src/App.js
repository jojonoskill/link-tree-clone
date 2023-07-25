import logo from './logo.svg';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import Register from './pages/Register'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardRedirect from './pages/DashboardRedirect';
import { useLoginState } from './context/UserState';
import Home from './pages/Home';
import NewLinkPopup from './components/NewLinkPopup';

function App() {
  const {user, setUser} = useLoginState();



  return (
    <div className="App">

      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />'
        <Route path='/dashboard' element={<DashboardRedirect/>}/>
        <Route path='/dashboard/:username' element={<Dashboard/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Navigate to='/home' replace/>} />
      </Routes>
    </div>
  );
}

export default App;
