import React from 'react';
import {useLoginState} from '../context/UserState';
import RegisterForm from '../components/RegisterForm';

const Register = () => {
  const {user, setUser} = useLoginState();

  return (
    <div>
      <RegisterForm/>
    </div>
  );
};

export default Register;
