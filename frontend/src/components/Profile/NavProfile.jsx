import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Typography, Box, Button } from '@mui/material'
import { Avatar } from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { QUERY_SINGLE_USER } from '../../utils/queries'
import auth from '../../utils/auth'
import App from '../../App'

export default function NavProfile() {
  const { id } = useParams()
  console.log(`User id: ${id}`)

  // boolean to check if profile is yours
  const sameUser = id == auth.getProfile().data._id

  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: id },
  })

  if (loading) {
    return <p>Loading...</p> // Replace with loading spinner
  }
  const user = data?.user // Access the 'username' field from the response data
  console.log(user)
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '40vh', // Adjusted minHeight to fit the content better
      }}
    >
      <Paper
        elevation={5}
        sx={{
          backgroundColor: '#013440',
          color: '#e4ebf2',
          display: 'flex',
          padding: 8.5,
        }}
      >
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Grid>
          <Grid item>
            <Typography>{user.username}</Typography>
          </Grid>
          {/* send friend request */}
          <Grid item>
            {!sameUser ? (
              <Button
                color="secondary"
                variant="contained"
                type="signup"
                href="#"
              >
                Add Friend
              </Button>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                type="signup"
                href="/settings"
              >
                Edit Profile
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
}
