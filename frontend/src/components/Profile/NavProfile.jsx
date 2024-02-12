import { useState, useEffect } from 'react'
import { useMatches, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'

import { Typography, Box, Button, useMediaQuery } from '@mui/material'
import { Avatar } from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { QUERY_SINGLE_USER } from '../../utils/queries'
// import { addFriend } from '../../utils/mutation'
import auth from '../../utils/auth'
import App from '../../App'

/*
TO DO:
Add friend button function
Remove friend button functionality added later
Avatar/PFP corrections
Generate a default avatar based on username
*/

/*
Get current id
Get friend id
add friend id to friend list
check if friend id is on friend list (for profile rendering purposes)
*/

// const handleAddFriend = (addFriendMutation, currentUserId, friendId) => {
//   addFriendMutation({
//     variables: {
//       userId: currentUserId,
//       friendId: friendId
//     }
//   });
// };

const isFriend = false

export default function NavProfile() {
  const { id } = useParams()
  const currentPage = id

  const userId = auth.getProfile().data._id
  const friendId = id

  
  // boolean to check if profile is yours
  const myPage = currentPage == auth.getProfile().data._id

  //mediaquery variable to render based on viewport size
  const smallView = useMediaQuery('(max-width:800px)')

  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: id },
  })

  if (loading) {
    return <p>Loading...</p> // Replace with loading spinner
  }
  const user = data?.user // Access the 'username' field from the response data
  return (
    //non-specific page layout
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: '80vh',
      }}
    >
      {/* conditionally renders based on whether the profile is the user's or another user's */}
      {!myPage ? (
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
            width: '30%',
            maxWidth: 400,
          }}
        >
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid item sx={{ padding: 1 }}>
              <Avatar>U</Avatar>
            </Grid>
            <Grid item sx={{ padding: 1 }}>
              <Typography>{user.username}</Typography>
            </Grid>
            {/* send friend request */}
            {/* buttons render base on whether the other user is on current user's friends list */}
            {!isFriend ? (
              <Grid item sx={{ padding: 1.5 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="addFriend"
                  href="#"
                >
                  Add Friend
                </Button>
              </Grid>
            ) : (
              <Grid item sx={{ padding: 1.5 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="addFriend"
                  href="#"
                >
                  Remove Friend
                </Button>
                <Grid item sx={{ padding: 1.5 }}>
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
            )}
          </Grid>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={smallView ? 12 : 4}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: '#013440',
                color: '#e4ebf2',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2.5,
                // minHeight: '100%',
                margin: '0 2%',
                maxWidth: '100%',
              }}
            >
              <Grid item sx={{ padding: 1.5 }}>
                <Avatar>U</Avatar>
              </Grid>
              <Grid item sx={{ padding: 1.5 }}>
                <Typography>{user.username}</Typography>
              </Grid>
              <Grid item sx={{ padding: 1.5 }}>
                <Button
                  color="secondary"
                  variant="contained"
                  type="editProfile"
                  href="/settings"
                >
                  Edit Profile
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={smallView ? 12 : 8}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: '#e4ebf2',
                color: '#013440',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2.5,
                margin: '0 2%',
                minHeight: '100%',
                maxWidth: '100%',
              }}
            >
              <Typography>This is where the chats will go!</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Grid>
  )
}
