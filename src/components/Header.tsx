import React from 'react';
import firebase from "firebase/app";
import { auth } from "../firebase";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import styles from './Header.module.css';

const useStyles = makeStyles({
  button: {
    fontWeight: "bold",
    fontSize: "20px",
    marginLeft: "30px",
  },
  list: {
    padding: "20px",
  },
  fullList: {
    width: 'auto',
    height: "50px",
    backgroundColor: "#DDFFFF",
  },
  drawer: {
    backgroundColor: "#333333",
    width: "100%",
    height: "100%",
    lineHeight: "40px",
    paddingTop: "20px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  header: {
    display: "flex",
  },
  username: {
    marginTop: "16px",
    marginLeft: "20px",
    fontWeight: "bold",
  }
});

type Anchor = 'Link'

const Header = () => {
  const currentUser = firebase.auth().currentUser;
  const classes = useStyles();
  const [state, setState] = React.useState({
    Link: false,
  });

  const signOut = async () => {
    alert("LOGOUTしました！ご利用ありがとうございました！")
    await auth.signOut();
    setState({...state, Link: false});
  };

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

  const currentUserName = () => {
    if(currentUser != null) {
      return currentUser.displayName;
    }
  }

  return (
    <div className={classes.fullList}>
      {(['Link'] as Anchor[]).map((anchor) => (
        <React.Fragment key={anchor}>
          <div className={classes.header}>
            <Button className={classes.button} onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            {currentUser && (<p className={classes.username}>ユーザー名：{currentUserName()}</p>)}            
          </div>
          <Drawer  open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className={classes.drawer}>
                <Link className={classes.list} to="/" onClick={toggleDrawer(anchor, false)}>Home</Link><br/>
                <Link className={classes.list} to="/feed" onClick={toggleDrawer(anchor, false)}>投稿一覧</Link><br/>
                {currentUser && (
                    <>
                        <Link className={classes.list} to="/postinput" onClick={toggleDrawer(anchor, false)}>投稿</Link><br/>
                        <Link className={classes.list} to="/postinput" onClick={signOut}>LOGOUT</Link><br/>
                    </>
                )}
                {!currentUser && (
                    <>
                        <Link className={classes.list} to="/auth" onClick={toggleDrawer(anchor, false)}>Sign In / Sign Up</Link>
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