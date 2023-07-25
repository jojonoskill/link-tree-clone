import React, {useState} from 'react';
import Modal from 'react-modal';
import {child, get, getDatabase, ref, set} from 'firebase/database';
import {useLoginState} from '../context/UserState';

// Optionally, you can add some CSS to style the modal overlay and content
// import './Modal.css'; // Create a new CSS file for the styles

const NewLinkPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [linkData, setLinkData] = useState({
    header: '',
    link: '',
  });
  const {user, setUser} = useLoginState();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const createLink = async (event) => {
    event.preventDefault();
    const links = [];
    const dbRef = ref(getDatabase());
    get(child(dbRef, `/${user.username}/links`)).then((snapshot) => {
      for(let val of snapshot.val()){
        links.push(val);
      }

    }).catch((error) => {
      console.error(error);
      return false;
    });

    links.push({
      header:linkData.header,
      link:linkData.link,
    });
    const db = getDatabase();
    await set(ref(db, '/' + user.username), {
      ...user,
      links: links,
    }).then((result) => {
      console.log(links);
    }).catch(e => {
      alert(e);
    });
  };


  const handleChange = (event) => {
    const {id, value} = event.target;
    setLinkData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
      <div>
        <button onClick={openModal}>Create new link?</button>

        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
          <h2>Create new link</h2>
          <form>
            <input
                id="header"
                onChange={handleChange}
                type="text"
                required
                placeholder="header"
            />
            <input
                id="link"
                onChange={handleChange}
                type="text"
                required
                placeholder="URL"
            />
            <button onClick={createLink}>Create!</button>
          </form>

          <button onClick={closeModal}>Close Popup</button>
        </Modal>
      </div>
  );
};

export default NewLinkPopup;
