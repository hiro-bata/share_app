import React, { useEffect } from 'react';
import styles from './App.module.css'
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Feed from './components/Feed';
import Auth from './components/Auth';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  return (
    <>
      <Router>
        <Route exact path="/" component={Home}></Route>
        <Route path="/feed" component={Feed}></Route>
        <Route path="/auth" component={Auth}></Route>
      </Router>      
    </>
  );
}

export default App;
