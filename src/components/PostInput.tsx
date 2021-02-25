import React, { useState } from 'react'
import styles from './PostInput.module.css'
import { makeStyles } from '@material-ui/core/styles'
import { storage, db, auth } from '../firebase'
import firebase from 'firebase/app'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { Avatar, Button, IconButton } from '@material-ui/core'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto'
import { Redirect } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1606242403192-c40d308b704d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
    backgroundSize: 'cover',
    padding: theme.spacing(20, 0, 20),
  },
  heroContentText: {
    color: '#DDFFFF',
  },
}))

const PostInput = () => {
  const user = useSelector(selectUser)
  const currentUser = firebase.auth().currentUser
  const postLike = 0
  const [postImage, setPostImage] = useState<File | null>(null)
  const [postMsg, setPostMsg] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [redirect, setRedirect] = useState(false)
  const classes = useStyles()

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setPostImage(e.target.files![0])
      e.target.value = ''
    }
  }

  const sendPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (postImage) {
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const N = 16
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('')
      const fileName = randomChar + '_' + postImage.name
      const uploadPostImg = storage.ref(`images/${fileName}`).put(postImage)
      uploadPostImg.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (err) => {
          alert(err.message)
        },
        async () => {
          await storage
            .ref('images')
            .child(fileName)
            .getDownloadURL()
            .then(async (url) => {
              await db.collection('posts').add({
                avatar: user.photoUrl,
                image: url,
                title: postTitle,
                text: postMsg,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                username: user.displayName,
                likecount: postLike,
              })
            })
        }
      )
    } else {
      db.collection('posts').add({
        avatar: user.photoUrl,
        image: '',
        title: postTitle,
        text: postMsg,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        username: user.displayName,
        likecount: postLike,
      })
    }
    setPostImage(null)
    setPostTitle('')
    setPostMsg('')
    alert('投稿有難う御座います！')
    setRedirect(true)
  }

  return (
    <>
      {redirect && <Redirect to="/feed" />}
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography className={classes.heroContentText} component="h1" variant="h2" align="center" gutterBottom>
            Post Here
          </Typography>
          <Typography className={classes.heroContentText} variant="h5" align="center" paragraph>
            ＊画像も投稿できます
          </Typography>
        </Container>
      </div>
      <Container maxWidth="md">
        {!currentUser && <Redirect to="/auth" />}
        <form onSubmit={sendPost}>
          <div className={styles.post_form}>
            <div className={styles.icon}>
              <Avatar
                className={styles.post_avatar}
                src={user.photoUrl}
                onClick={async () => {
                  await auth.signOut()
                }}
              />
              <IconButton>
                <label>
                  <AddAPhotoIcon className={postImage ? styles.post_addIconLoaded : styles.post_addIcon} />
                  <input className={styles.post_hiddenIcon} type="file" onChange={onChangeImageHandler} />
                </label>
              </IconButton>
            </div>
            <input
              className={styles.post_input_title}
              placeholder="知恵の名"
              type="text"
              autoFocus
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <textarea
              className={styles.post_input_text}
              placeholder="詳細"
              // type="text"
              autoFocus
              value={postMsg}
              onChange={(e) => setPostMsg(e.target.value)}
            />
            <Button
              type="submit"
              disabled={!postMsg}
              className={postMsg ? styles.post_sendBtn : styles.post_sendDisableBtn}
            >
              投稿
            </Button>
          </div>
        </form>
      </Container>
    </>
  )
}

export default PostInput
