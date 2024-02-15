import { Typography, Button, Grid } from '@mui/material'
import NavBar from '../components/Navbar'
import Auth from '../utils/auth'
import { Navigate, redirect } from 'react-router-dom'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    if (Auth.loggedIn()) {
      navigate(`/profile/${Auth.getProfile().data._id}`)
    }
  }, [])
  return (
    <>
      <NavBar />
      <Grid
        container
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={3}
        padding={5}
        sx={{ minHeight: '35vh' }} // Vertical position for Container
      >
        <Grid item></Grid>
        <Grid item>
          <Typography variant="h2" align="center" color="primary">
            Pulse
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            color="textSecondary"
            align="center"
            sx={{ fontStyle: 'italic' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores,
            magnam hic aliquam omnis fugit magni sed ea quidem sunt eaque quo
            nesciunt.
          </Typography>
        </Grid>

        <Grid container item justifyContent="center" spacing={3}>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              type="signup"
              href="/signup"
            >
              Signup
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              type="signin"
              href="signin"
            >
              Signin
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
