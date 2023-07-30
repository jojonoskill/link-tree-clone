import React, {useEffect, useState} from 'react';
import {useLoginState} from '../context/UserState';
import {useNavigate} from 'react-router-dom';
import NewLinkPopup from '../components/NewLinkPopup';
import {child, get, getDatabase, ref, set} from 'firebase/database';

const Dashboard = () => {
  const {user, setUser} = useLoginState();
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);

  useEffect( () => {
    if (!user) navigate('/home');

    const intervalId = setInterval(() => {
      fetchLinks();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchLinks = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/${user.username}/links`)).then(snapshot => {
      if (snapshot.exists()) {
        setLinks(snapshot.val());
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const signOut = () => {
    setUser(null);
    localStorage.setItem('user', null);
    navigate('/home');
  }

  // const navigatePage = (index) => {
  //   navigate(`/redirect/${user.username}/${index}`);
  // }

  const deleteLink = (index) => {
    const arr = links;
    arr.splice(index,index === 0? 1: index);
    const db = getDatabase();
    set(ref(db, '/' + user.username), {
      ...user,
      links: arr,
    })
    if (arr.length === 0) window.location.reload(false);
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
                <button onClick={() => deleteLink(index)}>delete link?</button>
              </div>
          )
        })}
        <br/>
        <div>
          <h3>link to your dashboard : {`localhost:3000/linktree/${user.username}`}</h3>
        </div>
      </div>
  );
};

export default Dashboard;
