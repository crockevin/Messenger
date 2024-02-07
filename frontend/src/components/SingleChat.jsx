import React from 'react'
import { TextField, Box, Typography, Grid, Button } from '@mui/material'

// userid: 65b6b87f1a77190affd0dfd9

export default function SingleChat({ message }) {
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h5">{message.user.username}</Typography>
      </Grid>
      <Grid item>
        <Typography>{message.content}</Typography>
      </Grid>
      <Grid container direction="row">
        <Grid item sx={{ position: 'fixed', bottom: 57, left: 0, right: 0 }}>
          <TextField
            fullWidth
            id="fullWidth"
            InputProps={{
              endAdornment: <Button variant="contained">Send</Button>,
            }}
          />
        </Grid>
      </Grid>
      {/* Add more details or rendering logic as needed */}
    </Grid>
  )
}

// sx={{ position: 'fixed', bottom: 60, left: 0, right: 0 }}>
