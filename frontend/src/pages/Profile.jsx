// Contains bottom nav and body (conversations, etc)
import ProfileHeader from '../components/ProfileHeader' // Top Nav bar
import ProfileContent from '../components/ProfileContent'
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'


// render profile if logged in
export default function Profile() {

  // get user query / display all data by map, and spread where need be
  const {id} = useParams();

  return (
    <>
      <ProfileHeader />
      <ProfileContent />
      <Typography
      align='center'
      variant='h6'
      >
        Hi, user {id}! ✌️
      </Typography>
    </>
  )
}
