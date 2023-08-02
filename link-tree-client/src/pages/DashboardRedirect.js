import React, {useEffect} from 'react';
import {useLoginState} from '../context/UserState';
import {useNavigate} from 'react-router-dom';

const DashboardRedirect = () => {
  const {user, setUser} = useLoginState();
  const navigate = useNavigate();
  useEffect(() => {
    if(user.username !== '') navigate(`/dashboard/${user.username}`, { replace: true });
    else navigate('/home', { replace: true });
  })
  return (
      <div>

      </div>
  );
};

export default DashboardRedirect;
