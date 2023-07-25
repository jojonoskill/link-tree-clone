import React, {useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import {useLoginState} from '../context/UserState';

const Home = () => {
  const {user, setUser} = useLoginState();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate(`/dashboard/${user.username}`, {replace: true});
  })
  return (
      <div>
        <h1>Welcome to the cum zone!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!</h1>
        <button onClick={() => navigate('/register')}>sign up</button>
        <button onClick={() => navigate('/login')}>sign in</button>
      </div>
  );
};

export default Home;
