import React, { useState, useEffect } from 'react'
import styles from './Feed.module.css'
import { db } from '../firebase'
import PostDetail from './PostDetail'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { RouteComponentProps } from 'react-router-dom'

type PageProps = {} & RouteComponentProps<{ id: string }>

const PostDetailPage: React.FC<PageProps> = (props) => {
  const url = props.match.params.id
  const [posts, setPosts] = useState([
    {
      id: '',
      avatar: '',
      image: '',
      title: '',
      text: '',
      timestamp: null,
      username: '',
    },
  ])

  useEffect(() => {
    const unSub = db
      .collection('posts')
      // .where('documents', '==', 'DEM59YlW8AEWrNZYi7yx')
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
          }))
        )
      )
    return () => {
      unSub()
    }
  }, [])

  const getPost = async (id: string) => {
    try {
      const postRef = db.collection('posts').doc(id)
      const postDoc = await postRef.get()
      if (postDoc.exists) {
        return postDoc.id
      }
    } catch (err) {
      console.log('Errorです')
    }
  }

  return (
    <div className={styles.feed}>
      <CssBaseline />
      <Container maxWidth="md">
        <h1>投稿詳細</h1>
        {posts[0]?.id && (
          <>
            {url}
            {/* {posts[0].id}<br/>
          {posts[0].title}<br/>
          {posts[0].text} */}
            {/* {posts.map((post) => (
            <PostDetail
              key={post.id}
              postId={post.id}
              avatar={post.avatar}
              image={post.image}
              title={post.title}
              text={post.text}
              timestamp={post.timestamp}
              username={post.username}
            />
          ))} */}
            {posts.map((post) => {
              if (post.id === url) {
                return post.title
              }
            })}
          </>
        )}
      </Container>
    </div>
  )
}

export default PostDetailPage
