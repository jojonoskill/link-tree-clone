import React, {useEffect, useState} from 'react';
import {getDatabase, child, ref, set, get} from 'firebase/database';
import {useNavigate} from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      repeatedPassword: '',
      errors: [],
    });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const checkUsernameExists = async () => {
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `/${formData.username}`)).then((snapshot) => {
      if (snapshot.exists()) {
        formData.errors.push('username already exists');
        return true;
      } else {
        return false;
      }
    }).catch((error) => {
      console.error(error);
      return false;
    });
  }

  const checkErrors = async () => {
    if(formData.password !== formData.repeatedPassword) formData.errors.push('passwords are not the same');
    if (formData.username.length < 8) formData.errors.push('username is too short');
    if (formData.password.length < 4) formData.errors.push('password is too short');
    if(formData.username === 'jojonoskill') formData.errors.push('its my username!!!!');
    await checkUsernameExists();
    setFormData((prevState) => ({
      ...prevState,
    }));
  }

  const registerUser = async (event) => {
    event.preventDefault();
    formData.errors = [];
    await checkErrors();
    if(formData.errors.length !== 0) return;

    const db = await getDatabase();
    set(ref(db, '/' + formData.username), {
      username: formData.username,
      password: formData.password,
      links: [],
    }).then((result) => {
      alert('succesful registration');
    }).catch(e => {
      alert(e);
    })

  }

  // useEffect(() => {
  //   lo
  // })



  return (
      <div>
        <form>
          <input
            id='username'
            onChange={handleChange}
            type='text'
            required
            className={
            formData.username.length < 12
                ? 'login is-invalid'
                : 'login'
            }
            placeholder='your username'
          />
          <input
            id='password'
            onChange={handleChange}
            type='password'
            required
            className={formData.password.length > 8
                ?'password'
                :'password is-invalid'
            }
            placeholder='your password'
            />
          <input
            id='repeatedPassword'
            onChange={handleChange}
            type='password'
            required
            className={formData.repeatedPassword === formData.password?
                'repeated-password'
                :'repeated-password is-invalid'
            }
            placeholder='repeat your password'
            />
          <button onClick={registerUser}>sign up!</button>
        </form>
        <hr/>
        <h3>{formData.errors[0]}</h3>
        <h3>Already have an account?</h3><button onClick={() => navigate('/login')}>sign in!</button>
      </div>
  );
};

export default RegisterForm;
