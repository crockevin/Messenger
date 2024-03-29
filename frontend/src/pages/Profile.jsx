import { useEffect } from 'react'
import { gql } from '@apollo/client'
import { useQuery } from 'react-query'
import { useLazyQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

import ProfileHeader from '../components/Profile/ProfileHeader' // Top Nav bar
import { QUERY_SINGLE_USER } from '../utils/queries'
import Auth from '../utils/auth'
import ProfileFooterNav from '../components/Profile/ProfileFooterNav'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

// get user by id param, grab user data and spread across page
export default function Profile() {
  const { id } = useParams()

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
      <ProfileFooterNav />
    </>
  )
}
