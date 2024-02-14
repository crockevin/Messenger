import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import { Typography, Box, Button, useMediaQuery } from '@mui/material'
import { Avatar } from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import ProfileHeader from '../components/Profile/ProfileHeader'
import ProfileFooterNav from '../components/Profile/ProfileFooterNav'
import { DeleteUser } from '../utils/mutation'
import Auth from '../utils/auth'

/*
TO DO:
Get page to work
Add functionality for change Username
Add functionality for change Password
Add change PFP/Avatar
*/ 

const Settings = () => {
  const id = Auth.getProfile().data._id
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [deleteUser] = useMutation(DeleteUser, {
    variables: { userId: id },
  })
  const navigate = useNavigate()
  const handleDeleteUser = async () => {
    setLoading(true)
    setError(null)

    const confirm = window.confirm(
      'This action cannot be undone, are you sure you want to proceed?'
    )

    if (confirm) {
      try {
        await deleteUser()
        console.log('User deleted successfully')
        navigate('/')
      } catch (error) {
        setError(error)
        console.error('Error deleting user:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div>
      <ProfileHeader />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: '80vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            // backgroundColor: '#013440',
            // color: '#e4ebf2',
            display: 'flex',
            flexDirection: 'column',
             alignItems: 'center',
            textAlign: 'center',
            padding: 7.5,
            width: '30%',
            maxWidth: 400,
          }}
        >
          <Grid item>
            <h2>Settings</h2>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              type="changeUsername"
              href="#"
              sx={{
                margin:1
              }}
            >
              Change Username
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              type="changePassword"
              href="#"
              sx={{
                margin:1
              }}
            >
              Change Password
            </Button>
          </Grid>
          <Grid item>
            <Button
            color='error'
            variant="contained"
            sx={{
              margin:1
            }}
            onClick={handleDeleteUser} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete User'}
            </Button>
            {error && <p>Error: {error.message}</p>}
          </Grid>
        </Paper>
      </Grid>
      <ProfileFooterNav />
    </div>
  )
}

export default Settings
