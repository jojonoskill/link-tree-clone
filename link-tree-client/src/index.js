import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {LoginStateProvider} from './context/UserState';
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBJ-LR4aJNWkR6dpcGmYcCvpoUAkHwz_Ts",
  authDomain: "link-tree-clone-f58ef.firebaseapp.com",
  databaseURL: "https://link-tree-clone-f58ef-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "link-tree-clone-f58ef",
  storageBucket: "link-tree-clone-f58ef.appspot.com",
  messagingSenderId: "879414992618",
  appId: "1:879414992618:web:32e432ddf8b96a5a0a8193",
  measurementId: "G-W24RGNQV7P"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <LoginStateProvider>
      <BrowserRouter>
        <App />
     </BrowserRouter>
    </LoginStateProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
