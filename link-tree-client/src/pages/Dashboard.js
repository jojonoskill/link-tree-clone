import React, {useEffect, useRef, useState} from 'react';
import {useLoginState} from '../context/UserState';
import {json, useNavigate} from 'react-router-dom';
import NewLinkPopup from '../components/NewLinkPopup';
import {child, get, getDatabase, ref} from 'firebase/database';

const Dashboard = () => {
  const {user, setUser} = useLoginState();
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);

  useEffect( () => {
    setTimeout(() => {
      if (!user) navigate('/home');
      fetchLinks();
    }, 1000);
  }, []);

  const fetchLinks = async () => {
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `/${user.username}/links`)).then(snapshot => {
      if (snapshot.exists()) {
        setLinks(snapshot.val());
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const signOut = (event) => {
    setUser(null);
    localStorage.setItem('user', null);
    navigate('/home');
  }

  const navigatePage = (index) => {
    navigate(`/redirect/${user.username}/${index}`);
  }

  return (
      <div>
        <button onClick={signOut}>sign out?</button>
        <NewLinkPopup/>
        <br/>
        <h2>your links</h2>
        {links.map((link, index)=>{
          return(
          <div key={index}>
            <hr/>
            <h4>{link.header}</h4>
            <h5>{link.link}</h5>
            <button>delete link?</button>
          </div>
          )
        })}
      </div>
  );
};

export default Dashboard;
