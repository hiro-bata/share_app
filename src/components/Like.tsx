import React, { useState, useEffect } from 'react'
import { storage, db, auth } from '../firebase'
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
  const [likeCount, setLikeCount] = useState(1) 

  const like = () => {
    setLikeCount(likeCount + 1)
    db.collection('posts').doc(props.postId).update({      
      likecount: likeCount,
    })    
  }

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => like()}>
          いいね
      </Button>
      <div>{props.likecount}</div>
    </>
  )
}

export default Like
