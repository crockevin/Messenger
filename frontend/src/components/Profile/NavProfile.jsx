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
        minHeight: '80vh', // Adjusted minHeight to fit the content better
      }}
    >
      {!sameUser ? (
        <Paper
          elevation={3}
          sx={{
            backgroundColor: '#013440',
            color: '#e4ebf2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
            textAlign: 'center',
            padding: 7.5,
            width: '15%', // Adjusted width for better appearance
            maxWidth: 400, // Added maxWidth to limit the width of Paper
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
              <Button
                color="secondary"
                variant="contained"
                type="addFriend"
                href="#"
              >
                Add Friend
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                type="newMessage"
                href="#"
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: '#013440',
                color: '#e4ebf2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 7.5,
              }}
            >
              <Grid item>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </Grid>
              <Grid item>
                <Typography>{user.username}</Typography>
              </Grid>
              <Button
                color="secondary"
                variant="contained"
                type="editProfile"
                href="/settings"
              >
                Edit Profile
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper 
              elevation={3}
              sx={{
                backgroundColor: '#e4ebf2',
                color: '#013440',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 7.5,
              }}>
              <Typography>This is where the chats will go!</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}

{
  /* <Button
                color="primary"
                variant="contained"
                type="signup"
                href="/settings"
              >
                Edit Profile
              </Button> */
}
