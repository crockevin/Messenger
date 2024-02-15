import React from 'react'


import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import { Typography, Box, Button, Grid } from '@mui/material'

function FriendsList({ data }) {
  if (!data || !data.user) {
    return <div>Loading...</div>;
  }

  const { friends } = data.user;

  return (
    <Grid container>
      <Typography variant='h2'>Friends List</Typography>
      {friends.length === 0 ? (
        <Typography>Get some friends!</Typography>
      ) : (
        <Grid container>
          <Typography>Total Friends: {friends.length}</Typography>
          <ul>
            {friends.map(friends => (
              <li key={friends._id}>
                <span>{friends.username}</span>
              </li>
            ))}
          </ul>
          </Grid>
      )}
    </Grid>
  );
}

export default FriendsList;
