import React from 'react';
import firebase from "firebase/app";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

type Anchor = 'top'

const Header = () => {
  const currentUser = firebase.auth().currentUser;
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {(['top'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div>
                <Link to="/" onClick={toggleDrawer(anchor, false)}>Home</Link><br/>
                <Link to="feed" onClick={toggleDrawer(anchor, false)}>投稿一覧</Link><br/>
                {currentUser && (
                    <>
                        <Link to="postinput" onClick={toggleDrawer(anchor, false)}>投稿</Link><br/>
                    </>
                )}
                {!currentUser && (
                    <>
                        <Link to="auth" onClick={toggleDrawer(anchor, false)}>Sign In / Sign Up</Link>
                    </>
                )}
            </div>    
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Header;