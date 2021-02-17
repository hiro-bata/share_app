import React from 'react';
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <h1>Hello world!!</h1>
      <Link to="/feed">Feed</Link><br/>
      <Link to="/auth">Auth</Link><br/>
    </>
  );
}

export default Home;