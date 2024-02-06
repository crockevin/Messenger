import ProfileHeader from '../components/ProfileHeader' // Top Nav bar
import { useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { gql, useLazyQuery } from '@apollo/client'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { QUERY_SINGLE_USER } from '../utlis/queries'
import Auth from '../utlis/auth'
import ProfileFooterNav from '../components/ProfileFooterNav'
import ProfileBody from '../components/ProfileBody'

// get user by id param, grab user data and spread across page
export default function Profile() {
  const { id } = useParams()
  console.log(`User id: ${id}`)

  const [loadUser, { loading, data, error }] = useLazyQuery(QUERY_SINGLE_USER, {
    variables: { id: id },
  })
  useEffect(() => {
    loadUser()
  }, [loadUser])

  if (error) {
    console.error('GraphQL Error:', error)
    return <p>Error fetching data</p>
  }

  if (loading) {
    return <p>Loading...</p> // Replace with loading spinner
  }
  const user = data?.user // Access the 'username' field from the response data
  return (
    <>
      {/* <ProfileHeader />
      <ProfileContent />
      {user ? (
        <Typography align="center" variant="h6">
          Welcome, {user.username}! ✅
        </Typography>
      ) : (
        <p>❌ User not found ❌</p>
      )} */}
      <ProfileHeader />
      {/* Render body onClick on 'inbox' */}
      <ProfileBody /> 
      <Box sx={{ pb: 7 }}>
        <ProfileFooterNav />
      </Box>
    </>
  )
}
