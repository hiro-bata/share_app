import React, { useState, useEffect } from 'react'
import styles from './Feed.module.css'
import { db } from '../firebase'
import Post from './Post'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1612757333118-155d63660e13?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
    backgroundSize: 'cover',
    marginBottom: theme.spacing(15),
    padding: theme.spacing(10, 0, 10),
  },
  heroContentText: {
    color: '#DDFFFF',
  },
}))

const Feed: React.FC = () => {
  const classes = useStyles()
  const [posts, setPosts] = useState([
    {
      id: '',
      avatar: '',
      image: '',
      title: '',
      text: '',
      timestamp: null,
      username: '',
      likecount: 0,
    },
  ])

  useEffect(() => {
    const unSub = db
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            avatar: doc.data().avatar,
            image: doc.data().image,
            title: doc.data().title,
            text: doc.data().text,
            timestamp: doc.data().timestamp,
            username: doc.data().username,
            likecount: doc.data().likecount,
          }))
        )
      )
    return () => {
      unSub()
    }
  }, [])

  return (
    <div className={styles.feed}>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography className={classes.heroContentText} component="h1" variant="h2" align="center" gutterBottom>
            Post
          </Typography>
        </Container>
      </div>
      <CssBaseline />
      <Container maxWidth="md">
        {posts[0]?.id && (
          <>
            {posts.map((post) => (
              <Post
                key={post.id}
                postId={post.id}
                avatar={post.avatar}
                image={post.image}
                title={post.title}
                text={post.text}
                timestamp={post.timestamp}
                username={post.username}
                likecount={post.likecount}
              />
            ))}
          </>
        )}
      </Container>
    </div>
  )
}

export default Feed
