import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import firebase from 'firebase/app'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import Button from '@material-ui/core/Button'

interface PROPS {
  postId: string
  likecount: number
}

const Like: React.FC<PROPS> = (props) => {
  const user = useSelector(selectUser)
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
      {liked ? (
        <Button variant="contained" color="primary" onClick={unlike}>
          いいね解除
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={like}>
          いいね
        </Button>
      )}
      <div>いいね数：{props.likecount}</div>
    </>
  )
}

export default Like
