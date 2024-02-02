import CssBaseline from '@mui/material/CssBaseline'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import NavBar from '../components/Navbar'
import {Box} from '@mui/material'
import Alert from '@mui/material/Alert';


import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../utlis/mutation'
import Auth from '../utlis/auth'


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

export default function SignUp() {
  const navigate = useNavigate(); // Initialize useNavigate hook

const [formState, setFormState] = useState({
  username: '',
  email: '',
  password: '',
})

const [AddUser, { error, data }] = useMutation(signup);

const handleChange = (event) => {
  const { name, value } = event.target;

  setFormState({
    ...formState,
    [name]: value,
  });
};

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(formState)
    try {
      const { data } = await AddUser({
        variables: { ...formState },
      });
      Auth.login(data.AddUser.token);
      navigate('/signin');  // send to signin in page after successful sign up
    } catch (e) {
      console.error("AddUser Error:", e);
    }
  };

  return (
    <>
    <NavBar/>
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon color="primary" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={formState.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formState.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            TextField='secondary'
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
    </>
  )
}
