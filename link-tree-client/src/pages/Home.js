import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLoginState} from '../context/UserState';

const Home = () => {
  const {user, setUser} = useLoginState();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate(`/dashboard/${user.username}`, {replace: true});
  })
  return (
      <div>
        <h1>Linktree clone!</h1>
        <button onClick={() => navigate('/register')}>Sign up</button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
  );
};

export default Home;
