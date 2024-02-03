import ProfileHeader from '../components/ProfileHeader' // Top Nav bar
import ProfileContent from '../components/ProfileContent' // Body and Bottom bar

import { Typography } from '@mui/material'
import { gql } from '@apollo/client'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { QUERY_SINGLE_USER } from '../utlis/queries'
import Auth from '../utlis/auth'

// get user by id param, grab user data and spread across page
export default function Profile() {
  // const { id } = useParams()

  // const { loading, data } = useQuery(QUERY_SINGLE_USER, {
  //   // pass URL parameter
  //   variables: { _id: id },
  // })

  // if (loading) {
  //   return <p>Loading...</p> // Replace with loading spinner
  // }
  // const user = data?.user // Access the 'username' field from the response data

  return (
    <>
      <ProfileHeader />
      <ProfileContent />
      {/* {user ? (
        <Typography align="center" variant="h6">
          Welcome, {user.username}! ✅
        </Typography>
      ) : (
        <p>❌ User not found ❌</p>
      )} */}
    </>
  )
}
