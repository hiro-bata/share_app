import React from 'react';
import { Link } from "react-router-dom";
import { auth } from '../firebase';
import firebase from "firebase/app";

const Home: React.FC = () => {
  const currentUser = firebase.auth().currentUser;
  const signOut = async () => {
      await auth.signOut();
      localStorage.removeItem('token');
      localStorage.removeItem('email');
  }
  
  return (
    <>
      <h1>Hello world!!</h1>
      {currentUser? (
        <>  
        <Link to="/feed">Feed</Link><br/>
        <Link to="/postinput">PostInput</Link><br/>
        <button onClick={signOut}><Link to="/auth">LOGOUT</Link></button>
        </>
      ) 
      : (
        <>
        <Link to="/feed">Feed</Link><br/>
        <Link to="/auth">Auth</Link><br/>
        </>
      )}
    </>
  );
}

export default Home;