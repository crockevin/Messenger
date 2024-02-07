import ProfileHeader from '../components/Profile/ProfileHeader' // Top Nav bar
import { useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { gql } from '@apollo/client'
import { useQuery } from 'react-query'
import { useLazyQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { QUERY_SINGLE_USER } from '../utlis/queries'
import Auth from '../utlis/auth'
import ProfileFooterNav from '../components/Profile/ProfileFooterNav'

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
      <ProfileHeader />
      {/* {user ? (
        <Typography align="center" variant="h4">
          Welcome, {user.username}! ✅
        </Typography>
      ) : (
        <p>❌ User not found ❌</p>
      )} */}
      <ProfileFooterNav />
    </>
  )
}
