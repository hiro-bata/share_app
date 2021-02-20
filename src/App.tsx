import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Feed from './components/Feed';
import Auth from './components/Auth';
import Home from './components/Home';
import PostInput from './components/PostInput';
import { BrowserRouter as Router, Route, Switch, BrowserRouter } from "react-router-dom";
import Header from './components/Header';

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
          <Header />
          <Route exact path="/" component={Home}></Route>
          <Route path="/feed" component={Feed}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/postinput" component={PostInput}></Route> 
        </Router>
    </>
  );
}

export default App;
