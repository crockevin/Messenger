import CssBaseline from '@mui/material/CssBaseline'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import NavBar from '../components/Navbar'
import { Box } from '@mui/material'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { login } from '../utils/mutation'
import { useNavigate } from 'react-router-dom'
import Alert from '@mui/material/Alert'
import Auth from '../utils/auth'

// move to own file
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="/">
        Messenger App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Signin() {
  const navigate = useNavigate() // Initialize useNavigate hook - on handlesubmit sends to /profile

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  })

  const [showSuccessAlert, setShowSuccessAlert] = useState(false) // Successful sign in alert
  const [showErrorAlert, setShowErrorAlert] = useState(false) //  Failed sign in alert

  const [loginUser, { error, data }] = useMutation(login)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)
    try {
      const { data } = await loginUser({
        variables: { ...formState },
      })
      Auth.login(data.login.token)
      // Show success alert
      setShowSuccessAlert(true)

      setTimeout(() => {
        navigate(`/Profile/${data.login.user._id}`) // adjust to be specific to user _id
      }, 1500)
    } catch (e) {
      setShowErrorAlert(true)
      console.error('Login Error:', e)
    }
  }

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {showSuccessAlert ? (
            <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
              Login successful! Redirecting to profile...
            </Alert>
          ) : showErrorAlert ? (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              Login failed! Please be sure your information is correct, or
              create an account.
            </Alert>
          ) : null}

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon color="primary" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </>
  )
}
