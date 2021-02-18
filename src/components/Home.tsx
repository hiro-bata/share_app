import React from 'react';
import { Link } from "react-router-dom";
import { auth } from '../firebase';

const Home: React.FC = () => {

  const signOut = async () => {
      await auth.signOut();
      localStorage.removeItem('token');
  }
  
  return (
    <>
      <h1>Hello world!!</h1>
      {localStorage.getItem('token')? (
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