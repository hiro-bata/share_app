import React from 'react';
import { Link } from "react-router-dom";
import { auth } from '../firebase';

const Home: React.FC = () => {
  return (
    <>
      <h1>Hello world!!</h1>
      <Link to="/feed">Feed</Link><br/>
      <Link to="/auth">Auth</Link><br/>
      <Link to="/postinput">PostInput</Link><br/>
      <button onClick={async () => {await auth.signOut()}}>LOGOUT</button>
      
    </>
  );
}

export default Home;