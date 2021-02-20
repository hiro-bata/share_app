import React from "react";
import { auth } from "../firebase";
import firebase from "firebase/app";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1434493651957-4ec11beae249?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
    backgroundSize: "cover",
    padding: theme.spacing(20, 0, 40),
  },
  heroContentText: {
    color: "#DDFFFF",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  heroButton: {
    fontWeight: "bold",
    padding: "5px",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Home: React.FC = () => {
  const currentUser = firebase.auth().currentUser;
  const classes = useStyles();

  return (
    <>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              className={classes.heroContentText}
              component="h1"
              variant="h2"
              align="center"
              gutterBottom
            >
              Share Wisdom
            </Typography>
            <Typography
              className={classes.heroContentText}
              variant="h5"
              align="center"
              paragraph
            >
              こんな時こそ、みんなの知恵を共有しよう
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    <Link
                      className={classes.heroButton}
                      color="inherit"
                      to="feed"
                    >
                      投稿一覧
                    </Link>
                  </Button>
                </Grid>
                {currentUser && (
                  <Grid item>
                    <Button variant="contained" color="primary">
                      <Link 
                        color="inherit"
                        to="postinput"
                        className={classes.heroButton}  
                      >
                        記事投稿
                      </Link>
                    </Button>
                  </Grid>
                )}
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <h1>生活の知恵を共有しよう</h1>
          </Grid>
          <Grid container spacing={4}>
            <h1>aaaa</h1>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Home;
