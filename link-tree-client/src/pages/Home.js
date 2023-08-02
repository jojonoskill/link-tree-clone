import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLoginState} from '../context/UserState';
import styled from "styled-components";

const Home = () => {
  const {user, setUser} = useLoginState();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.username !== '') navigate(`/dashboard/${user.username}`, {replace: true});
  })
  return (
      <MainContainer>
        <div className='button-box'>
          <h1 className='left-side'>Linktree clone!</h1>
          <button onClick={() => navigate('/register')}>Sign up</button>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      </MainContainer>
  );
};

export default Home;


const MainContainer = styled.div`
  
  .button-box{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    background: #FFFFFF;
    width: 85vw;
    border-radius: 30px;
  }
  
  .left-side {
    margin-right: 300px;
  }
`
