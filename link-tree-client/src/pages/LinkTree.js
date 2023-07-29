import React, {useEffect, useState} from 'react';
import {redirect, useNavigate, useParams} from 'react-router-dom';
import {child, get, getDatabase, ref} from 'firebase/database';

const LinkTree = () => {
  const params = useParams();
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();

  const fetchLinks = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/${params.username}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setLinks(snapshot.val().links);
      }
      else redirect('/home');
  })}
  useEffect(() => {
    fetchLinks();
  }, [])



  return (
      <div>
        <h1>{params.username}'s tree</h1>
        {links.map((value, index) => {
          return (
              <div>
                <button onClick={() => navigate(`/linktree/${params.username}/${index}`)}>{value.header}</button>
                <br/>
              </div>
          )
        })}

      </div>
  );
};

export default LinkTree;
