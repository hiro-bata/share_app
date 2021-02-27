import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import firebase from 'firebase/app'
import Button from '@material-ui/core/Button'
import FavoriteIcon from '@material-ui/icons/Favorite'
import styles from './Like.module.css'

interface PROPS {
  postId: string
  likecount: number
}

const Like: React.FC<PROPS> = (props) => {
  const currentUser = firebase.auth().currentUser
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    db.collection('posts')
      .doc(props.postId)
      .collection('likeUser')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === currentUser?.uid) {
            setLiked(true)
          }
        })
      })
  })

  const likeUserAdd = () => {
    db.collection('posts').doc(props.postId).collection('likeUser').doc(currentUser?.uid).set({
      likeUserId: currentUser?.uid,
    })
  }

  const like = () => {
    db.collection('posts')
      .doc(props.postId)
      .update({
        likecount: props.likecount + 1,
      })
    likeUserAdd()
    setLiked(true)
  }

  const likeUserDelete = () => {
    db.collection('posts').doc(props.postId).collection('likeUser').doc(currentUser?.uid).delete()
  }

  const unlike = () => {
    db.collection('posts')
      .doc(props.postId)
      .update({
        likecount: props.likecount - 1,
      })
    likeUserDelete()
    setLiked(false)
  }

  return (
    <>
    <div className={styles.like}>
    {currentUser && (
        <>
        {liked ? (
            <Button
            variant="contained"
            style={{ backgroundColor: '#000066', color: '#FFF', margin: '0 20px 0 10px' }}
            onClick={unlike}
            >
            NOT LIKE
            </Button>
        ) : (
            <Button
            variant="contained"
            style={{ backgroundColor: '#FFFF00', margin: '0 20px 0 10px' }}
            startIcon={<FavoriteIcon />}
            onClick={like}
            >
            LIKE
            </Button>
        )}
        </>
    )}
        <div className={styles.like_count}><span className={styles.like_number}>{props.likecount}</span>&nbsp;LIKE</div>
    </div>
    </>
  )
}

export default Like
