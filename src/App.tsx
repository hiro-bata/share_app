import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import Feed from './components/Feed';
import Auth from './components/Auth';
import Home from './components/Home';
import PostInput from './components/PostInput';
import PostDetailPage from './components/PostDetailPage';
import { BrowserRouter as Router, Route, } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';


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
          <Route exact path="/feed" component={Feed}></Route>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/postinput" component={PostInput}></Route>
          <Footer />
        </Router>
    </>
  );
}

export default App;
