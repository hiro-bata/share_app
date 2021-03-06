import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUserProfile } from '../features/userSlice'
import styles from './Auth.module.css'
import { auth, provider, storage } from '../firebase'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Grid,
  Typography,
  makeStyles,
  Modal,
  IconButton,
  Box,
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import CameraIcon from '@material-ui/icons/Camera'
import EmailIcon from '@material-ui/icons/Email'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Redirect } from 'react-router-dom'
import firebase from 'firebase/app'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  modal: {
    outline: 'none',
    position: 'absolute',
    width: 400,
    borderRadius: 10,
    backgroundColor: 'white',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundPositionY: '60%',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const Auth: React.FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentUser = firebase.auth().currentUser
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [avatarImage, setAvatarImage] = useState<File | null>(null)
  const [isLogin, setIsLogin] = useState(true)
  const [openModal, setOpenModal] = React.useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0])
      e.target.value = ''
    }
  }
  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false)
        setResetEmail('')
      })
      .catch((err) => {
        alert(err.message)
        setResetEmail('')
      })
  }
  const signInGoogle = async () => {
    await auth.signInWithPopup(provider).catch((err) => alert(err.message))
    alert('ログインしました!ご利用ありがとうございます')
  }
  const signInEmail = async () => {
    await auth.signInWithEmailAndPassword(email, password)
    alert('ログインしました!ご利用ありがとうございます！')
  }
  const signUpEmail = async () => {
    const authUser = await auth.createUserWithEmailAndPassword(email, password)
    let url = ''
    if (avatarImage) {
      const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      const N = 16
      const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('')
      const fileName = randomChar + '_' + avatarImage.name
      await storage.ref(`avatars/${fileName}`).put(avatarImage)
      url = await storage.ref('avatars').child(fileName).getDownloadURL()
    }
    await authUser.user?.updateProfile({
      displayName: username,
      photoURL: url,
    })
    dispatch(
      updateUserProfile({
        displayName: username,
        photoUrl: url,
      })
    )
  }

  return (
    <>
      {currentUser && <Redirect to="/" />}
      <Grid container component="main" className={styles.root}>
        <CssBaseline />
        <Grid item xs={false} sm={false} md={7} className={classes.image} />
        <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? 'Login' : 'Register'}
            </Typography>
            <form className={classes.form} noValidate>
              {!isLogin && (
                <>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setUsername(e.target.value)
                    }}
                  />
                  <Box textAlign="center">
                    <IconButton>
                      <label>
                        <p>Your icon</p>
                        <AccountCircleIcon
                          fontSize="large"
                          className={avatarImage ? styles.login_addIconLoaded : styles.login_addIcon}
                        />
                        <input className={styles.login_hiddenIcon} type="file" onChange={onChangeImageHandler} />
                      </label>
                    </IconButton>
                  </Box>
                </>
              )}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value)
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value)
                }}
              />

              <Button
                disabled={
                  isLogin ? !email || password.length < 6 : !username || !email || password.length < 6 || !avatarImage
                }
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                startIcon={<EmailIcon />}
                onClick={
                  isLogin
                    ? async () => {
                        try {
                          await signInEmail()
                        } catch (err) {
                          alert(err.message)
                        }
                      }
                    : async () => {
                        try {
                          await signUpEmail()
                        } catch (err) {
                          alert(err.message)
                        }
                      }
                }
              >
                {isLogin ? 'Login' : 'Register'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <span className={styles.login_reset} onClick={() => setOpenModal(true)}>
                    Forgot password ?
                  </span>
                </Grid>
                <Grid item>
                  <span className={styles.login_toggleMode} onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Create new account ?' : 'Back to login'}
                  </span>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="default"
                className={classes.submit}
                startIcon={<CameraIcon />}
                onClick={signInGoogle}
              >
                SignIn with Google
              </Button>
            </form>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <div style={getModalStyle()} className={classes.modal}>
                <div className={styles.login_modal}>
                  <TextField
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type="email"
                    name="email"
                    label="Reset E-mail"
                    value={resetEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setResetEmail(e.target.value)
                    }}
                  />
                  <IconButton onClick={sendResetEmail}>
                    <SendIcon />
                  </IconButton>
                </div>
              </div>
            </Modal>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
export default Auth
