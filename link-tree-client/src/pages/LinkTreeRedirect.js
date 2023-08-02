import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {child, get, getDatabase, ref} from 'firebase/database';

const LinkTreeRedirect = () => {
  const params = useParams();


  useEffect(() => {
    // window.location.replace('https://codefrontend.com');

    const dbRef = ref(getDatabase());
    get(child(dbRef, `/${params.username}/links/${params.id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        window.location.replace(snapshot.val().link);
      }
    })
  })
  return (
      <div>

      </div>
  );
};

export default LinkTreeRedirect;
