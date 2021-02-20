import React, {useState} from 'react'
import styles from './PostInput.module.css'
import { storage, db, auth } from "../firebase";
import firebase from "firebase/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Avatar, Button, IconButton } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Redirect } from 'react-router-dom';

const PostInput = () => {
    const user = useSelector(selectUser);
    const currentUser = firebase.auth().currentUser;
    const [tweetImage, setTweetImage] = useState<File | null>(null);
    const [tweetMsg, setTweetMsg] = useState("");
    const [tweetTitle, setTweetTitle] = useState("");
  
    const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files![0]) {
        setTweetImage(e.target.files![0]);
        e.target.value = "";
      }
    };

    const sendTweet = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (tweetImage) {
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N = 16;
        const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
          .map((n) => S[n % S.length])
          .join("");
        const fileName = randomChar + "_" + tweetImage.name;
        const uploadTweetImg = storage.ref(`images/${fileName}`).put(tweetImage);
        uploadTweetImg.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {},
          (err) => {
            alert(err.message);
          },
          async () => {
            await storage
              .ref("images")
              .child(fileName)
              .getDownloadURL()
              .then(async (url) => {
                await db.collection("posts").add({
                  avatar: user.photoUrl,
                  image: url,
                  title: tweetTitle,
                  text: tweetMsg,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  username: user.displayName,
                });
              });
          }
        );
      } else {
        db.collection("posts").add({
          avatar: user.photoUrl,
          image: "",
          title: tweetTitle,
          text: tweetMsg,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          username: user.displayName,
        });
      }
      setTweetImage(null);
      setTweetTitle("");
      setTweetMsg("");
    };
  
    return (
      <>
        {!currentUser && <Redirect to="/auth" />}
        <form onSubmit={sendTweet}>
          <div className={styles.tweet_form}>
            <Avatar
              className={styles.tweet_avatar}
              src={user.photoUrl}
              onClick={async () => {
                await auth.signOut();
              }}
            />
            <input
              className={styles.tweet_input}
              placeholder="知恵の名"
              type="text"
              autoFocus
              value={tweetTitle}
              onChange={(e) => setTweetTitle(e.target.value)}
            />
            <input
              className={styles.tweet_input}
              placeholder="詳細"
              type="text"
              autoFocus
              value={tweetMsg}
              onChange={(e) => setTweetMsg(e.target.value)}
            />
            <IconButton>
              <label>
                <AddAPhotoIcon
                  className={
                    tweetImage ? styles.tweet_addIconLoaded : styles.tweet_addIcon
                  }
                />
                <input
                  className={styles.tweet_hiddenIcon}
                  type="file"
                  onChange={onChangeImageHandler}
                />
              </label>
            </IconButton>
          </div>
  
          <Button
            type="submit"
            disabled={!tweetMsg}
            className={
              tweetMsg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
            }
          >
            Tweet
          </Button>
        </form>
      </>
    );
  }
  
  export default PostInput;
