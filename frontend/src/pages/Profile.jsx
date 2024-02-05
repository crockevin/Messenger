import ProfileHeader from '../components/ProfileHeader' // Top Nav bar
import ProfileContent from '../components/ProfileContent' // Body and Bottom bar
import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { QUERY_SINGLE_USER } from '../utlis/queries'
import Auth from '../utlis/auth'

// get user by id param, grab user data and spread across page
export default function Profile() {
  const { id } = useParams()

  const { loading, data, error } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: id },
  });

  if (error) {
    console.error('GraphQL Error:', error);
    return <p>Error fetching data</p>;
  }

  if (loading) {
    return <p>Loading...</p> // Replace with loading spinner
  }
  const user = data?.user // Access the 'username' field from the response data
  return (
    <>
      <ProfileHeader />
      <ProfileContent />
      {user ? (
        <Typography align="center" variant="h6">
          Welcome, {user.username}! ✅
        </Typography>
      ) : (
        <p>❌ User not found ❌</p>
      )}
    </>
  )
}
