import React from 'react';
import { Link } from "react-router-dom";
import { auth } from '../firebase';
import firebase from "firebase/app";

const Home: React.FC = () => {
  const currentUser = firebase.auth().currentUser;
  const signOut = async () => {
      await auth.signOut();
  }
  
  return (
    <>
      <h1>Hello world!!</h1>
      {currentUser && (
        <>  
        <button onClick={signOut}>LOGOUT</button>
        </>
      )}
    </>
  );
}

export default Home;