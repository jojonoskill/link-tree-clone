import React, {useState} from 'react';
import {useLoginState} from '../context/UserState';
import {child, get, getDatabase, ref} from 'firebase/database';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
  const {user, setUser} = useLoginState();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    errors: [],
  });
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const loginUser = async (event) => {
    event.preventDefault();
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `/${formData.username}`)).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val().password === formData.password) {
          setUser({
            username: formData.username,
            password: formData.password,
          })

          localStorage.setItem('user', JSON.stringify({
            username: formData.username,
            password: formData.password,
          }));
          navigate(`/dashboard/${formData.username}`);
        } else formData.errors.push('incorrect username or/and password');
      } else {
        formData.errors.push('incorrect username or/and password');
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  return (
      <div>
        <form>
          <input
              id='username'
              onChange={handleChange}
              type='text'
              required
              placeholder='your username'
          />
          <input
              id='password'
              onChange={handleChange}
              type='password'
              required
              placeholder='your password'
          />
          <button
            onClick={loginUser}>login!</button>
        </form>
      </div>
  );
};

export default LoginForm;
