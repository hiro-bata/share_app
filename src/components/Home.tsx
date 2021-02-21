import React from "react";
import firebase from "firebase/app";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1434493651957-4ec11beae249?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)",
    backgroundSize: "cover",
    backgroundPositionY: "30%",
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
    paddingBottom: theme.spacing(10),
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
        <Container className={styles.homeBody} maxWidth="md">
          <Grid container spacing={4}>
            <h1>より多くの人が充実した生活を送れるように</h1>
          </Grid>
          <Grid container spacing={1}>
            <p>
              コロナ禍で充実した日常を送っている人とそうでない人との差が明確にわかれていると感じています。<br/>
              原因は様々だと思いますが、その一つとして <span className={styles.textBold}>"自分に合った生活スタイルを手に入れられているか"</span> という要素があると考えています。<br/><br/>
              そして、今一つ上手くいっていない人は、<br/>
              生活を豊かにする情報をインプットできていなかったり、そもそも生活スタイルの見直しを重要だと捉えていない傾向があると<br/>
              感じています。<br/><br/>

              そのため、 <span className={styles.textBold}>"日々の生活を充実させるための知恵"</span> を1つのプラットフォームに集約し、
              生活スタイルの改善に役立つ価値ある情報を広げるべく、 <span className={styles.textBold}>Share Wisdom</span> を立ち上げました。
            </p>
          </Grid>
          <Grid container spacing={4}>
            <h1>日常を豊かにする 知恵 を投稿して共有しよう</h1>
          </Grid>
          <Grid container spacing={1}>
            <p>
              この1年間で色んなことにトライしてきた方も多いと思います。<br/>
              その中で、自分なりに手応えを感じた行動を投稿して共有してみましょう。<br/><br/>
              
              {!currentUser && (
                <div>
                  <span className={styles.note}>＊ユーザー登録を行うと投稿できるようになります</span><br/>
                  <Link className={styles.homeBodyButton} to="auth">Sign In / Sign Up</Link>
                </div>
              )}
            </p>
          </Grid>
          <Grid container spacing={4}>
            <h1>みんなの 知恵 に触れよう</h1>
          </Grid>
          <Grid container spacing={1}>
            <p>
              今まで興味がなかったことや縁がなかったことにトライしてみると、新たな発見が得られ日常が一変することがあります。<br/>
              しかし、そういった新たな情報は自分の中のフィルターによって、無意識にシャットアウトされがちです。<br/>
              投稿一覧を活用し、意識的に新しい情報に触れてみましょう。ユーザー登録を行えば投稿に対してコメントもできます。<br/><br/>
              <span className={styles.note}>＊登録なしで自由に閲覧できます</span><br/>
              <Link className={styles.homeBodyButton} to="feed">投稿一覧</Link>
            </p>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Home;
